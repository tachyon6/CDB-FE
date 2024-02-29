import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";
import client from "../../../client";
import AdminUploadModule from "../uploader/AdminUploadModule";
import LoadingSpinner from "../uploader/LoadingSpinner";
import {
  GET_ALL_SUBJECT_MATH,
  GET_ALL_DIFF_MATH,
  GET_ALL_MONTH_MATH,
  GET_ALL_TAG_MATH,
} from "../../../gql/filterItem";
import { CREATE_QUESTION_MATH } from "../../../gql/create-question";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_S3_BUCKET },
  region: process.env.REACT_APP_S3_REGION,
});

const AdminUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [diffs, setDiffs] = useState([]);
  const [months, setMonths] = useState([]);
  const [tags, setTags] = useState([]);
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

  const [selected, setSelected] = useState({
    selectedSections: [],
    selectedAnswer: "",
    selectedDiffs: null,
    selectedMonths: null,
    selectedTags: [],
    selectedYears: null,
  });

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

  const handleSelectionChange = (type, newSelection) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [type]: newSelection,
    }));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCreateList = () => {
    if (selectedFile) {
      setIsLoading(true);
      const params = {
        //ACL: "public-read",
        Body: selectedFile,
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `uploads/${selectedFile.name}`,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(evt);
        })
        .send((err) => {
          if (err) {
            console.log(err);
            alert("Error");
          } else {
            console.log("Uploaded");
            console.log(selected);
            console.log(selected.selectedYears[0]);
            client
              .mutate({
                mutation: CREATE_QUESTION_MATH,
                variables: {
                  create_question_math: {
                    code: selectedFile.name.slice(0, -4),
                    answer: selected.selectedAnswer,
                    download_url: `https://cdb-math.s3.ap-northeast-2.amazonaws.com/uploads/${selectedFile.name}`,
                    year_math_id: selected.selectedYears[0],
                    month_math_id: selected.selectedMonths,
                    diff_math_id: selected.selectedDiffs,
                    section_math_ids: selected.selectedSections,
                    tag_ids: selected.selectedTags,
                  },
                  fetchPolicy: "no-cache",
                },
              })
              .then((res) => {
                console.log(res);
                setIsLoading(false);
                alert(
                  " code: " +
                    res.data.createQuestionMath.code +
                    "가 " +
                    res.data.createQuestionMath.download_url +
                    "로 업로드 되었습니다."
                );
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
                alert("Error");
                window.location.reload();
              });
          }
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CardList>
          <AdminUploadModule
            exSections={subjects}
            exDiffs={diffs}
            exMonths={months}
            exTags={tags}
            exYears={exYears}
            onSelectionChange={handleSelectionChange}
            onCreateList={handleCreateList}
            onFileSelect={handleFileSelect}
          />
        </CardList>
      )}
    </>
  );
};

export default AdminUpload;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
