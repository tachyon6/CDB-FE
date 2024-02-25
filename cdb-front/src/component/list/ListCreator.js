import React, { useState } from "react";
import styled from "styled-components";
import CheckList from "./list-creator/CheckList";
import Tag from "./list-creator/Tag";

const ListCreator = ({
  exSections,
  exDiffs,
  exMonths,
  exTags,
  exYears,
  onSelectionChange,
  onCreateList,
}) => {
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
      <Tag
        tags={exTags}
        key={`tag-${resetKey}`}
        selectionChange={(selectedItems) =>
          onSelectionChange("selectedTags", selectedItems)
        }
      />
      <CheckList
        type="단원"
        list={exSections}
        key={`checklist1-${resetKey}`}
        selectionChange={(selectedItems) =>
          onSelectionChange("selectedSections", selectedItems)
        }
      />
      <CheckList
        type="난이도"
        list={exDiffs}
        key={`checklist2-${resetKey}`}
        selectionChange={(selectedItems) =>
          onSelectionChange("selectedDiffs", selectedItems)
        }
      />
      <CheckList
        type="시행월"
        list={exMonths}
        key={`checklist3-${resetKey}`}
        selectionChange={(selectedItems) =>
          onSelectionChange("selectedMonths", selectedItems)
        }
      />
      <CheckList
        type="연도"
        list={exYears}
        key={`checklist4-${resetKey}`}
        selectionChange={(selectedItems) =>
          onSelectionChange("selectedYears", selectedItems)
        }
      />

      <ListButton onClick={onCreateList}>
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

  @media (max-width: 768px) {
    width: 21.4375rem;
    padding: 3.5rem 1rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
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

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
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
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
  &:hover {
    background: var(--Primary, #3829e0);
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px white,
      0 0 0 4px var(--Primary-Strong);
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
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;

  &:hover {
    cursor: pointer;
    background-color: #4a3aff;

    ${ResetButtonText} {
      color: white;
    }
  }
  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px white,
      0 0 0 4px var(--Primary-Strong);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
