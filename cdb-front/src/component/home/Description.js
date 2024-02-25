import React from "react";
import styled from "styled-components";

const Description = () => {
  return (
    <DescriptionContainer>
      <DescriptionTitleContainer>
        <DescriptionSubtitle>
          철저한 기출 반복 훈련, 쿼크가 함께합니다.
        </DescriptionSubtitle>
        <DescriptionTitle>설명 영역</DescriptionTitle>
        <DescriptionTag>사용방법</DescriptionTag>
      </DescriptionTitleContainer>
      <Line />
      <DescriptionList>
        <DescriptionListNumBox>
          <DescriptionListNum>01</DescriptionListNum>
        </DescriptionListNumBox>
        <DescriptionListImg1 />
        <DescriptionListTextBox>
          <DescriptionListText1>
            문항 번호 형식은 다음과 같이 구성됩니다.
            <br />
            <HighlightedText>
              ”시행연도 마지막 두 자리 + 시행월(두자리) +문제 번호 (두자리) +
              과목(과목)”
            </HighlightedText>
            <br />
            <br />
            A형 → A / B형 → B
            <br />
            가형 → A / 나형 → B
            <br />
            확통 → A / 미적 → B / 기하 → C 
            <br />
            (공통 문항일 경우에는 표기 안함)
          </DescriptionListText1>
          <DescriptionListText2>
            2023학년도 + 6월 + 30번 + 미적분 →{" "}
            <HighlightedText>230630B</HighlightedText>
            <br />
            2021학년도 + 수능 + 9번 + 가형 →{" "}
            <HighlightedText>211109A</HighlightedText>
            <br />
            2022학년도 + 9월 + 12번 → <HighlightedText>220912</HighlightedText>
          </DescriptionListText2>
        </DescriptionListTextBox>
      </DescriptionList>
      <DescriptionList>
        <DescriptionListNumBox>
          <DescriptionListNum>02</DescriptionListNum>
        </DescriptionListNumBox>
        <DescriptionListImg2 />
        <DescriptionListTextBox>
          <DescriptionListText1>
            제목과 문항 리스트를 입력한 후,{" "}
            <HighlightedText>[PDF로 다운받기]</HighlightedText> 버튼을
            클릭합니다.
          </DescriptionListText1>
        </DescriptionListTextBox>
      </DescriptionList>
      <DescriptionList>
        <DescriptionListNumBox>
          <DescriptionListNum>03</DescriptionListNum>
        </DescriptionListNumBox>
        <DescriptionListImg3 />
        <DescriptionListTextBox>
          <DescriptionListText1>
            다운로드 완료!{" "}
            <HighlightedText>평가원과 동일한 형식</HighlightedText>의 pdf 파일로
            출력됩니다.
          </DescriptionListText1>
        </DescriptionListTextBox>
      </DescriptionList>
    </DescriptionContainer>
  );
};

export default Description;

const DescriptionContainer = styled.div`
  display: flex;
  width: 51.125rem;
  padding: var(--Lg, 1.5rem);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
    gap: 1rem;
  }
`;

const DescriptionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const Line = styled.div`
  width: 48.125rem;
  height: 0.0625rem;
  background: var(--Grayscale-700, #170f49);

  @media (max-width: 768px) {
    width: 18.4375rem;
  }
`;

const DescriptionList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: stretch;

  @media (max-width: 768px) {
    width: 18.4375rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DescriptionSubtitle = styled.div`
  align-self: stretch;
  color: var(--Grayscale-600, #514f6e);
  text-align: center;

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const DescriptionTitle = styled.div`
  align-self: stretch;
  color: var(--Grayscale-700, #170f49);
  text-align: center;

  font-family: "Pretendard Variable";
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.02rem;
`;

const DescriptionTag = styled.div`
  display: flex;
  padding: 0.25rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 624.9375rem;
  border: 1px solid var(--Grayscale-700, #170f49);

  color: var(--Grayscale-700, #170f49);

  /* H6/Bold */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DescriptionListNumBox = styled.div`
  display: flex;
  width: 2rem;
  padding: 0.25rem 0rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;

const DescriptionListNum = styled.div`
  flex: 1 0 0;
  align-self: stretch;

  color: var(--Primary-Medium, #aa9df4);

  /* H5/Bold */
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.015rem;
`;

const DescriptionListImg1 = styled.div`
  width: 11.25rem;
  height: 12.6875rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: none;
  background: url("/assets/Description1.png"), lightgray 50% / cover no-repeat;

  @media (max-width: 768px) {
    width: 19.4375rem;
    height: 9.5rem;
    background: url("/assets/Description1_mobile.png"), lightgray 50% / cover no-repeat;
  }
`;
const DescriptionListImg2 = styled.div`
  width: 11.25rem;
  height: 7.5rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: none;
  background: url("/assets/Description2.png"), lightgray 50% / cover no-repeat;

  @media (max-width: 768px) {
    width: 19.4375rem;
    height: 7.5rem;
    background: url("/assets/Description2_mobile.png"), lightgray 50% / cover no-repeat;
  }
`;
const DescriptionListImg3 = styled.div`
  width: 11.25rem;
  height: 7.5rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: none;
  background: url("/assets/Description3.png"), lightgray 50% / cover no-repeat;

  @media (max-width: 768px) {
    width: 19.4375rem;
    height: 7.5rem;
    background: url("/assets/Description3_mobile.png"), lightgray 50% / cover no-repeat;
  }
`;

const DescriptionListTextBox = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;

  @media (max-width: 768px) {
    width: 18.4375rem;
  }

`;

const DescriptionListText1 = styled.div`
  align-self: stretch;
  color: var(--Grayscale-999, #000);
  text-align: left;

  /* Body1/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const DescriptionListText2 = styled.div`
  width: 27.375rem;
  color: var(--Grayscale-999, #000);
  text-align: left;

  /* Body1/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const HighlightedText = styled.span`
  color: var(--Primary-Strong, #4a3aff);
`;
