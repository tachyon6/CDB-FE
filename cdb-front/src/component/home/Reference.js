import React from "react";
import styled from "styled-components";

const Reference = () => {
  return (
    <ReferenceContainer>
        <ReferenceTitleContainer>
            <ReferenceTitle>문제 출처</ReferenceTitle>
            <Line />
        </ReferenceTitleContainer>
        <ReferenceImg />
    </ReferenceContainer>
  )
};

export default Reference;

const ReferenceContainer = styled.div`
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

const ReferenceTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const ReferenceTitle = styled.h1`
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

const Line = styled.div`
  width: 48.125rem;
  height: 0.0625rem;
  background: var(--Grayscale-700, #170f49);
`;

const ReferenceImg = styled.div`
  width: 14.3125rem;
  height: 3.3125rem;
  background: url("/assets/Reference.svg");
`;
