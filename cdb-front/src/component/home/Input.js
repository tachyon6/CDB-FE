import React from "react";
import styled from "styled-components";

const Input = () => {
  return (
    <MainContainer>
      <InputHeader>
        <InputTitle>수능 수학 기출 DB</InputTitle>
      </InputHeader>
      <InputFieldContainer>
        <InputField1>
          <InputText1> 시험지 상단에 표기될 제목을 입력해주세요. (미입력시 기본문구로 출력됩니다.)</InputText1>

          <Input1 placeholder="2025학년도 대학수학능력시험 대비 문제지"></Input1>
        </InputField1>
        <InputField2>
          <InputText2>
            필요한 기출 문제의 번호들을 입력하거나, 상단의 리스트 생성을 통해
            복사한 값을 붙여넣어주세요.
          </InputText2>
          <Input2Box>
            <Input2Container>
              <Input2 placeholder="Ex) 211109A, 221130B, 230622"></Input2>
            </Input2Container>
            <Input2Button>PDF로 다운받기</Input2Button>
          </Input2Box>
        </InputField2>
        <Caption1>
          문제 번호 입렵 방법 )
          <CaptionFrameContainer>
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
            <CaptionFrame>가형 → A / 나형 → B (2017~2020학년도)</CaptionFrame>
            <CaptionFrame>
              확통 → A / 미적분 → B / 기하 → C (2021~2024학년도)
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
