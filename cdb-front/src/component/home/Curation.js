import React from "react";
import styled from "styled-components";

const CurationItems = (Header, Title, Subtitle) => {
  return (
    <CurationList>
      <CurationListNum>
        <CurationListNumText>{Header}</CurationListNumText>
      </CurationListNum>
      <CurationListItem>
        <CurationItemHeading>
          <CurationItemTitle> {Title}</CurationItemTitle>
          <CurationItemSubtitle>{Subtitle}</CurationItemSubtitle>
        </CurationItemHeading>
        <CurationBadges>
          <CurationCopyIconBox>
            <CurationCopyIcon />
          </CurationCopyIconBox>
          <CurationCopyText>복사하기</CurationCopyText>
        </CurationBadges>
      </CurationListItem>
    </CurationList>
  );
};

const Curation = () => {
  return (
    <CurationContainer>
      <CurationTitleContainer>
        <CurationSubtitle>
          관리자가 직접 선별한 추천 문제 모음
        </CurationSubtitle>
        <CurationTitle>선별 영역</CurationTitle>
        <CurationTag>4점 선별</CurationTag>
        <CurationTagText>
          오른쪽 [복사하기] 버튼을 클릭하여 복사한 뒤, 상단의 문제 번호 입력창에
          붙여 넣으세요
        </CurationTagText>
      </CurationTitleContainer>
      <Line />
      {CurationItems("미적분", "최근 7개년 미분가능성 4점 모음", "총 40문항")}
      {CurationItems("미적분", "최근 7개년 음함수미분 4점 모음", "총 25문항")}
      {CurationItems(
        "미적분",
        "최근 7개년 최대최소/극대극소 4점 모음",
        "총 30문항"
      )}
      {CurationItems(
        "미적분",
        "최근 7개년 정적분으로 정의된 함수 4점 모음",
        "총 20문항"
      )}
      {CurationItems("수학2", "최근 7개년 속도/가속도 4점 모음", "총 20문항")}
      {CurationItems(
        "수학1",
        "최근 7개년 여러 가지 수열 4점 모음",
        "총 20문항"
      )}
    </CurationContainer>
  );
};

export default Curation;

const CurationContainer = styled.div`
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
`;

const CurationTitleContainer = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  margin: 0;
`;

const CurationSubtitle = styled.div`
  align-self: stretch;
  color: var(--Grayscale-600, #514f6e);
  text-align: center;

  /* H6/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CurationTitle = styled.div`
  align-self: stretch;
  color: var(--Grayscale-700, #170f49);
  text-align: center;

  /* H4/Bold */
  font-family: "Pretendard Variable";
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.02rem;
`;

const CurationTag = styled.div`
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

const CurationTagText = styled.div`
  align-self: stretch;
  color: var(--Primary-Strong, #4a3aff);
  text-align: center;

  /* H6/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Line = styled.div`
  width: 48.125rem;
  height: 0.0625rem;
  background: var(--Grayscale-700, #170f49);
`;

const CurationList = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  width: 100%;
`;

const CurationListNum = styled.h5`
  display: flex;
  width: 5rem;
  padding: 0.5rem 0rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

const CurationListNumText = styled.div`
  color: var(--Primary-Medium, #aa9df4);

  /* H5/Bold */
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.015rem;
`;

const CurationListItem = styled.div`
  display: flex;
  width: 43.4375rem;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-bottom: 1px solid var(--Grayscale-200, #eff0f6);
  background: var(--Grayscale-000, #fff);
`;

const CurationItemHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`;

const CurationItemTitle = styled.div`
  color: var(--Gray-800, #343a40);

  /* Body1/Bold */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const CurationItemSubtitle = styled.div`
  color: var(--Gray-600, #6c757d);

  /* Body2/Regular */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.00875rem;
`;

const CurationCopyIconBox = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--Primary-Strong, #6f6c8f);
`;

const CurationCopyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3H16.5C17.2956 3 18.0587 3.31607 18.6213 3.87868C19.1839 4.44129 19.5 5.20435 19.5 6V21C19.5 21.7956 19.1839 22.5587 18.6213 23.1213C18.0587 23.6839 17.2956 24 16.5 24H6C5.20435 24 4.44129 23.6839 3.87868 23.1213C3.31607 22.5587 3 21.7956 3 21V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3ZM6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6V21C4.5 21.3978 4.65804 21.7794 4.93934 22.0607C5.22064 22.342 5.60218 22.5 6 22.5H16.5C16.8978 22.5 17.2794 22.342 17.5607 22.0607C17.842 21.7794 18 21.3978 18 21V6C18 5.60218 17.842 5.22064 17.5607 4.93934C17.2794 4.65804 16.8978 4.5 16.5 4.5H6Z"
        fill="currentColor"
      />
      <path
        d="M9 0H19.5C20.2956 0 21.0587 0.316071 21.6213 0.87868C22.1839 1.44129 22.5 2.20435 22.5 3V18C22.5 18.7956 22.1839 19.5587 21.6213 20.1213C21.0587 20.6839 20.2956 21 19.5 21V19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V3C21 2.60218 20.842 2.22064 20.5607 1.93934C20.2794 1.65804 19.8978 1.5 19.5 1.5H9C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3H6C6 2.20435 6.31607 1.44129 6.87868 0.87868C7.44129 0.316071 8.20435 0 9 0V0Z"
        fill="currentColor"
      />
    </svg>
  );
};

const CurationCopyText = styled.div`
  color: var(--Primary-Strong, #6f6c8f);
  /* Body1/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.01rem;
  color: currentColor;
`;

const CurationBadges = styled.button`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border: none;
  background: none;
  color: var(--Primary-Strong, #6f6c8f);

  &:hover {
    cursor: pointer;
    color: #4a3aff;
  }
`;
