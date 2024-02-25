import React, { useEffect, useState } from "react";
import styled, {css} from "styled-components";

const Tag = ({tags, selectionChange}) => {
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
      selectionChange(selectedTags);
    }, [selectedTags])

    const handleTagClick = (tag) => {
        setSelectedTags((prev) => 
            prev.includes(tag)
                ? prev.filter((prevTag) => prevTag !== tag)
                : [...prev, tag]
        );
    };

    return (
        <TagContainer>
          <TagGroupItem>
            <TagItemTextBox>
              <TagItemText1>#</TagItemText1>
              <TagItemText2>태그</TagItemText2>
            </TagItemTextBox>
          </TagGroupItem>
          <TagLine />
          <TagListContainer>
            {tags.map((tag, index) => (
                <TagItem
                    key={index}
                    onClick={() => handleTagClick(tag.id)}
                    selected={selectedTags.includes(tag.id)}
                >
                    <TagItemText selected={selectedTags.includes(tag.id)}>#{tag.name}</TagItemText>
                </TagItem>
            ))}
          </TagListContainer>
        </TagContainer>
    );
};

export default Tag;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

const TagGroupItem = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;

  border-bottom: 1px solid var(--Grayscale-200, #eff0f6);
  background: var(--Grayscale-000, #fff);
`;

const TagItemTextBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;
`;

const TagItemText1 = styled.div`
  color: var(--Gray-800, #343a40);

  /* Body1/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const TagItemText2 = styled.div`
  color: var(--Grayscale-700, #170f49);

  /* Body1/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const TagLine = styled.div`
  width: 48.125rem;
  height: 0.0625rem;

  background: var(--Grayscale-700, #170f49);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TagListContainer = styled.div`
  display: flex;
  padding: 0.75rem 0.5rem;
  align-items: center;
  align-content: center;
  gap: 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

const TagItem = styled.button`
  display: flex;
  height: 2rem;
  padding: 0.25rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  border-radius: 1rem;
  border: 1px solid var(--Grayscale-200, #eff0f6);
  background: var(--Grayscale-200, #eff0f6);

  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid var(--Primary-Weak, #E8E4FF);
      background: var(--Primary-Weak, #E8E4FF);
    `}

  &:active {
    transform: scale(0.95);
  }
`;

const TagItemText = styled.div`
  color: var(--Grayscale-400, #a0a3bd);

  /* Body2/Regular */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.00875rem;

  ${({ selected }) =>
    selected &&
    css`
      color: var(--Primary-Strong, #4A3AFF);
    `}

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;