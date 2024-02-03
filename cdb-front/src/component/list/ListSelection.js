import React from "react";
import styled from "styled-components";
import List from "../../page/List";

const ListSelection = () => {
  return (
    <ListSelectionContainer>
      <SelectionTitleContainer>
        <SelectionTitleBox>
          <SelectionTitle>리스트 복사하기</SelectionTitle>
        </SelectionTitleBox>
        <SelectionSubTitle>
          <SelectionHighlight>[복사하기] </SelectionHighlight>
          버튼을 클릭하여 복사한 뒤,
          <SelectionHighlight> [기출문제 뽑기] </SelectionHighlight>
          화면의 문제 번호 입력창에 붙여넣어주세요!
        </SelectionSubTitle>
      </SelectionTitleContainer>
      <SelectionItemContainer>
        <ListSelectionTitle>문제 리스트</ListSelectionTitle>
        <ListSelectionItem>
          231130B, 201130A, 201129A, 191130A
        </ListSelectionItem>
      </SelectionItemContainer>
      <ListSelectionButton>
        <ListSelectionButtonText>복사하기</ListSelectionButtonText>
      </ListSelectionButton>
    </ListSelectionContainer>
  );
};

export default ListSelection;

const ListSelectionContainer = styled.div`
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

const SelectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const SelectionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

const SelectionTitle = styled.div`
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

const SelectionSubTitle = styled.div`
  color: var(--Primary-Strong, #4a3aff);
  align-self: stretch;
  text-align: center;

  /* H6/Medium */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SelectionHighlight = styled.span`
  font-weight: 700;
`;

const SelectionItemContainer = styled.div`
  display: flex;
  padding: var(--Lg, 1.5rem) 0.75rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  align-self: stretch;

  border-radius: 0.75rem;
  border: 2px solid var(--Primary-Medium, #aa9df4);
  background: var(--Grayscale-000, #fff);
`;

const ListSelectionTitle = styled.div`
  display: flex;
  padding: 0rem 0.75rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  flex: 1 0 0;
  color: var(--Grayscale-700, #170f49);

  /* H5/Bold */
  font-family: "Pretendard Variable";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.015rem;
`;

const ListSelectionItem = styled.div`
  align-self: stretch;
  color: var(--Gray-800, #343a40);
  text-align: center;

  /* Body1/Bold */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const ListSelectionButton = styled.button`
  display: flex;
  padding: 1rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;

  border-radius: 0.5rem;
  background: var(--Primary-Strong, #4a3aff);
  border: none;
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

const ListSelectionButtonText = styled.div`
  color: var(--Grayscale-000, #fff);

  /* Body1/Bold */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.01rem;
`;
