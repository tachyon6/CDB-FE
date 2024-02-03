import React, { useState } from "react";
import styled from "styled-components";
import CheckList from "./list-creator/CheckList";
import Tag from "./list-creator/Tag";

const ListCreator = () => {
  const [resetKey, setResetKey] = useState(0);

  const resetFilters = () => {
    setResetKey((prevKey) => prevKey + 1);
  };
  return (
    <ListCreatorContainer>
      <ListTitleContainer>
        <ListTitle>리스트 생성하기</ListTitle>
      </ListTitleContainer>
      <NavBar>
        <NavItem>수학</NavItem>
        <ResetButton onClick={resetFilters}>
            <ResetButtonText>필터 초기화</ResetButtonText>
            </ResetButton>
      </NavBar>
      <Tag key={`tag-${resetKey}`} />
      <CheckList
        key={`checklist1-${resetKey}`}
        top="단원"
        mid={["수1", "수2", "미적분", "확률과 통계", "기하"]}
        bot={{
          수1: [
            "지수와 로그",
            "지수함수와 로그함수",
            "삼각함수",
            "등차수열과 등비수열",
            "수열의 합",
            "수학적 귀납법",
          ],
          수2: [
            "함수의 극한",
            "함수의 연속",
            "미분계수",
            "도함수",
            "도함수의 활용(수2)",
            "부정적분",
            "정적분",
            "정적분의 활용(수2)",
          ],
          미적분: [
            "수열의 극한",
            "급수",
            "여러가지 함수의 미분",
            "여러 가지 미분법",
            "도함수의 활용(미적분)",
            "여러 가지 적분법",
            "정적분의 활용(미적분)",
          ],
          "확률과 통계": [
            "순열과 조합",
            "이항정리",
            "확률의 뜻과 활용",
            "조건부 확률",
            "확률분포",
            "통계적 추정",
          ],
          기하: [
            "이차곡선",
            "벡터의 연산",
            "평면벡터의 성분과 내적",
            "직선과 평면",
            "정사영",
            "공간좌표",
          ],
        }}
      />
      <CheckList
        key={`checklist2-${resetKey}`}
        top="난이도"
        mid={["기본(2, 3점)", "4점 비킬러", "4점 준킬러", "4점 킬러"]}
      />
      <CheckList
        key={`checklist3-${resetKey}`}
        top="연도"
        mid={["2022-2024", "2018-2021", "2014-2017", "~2013"]}
        bot={{
          "2022-2024": ["2022", "2023", "2024"],
          "2018-2021": ["2018", "2019", "2020", "2021"],
          "2014-2017": ["2014", "2015", "2016", "2017"],
          "~2013": ["2013 이전"],
        }}
      />
      <ListButton>
        <ListButtonText>리스트 생성하기</ListButtonText>
      </ListButton>
    </ListCreatorContainer>
  );
};

export default ListCreator;

const ListCreatorContainer = styled.div`
  display: flex;
  width: 51.125rem;
  padding: var(--Lg, 1.5rem);
  flex-direction: column;
  align-items: center;
  gap: var(--Lg, 1.5rem);

  border-radius: 1.5rem;
  background: var(--Grayscale-000, #fff);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const ListTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

const ListTitle = styled.div`
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

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-bottom: 1px solid var(--Grayscale-300, #d9dbe9);
`;

const NavItem = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: flex-start;
  border-bottom: 2px solid var(--Primary-Strong, #4a3aff);
  color: var(--Primary-Strong, #4a3aff);

  /* Body1/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const ListButton = styled.button`
  display: flex;
  padding: 1rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;

  border-radius: 0.5rem;
  background: var(--Primary-Strong, #4a3aff);
  border: none;
  color: white;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  &:hover {
    background: var(--Primary, #3829e0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--Primary-Strong);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const ListButtonText = styled.div`
  color: var(--Grayscale-000, #fff);

  /* Body1/Bold */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const ResetButtonText = styled.div`
  color: var(--Grayscale-400, #a0a3bd);

  /* Body2/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.00875rem;
`;

const ResetButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    cursor: pointer;
    background-color: #4a3aff;

    ${ResetButtonText} {
        color: white;
    }
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--Primary-Strong);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

