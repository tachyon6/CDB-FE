import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import client from "../client";
import ListCreator from "../component/list/ListCreator";
import ListSelection from "../component/list/ListSelection";
import { FILTER_QUESTION_MATH } from "../gql/filtering";
import {
  GET_ALL_DIFF_MATH,
  GET_ALL_MONTH_MATH,
  GET_ALL_SUBJECT_MATH,
  GET_ALL_TAG_MATH,
} from "../gql/filterItem";

const List = () => {
  const listSelectionRef = useRef(null);
  const [isListCreated, setIsListCreated] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [diffs, setDiffs] = useState([]);
  const [months, setMonths] = useState([]);
  const [tags, setTags] = useState([]);

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState({
    selectedSections: [],
    selectedDiffs: [],
    selectedMonths: [],
    selectedTags: [],
    selectedYears: [],
  });
  const exYears = [
    {
      id: 1,
      name: "2022-2024",
      bot: [
        {
          id: 1,
          name: "2024",
        },
        {
          id: 2,
          name: "2023",
        },
        {
          id: 3,
          name: "2022",
        },
      ],
    },
    {
      id: 2,
      name: "2019-2021",
      bot: [
        {
          id: 4,
          name: "2021",
        },
        {
          id: 5,
          name: "2020",
        },
        {
          id: 6,
          name: "2019",
        },
      ],
    },
    {
      id: 3,
      name: "2016-2018",
      bot: [
        {
          id: 7,
          name: "2018",
        },
        {
          id: 8,
          name: "2017",
        },
        {
          id: 9,
          name: "2016",
        },
      ],
    },
  ];

  useEffect(() => {
    client
      .query({
        query: GET_ALL_SUBJECT_MATH,
      })
      .then((res) => {
        setSubjects(res.data.getAllSubjectMath);
        console.log(subjects);
      })
      .catch((err) => {
        console.log(err);
      });

    client
      .query({
        query: GET_ALL_DIFF_MATH,
      })
      .then((res) => {
        setDiffs(res.data.getAllDiffMath);
        console.log(diffs);
      })
      .catch((err) => {
        console.log(err);
      });

    client
      .query({
        query: GET_ALL_MONTH_MATH,
      })
      .then((res) => {
        setMonths(res.data.getAllMonthMath);
        console.log(months);
      })
      .catch((err) => {
        console.log(err);
      });

    client
      .query({
        query: GET_ALL_TAG_MATH,
      })
      .then((res) => {
        setTags(res.data.getAllTagMath);
        console.log(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 선택 상태를 업데이트하는 함수
  const handleSelectionChange = (type, newSelection) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [type]: newSelection,
    }));
  };

  const handleCreateList = () => {
    client
      .query({
        query: FILTER_QUESTION_MATH,
        variables: {
          filter_question_math: {
            section_ids: selected.selectedSections,
            diff_ids: selected.selectedDiffs,
            month_ids: selected.selectedMonths,
            tag_ids: selected.selectedTags,
            year_ids: selected.selectedYears,
          },
          fetchPolicy: "no-cache",
        },
      })
      .then((res) => {
        setList(res.data.getFilterQuestionMath);
        setIsListCreated(true);
        if(listSelectionRef.current){
          listSelectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (isListCreated && listSelectionRef.current) {
      listSelectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [list]);

  return (
    <CardList>
      <ListCreator
        exSections={subjects}
        exDiffs={diffs}
        exMonths={months}
        exTags={tags}
        exYears={exYears}
        onSelectionChange={handleSelectionChange}
        onCreateList={handleCreateList}
      />
      {isListCreated && <ListSelection ref={listSelectionRef} list={list} />}
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
