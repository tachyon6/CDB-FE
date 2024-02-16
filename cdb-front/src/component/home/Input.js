import React, { useState } from "react";
import styled from "styled-components";
import { CREATE_COMPLETE_FILE } from "../../gql/create-complete";
import client from "../../client";
import AWS from "aws-sdk";
import { IoIosSync } from 'react-icons/io';


const Input = () => {
  const [inputTitle, setInputTitle] = useState("2025학년도 대학수학능력시험 대비 문제지");
  const [inputCodes, setInputCodes] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const accessKeyId = process.env.REACT_APP_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
  const region = process.env.REACT_APP_S3_REGION;

  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });

  const handleDownloadPdf = (title, codes) => {
    if (title === "") {
      title = "2025학년도 대학수학능력시험 대비 문제지";
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
        mutation: CREATE_COMPLETE_FILE,
        variables: {
          complete_file_input: {
            file_name: title,
            question_codes: codeArr,
          },
        },
        fetchPolicy: "no-cache",
      })
      .then(async (res) => {
        console.log(res);
        const fileName = await res.data.combine;
        const s3 = new AWS.S3();
        const params = {
          Bucket: process.env.REACT_APP_S3_BUCKET,
          Key: `uploads/results/${fileName}.pdf`,
        };

        s3.getObject(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const blob = new Blob([data.Body], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${title}.pdf`;
            link.click();
          }
        });

        const params2 = {
          Bucket: process.env.REACT_APP_S3_BUCKET,
          Key: `uploads/results_ans/${fileName}.pdf`,
        };

        s3.getObject(params2, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const blob = new Blob([data.Body], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${title}_정답.pdf`;
            link.click();
          }
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  }
  return (
    <MainContainer>
      <InputHeader>
        <InputTitle>수능 수학 기출 DB</InputTitle>
      </InputHeader>
      <InputFieldContainer>
        <InputField1>
          <InputText1> 시험지 상단에 표기될 제목을 입력해주세요. (미입력시 기본문구로 출력됩니다.)</InputText1>

          <Input1 placeholder="2025학년도 대학수학능력시험 대비 문제지"
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
              <Input2 placeholder="Ex) 211109A 221130B 230622"
                value={inputCodes}
                onChange={(e) => setInputCodes(e.target.value)}
              ></Input2>
            </Input2Container>
            <Input2Button onClick={() => handleDownloadPdf(inputTitle, inputCodes)} disabled={isDownloading}>
              {isDownloading ? <IoIosSync className="loading-icon" /> : 'PDF로 다운받기'}
            </Input2Button>
          </Input2Box>
        </InputField2>
        <Caption1>
          문제 번호 입렵 방법 )
          <CaptionFrameContainer>
            <CaptionFrame>
              2024학년도 + 9월 + 15번 + 공통 → 240915
            </CaptionFrame>
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
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  &:hover {
    background: #3829e0;
  }
  &:active {
    transform: scale(0.95);
    background: #6A5ACD;
  }

  .loading-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  &:disabled {
    background: var(--Grayscale-300, #d9dbe9);
    color: var(--Grayscale-600, #6F6C8F);
    cursor: not-allowed;
  }
`;

const Caption1 = styled.div`
  display: flex;
  padding: 0rem 0.25rem;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  color: var(--Grayscale-600, #6F6C8F);
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
  color: var(--Grayscale-600, #6F6C8F);
  /* Caption/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0075rem;
`;

