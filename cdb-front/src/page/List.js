import React from "react";
import styled from "styled-components";
import ListCreator from "../component/list/ListCreator";
import ListSelection from "../component/list/ListSelection";

const List = () => {
  return (
    <CardList>
      <ListCreator />
      <ListSelection />
    </CardList>
  );
};

export default List;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
