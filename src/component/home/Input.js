import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CREATE_COMPLETE_FILE } from "../../gql/create-complete";
import client from "../../client";
import AWS from "aws-sdk";
import { IoIosSync } from "react-icons/io";
import { CREATE_DOWNLOAD_LOG } from "../../gql/create-download-log";
import io from "socket.io-client";

const Input = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputCodes, setInputCodes] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileTitle, setFileTitle] = useState("");
  const [clientIdFront, setClientIdFront] = useState("");

  const accessKeyId = process.env.REACT_APP_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
  const region = process.env.REACT_APP_S3_REGION;

  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });

  useEffect(() => {
    const socket = io("https://quark-api.tachyon6.com");
  
    socket.on("connect", () => {
      console.log("Socket connected");
    });
  
    socket.on("yourId", (data) => {
      setClientIdFront(data.id);
      console.log("clientId set: ", data.id);
    });
  
    socket.on("progress", (data) => {
        setProgress(data.progress);
    });
  
    return () => {
      socket.off("connect");
      socket.off("yourId");
      socket.off("progress");
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   console.log(progress);
  // }, [progress]);

  const getS3Object = async (params) => {
    return new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      s3.getObject(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isDownloading) {
      handleDownloadPdf(inputTitle, inputCodes);
    }
  };

  const handleDownloadPdf = (title, codes) => {
    if (title === "") {
      title = "2025학년도 대학수학능력시험 대비 문제지";
      setFileTitle(title);
    } else {
      setFileTitle(title);
    }
    setIsDownloading(true);
    const codeArr = codes.split(" ");

    if (codeArr.length === 0) {
      alert("문제 번호들을 입력해주세요.");
      return;
    } else if (codeArr.length > 200) {
      alert("200개 이하의 문제 번호들을 입력해주세요.");
      return;
    }

    client
      .mutate({
        mutation: CREATE_DOWNLOAD_LOG,
        variables: {
          title: title,
          input: codes,
        },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    client
      .mutate({
        mutation: CREATE_COMPLETE_FILE,
        variables: {
          complete_file_input: {
            file_name: title,
            question_codes: codeArr,
          },
          client_id: clientIdFront,
        },
        fetchPolicy: "no-cache",
      })
      .then(async (res) => {
        console.log(res);
        const fileName = await res.data.combine;
        try {
          const questionParams = {
            Bucket: process.env.REACT_APP_S3_BUCKET,
            Key: `uploads/results/${fileName}.pdf`,
          };
          const questionData = await getS3Object(questionParams);
          const url = URL.createObjectURL(
            new Blob([questionData.Body], { type: "application/pdf" })
          );
          const a = document.createElement("a");
          a.href = url;
          a.download = `${title}.pdf`;
          a.click();

          const answerParams = {
            Bucket: process.env.REACT_APP_S3_BUCKET,
            Key: `uploads/results_ans/${fileName}.pdf`,
          };
          const answerData = await getS3Object(answerParams);
          const url2 = URL.createObjectURL(
            new Blob([answerData.Body], { type: "application/pdf" })
          );
          const a2 = document.createElement("a");
          a2.href = url2;
          a2.download = `${title}_정답.pdf`;
          a2.click();
          setProgress(100);
        } catch (err) {
          console.log(err);
          alert(err.message);
        } finally {
          setIsDownloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };
  return (
    <MainContainer>
      <InputHeader>
        <InputTitle>수능 수학 기출 DB</InputTitle>
      </InputHeader>
      <InputFieldContainer>
        <InputField1>
          <InputText1>
            {" "}
            시험지 상단에 표기될 제목을 입력해주세요. (미입력시 기본문구로
            출력됩니다.)
          </InputText1>

          <Input1
            placeholder="2025학년도 대학수학능력시험 대비 문제지"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          ></Input1>
        </InputField1>
        <InputField2>
          <InputText2>
            필요한 기출 문제의 번호들을 공백을 기준으로 구분하여 입력해주세요.
          </InputText2>
          <Input2Box>
            <Input2Container>
              <Input2
                placeholder="Ex) 211109A 221130B 230622"
                value={inputCodes}
                onChange={(e) => setInputCodes(e.target.value)}
                onKeyPress={handleKeyPress}
              ></Input2>
              <TextArea
              placeholder="Ex) 211109A 221130B 230622"
              value={inputCodes}
              onChange={(e) => setInputCodes(e.target.value)}
              onKeyPress={handleKeyPress}
             />
            </Input2Container>
            <Input2Button
              onClick={() => handleDownloadPdf(inputTitle, inputCodes)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <IoIosSync
                  className="loading-icon"
                  style={{
                    color: "#4a3aff",
                    fontSize: "1.5rem",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "PDF로 다운받기"
              )}
            </Input2Button>
          </Input2Box>
        </InputField2>
        {isDownloading && (
          <ProgressBar>
            <Progress width={progress}></Progress>
          </ProgressBar>
        )}
        <Caption1>
          문제 번호 입렵 방법 )
          <CaptionFrameContainer>
            <CaptionFrame>2024학년도 + 9월 + 15번 + 공통 → 240915</CaptionFrame>
            <CaptionFrame>
              2023학년도 + 6월 + 30번 + 미적분 → 230630B
            </CaptionFrame>
            <CaptionFrame>
              2021학년도 + 수능 + 9번 + 가형 → 211109A
            </CaptionFrame>
          </CaptionFrameContainer>
        </Caption1>
        <Caption2>
          참고 사항 )
          <CaptionFrameContainer>
            <CaptionFrame>A형 → A / B형 → B (2012~2016학년도)</CaptionFrame>
            <CaptionFrame>가형 → A / 나형 → B (2017~2021학년도)</CaptionFrame>
            <CaptionFrame>
              확통 → A / 미적분 → B / 기하 → C (2022~2024학년도)
            </CaptionFrame>
            <CaptionFrame>공통 문항 → 없음</CaptionFrame>
          </CaptionFrameContainer>
        </Caption2>
      </InputFieldContainer>
    </MainContainer>
  );
};

export default Input;

export const MainContainer = styled.div`
  display: flex;
  width: 51.125rem;
  padding: 3.5rem 4.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  border: 1px solid var(--Gray-300, #ddd);
  border-radius: 1.5rem;
  background: var(--Grayscale-000, #fff);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 21.4375rem;
    padding: 3.5rem 1rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const InputHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

const InputTitle = styled.h1`
  margin: 0;
  color: var(--Grayscale-700, #170f49);
  text-align: center;

  font-family: "Pretendard Variable";
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const InputFieldContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
  align-self: stretch;
`;

const InputField1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

const InputText1 = styled.div`
  align-self: stretch;
  color: var(--Grayscale-600, #514f6e);

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  align-self: stretch;
`;

const Input1 = styled.input`
  display: flex;
  padding: 0.5625rem 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.375rem;
  border: 1px solid var(--Gray-300, #dee2e6);
  background: var(--Default-White, #fff);
`;

const InputField2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

const InputText2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-self: stretch;
  text-align: left;

  color: var(--Grayscale-600, #514f6e);

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Input2Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  flex: 1 0 0;
  align-self: stretch;
`;

const Input2Box = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Input2 = styled.input`
  display: flex;
  padding: 0.25rem 1rem;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0.375rem 0rem 0rem 0.375rem;
  border: 1px solid var(--Gray-300, #dee2e6);
  background: var(--Grayscale-000, #fff);
  box-sizing: border-box;
  font-size: 1.1rem;

  &::placeholder {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TextArea = styled.textarea`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  height: 7.125rem;
  padding: 1rem;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;

  border-radius: 0.375rem;
  border: 1px solid var(--Gray-300, #dee2e6);
  background: var(--Default-White, #fff);
  box-sizing: border-box;
  }
`;

const Input2Button = styled.button`
  display: flex;
  height: 3.75rem;
  padding: 1rem var(--Lg, 1.5rem);
  justify-content: center;
  align-items: center;
  border-radius: 0rem 0.375rem 0.375rem 0rem;
  background: linear-gradient(
      180deg,
      rgba(183, 52, 179, 0.15) 0%,
      rgba(164, 46, 156, 0) 100%
    ),
    var(--Primary-Strong, #4a3aff);

  color: var(--Grayscale-000, #fff);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  box-sizing: border-box;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
  &:hover {
    background: #3829e0;
  }
  &:active {
    transform: scale(0.95);
    background: #6a5acd;
  }

  .loading-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &:disabled {
    background: var(--Grayscale-300, #d9dbe9);
    color: var(--Grayscale-600, #6f6c8f);
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    width: 100%;
    padding: 1rem 1.5rem;
  }
`;

const Caption1 = styled.div`
  display: flex;
  padding: 0rem 0.25rem;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  color: var(--Grayscale-600, #6f6c8f);
  /* Caption/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0075rem;
`;

const CaptionFrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const CaptionFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
`;

const Caption2 = styled.div`
  display: flex;
  padding: 0rem 0.25rem;
  align-items: flex-start;
  gap: 4rem;
  align-self: stretch;
  align-self: stretch;
  color: var(--Grayscale-600, #6f6c8f);
  /* Caption/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0075rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #eee;
  height: 20px;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: #4a3aff;
  height: 100%;
  width: ${(props) => props.width}%;
  transition: width 0.4s ease;
`;
