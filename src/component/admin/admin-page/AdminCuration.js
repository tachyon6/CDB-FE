import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../../client";
import {
  CREATE_CURATION_LIST,
  DELETE_CURATION_LIST,
  GET_ALL_CURATION,
  UPDATE_CURATION_LIST,
} from "../../../gql/curationList";

const Modal = ({ children, onClose }) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalView>
    </ModalBackdrop>
  );
};

const CurationItem = ({ id, header, title, list }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [newList, setNewList] = useState(list);
  const [newHeader, setNewHeader] = useState(header);
  const [newTitle, setNewTitle] = useState(title);

  const listLength = list.split(" ").length;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteConfirm = () => {
    setIsConfirmingDelete(true);
  };

  const onChangeNewList = (e) => {
    setNewList(e.target.value);
  };

  const onChangeNewHeader = (e) => {
    setNewHeader(e.target.value);
  };

  const onChangeNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleCurationUpdate = () => {
    console.log("update");
    client
      .mutate({
        mutation: UPDATE_CURATION_LIST,
        variables: {
          curation_id: id,
          create_curation_list: {
            subject: newHeader,
            name: newTitle,
            list: newList,
          },
        },
      })
      .then((result) => {
        console.log(result);
        alert("수정되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("수정에 실패했습니다.");
      });
  };

  const handleActualDelete = () => {
    setIsConfirmingDelete(false);
    client
      .mutate({
        mutation: DELETE_CURATION_LIST,
        variables: { curation_id: id },
      })
      .then((result) => {
        console.log(result);
        alert("삭제되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("삭제에 실패했습니다.");
      });
  };

  return (
    <CurationList>
      <CurationListNum>
        <CurationListNumText>{header}</CurationListNumText>
      </CurationListNum>
      <CurationListItem>
        <CurationItemHeading>
          <CurationItemTitle>{title}</CurationItemTitle>
          <CurationItemSubtitle>총 {listLength}문항</CurationItemSubtitle>
        </CurationItemHeading>
        <CurationBadges onClick={handleEdit}>
          <CurationCopyText>수정</CurationCopyText>
        </CurationBadges>
        <CurationBadges onClick={handleDeleteConfirm}>
          <CurationCopyText>삭제</CurationCopyText>
        </CurationBadges>
      </CurationListItem>
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <InputHeader>
            <InputTitle>문항모음 수정하기</InputTitle>
          </InputHeader>
          <InputContainer>
            <Label>자료 모음 이름</Label>
            <Input
              type="text"
              placeholder="최근 N개년 ~"
              value={newTitle}
              onChange={onChangeNewTitle}
            />
          </InputContainer>
          <InputContainer>
            <Label>과목</Label>
            <Input
              type="text"
              placeholder="미적분"
              value={newHeader}
              onChange={onChangeNewHeader}
            />
          </InputContainer>
          <InputContainer>
            <Label>문항 리스트</Label>
            <TextArea
              placeholder="241130B 241129B .."
              value={newList}
              onChange={onChangeNewList}
            />
          </InputContainer>
          <ButtonContainer>
            <Button onClick={handleCurationUpdate}>수정하기</Button>
          </ButtonContainer>
        </Modal>
      )}
      {isConfirmingDelete && (
        <Modal onClose={() => setIsConfirmingDelete(false)}>
          <p>정말로 삭제하시겠습니까?</p>
          <ModalButtonContainer>
            <ModalButton onClick={handleActualDelete}>예</ModalButton>
            <ModalButton onClick={() => setIsConfirmingDelete(false)}>
              아니오
            </ModalButton>
          </ModalButtonContainer>
        </Modal>
      )}
    </CurationList>
  );
};

const AdminCuration = () => {
  const [curations, setCurations] = useState([]);
  useEffect(() => {
    client
      .query({
        query: GET_ALL_CURATION,
      })
      .then((result) => {
        console.log(result);
        setCurations(result.data.getCurationList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [curationName, setCurationName] = useState("");
  const [curationSubject, setCurationSubject] = useState("");
  const [curationList, setCurationList] = useState("");

  const onChangeCurationName = (e) => {
    setCurationName(e.target.value);
  };

  const onChangeCurationSubject = (e) => {
    setCurationSubject(e.target.value);
  };

  const onChangeCurationList = (e) => {
    setCurationList(e.target.value);
  };

  const handleCurationUpload = () => {
    console.log(curationName, curationSubject, curationList);
    client
      .mutate({
        mutation: CREATE_CURATION_LIST,
        variables: {
          create_curation_list: {
            name: curationName,
            subject: curationSubject,
            list: curationList,
          },
        },
      })
      .then((result) => {
        console.log(result);
        alert("문항모음이 추가되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("문항모음 추가에 실패했습니다.");
      });
  };

  return (
    <CardList>
      <CurationUploadContainer>
        <InputHeader>
          <InputTitle>새 문항모음 업로드하기</InputTitle>
        </InputHeader>
        <InputContainer>
          <Label>자료 모음 이름</Label>
          <Input
            type="text"
            placeholder="최근 N개년 ~"
            value={curationName}
            onChange={onChangeCurationName}
          />
        </InputContainer>
        <InputContainer>
          <Label>과목</Label>
          <Input
            type="text"
            placeholder="미적분"
            value={curationSubject}
            onChange={onChangeCurationSubject}
          />
        </InputContainer>
        <InputContainer>
          <Label>문항 리스트</Label>
          <TextArea
            placeholder="241130B 241129B .."
            value={curationList}
            onChange={onChangeCurationList}
          />
        </InputContainer>
        <ButtonContainer>
          <Button onClick={handleCurationUpload}>추가하기</Button>
        </ButtonContainer>
      </CurationUploadContainer>
      <CurationContainer>
        <CurationTitleContainer>
          <CurationSubtitle>좋은 문제들을 제공해라</CurationSubtitle>
          <CurationTitle>선별 영역 수정</CurationTitle>
          <CurationTag>4점 선별</CurationTag>
          <CurationTagText>
            쓸모 없는건 지우고, 좋은 것만 모아라
          </CurationTagText>
        </CurationTitleContainer>
        <Line />
        {curations.map((curation) => (
          <CurationItem
            key={curation.id}
            id={curation.id}
            header={curation.subject}
            title={curation.name}
            list={curation.list}
          />
        ))}
      </CurationContainer>
    </CardList>
  );
};

export default AdminCuration;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const CurationUploadContainer = styled.div`
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
    gap: 1.5rem;
  }
`;

const InputHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

const InputTitle = styled.h1`
  margin: 0;
  color: var(--Grayscale-700, #170f49);
  text-align: center;

  font-family: "Pretendard Variable";
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #555;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: 1px solid #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #555;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  &:focus {
    outline: 1px solid #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  width: 100%;
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

  @media (max-width: 768px) {
    width: 21.4375rem;
    padding: 3.5rem 1rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }
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

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
  
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalView = styled.div`
  position: relative;
  width: 50%;
  background: white;
  padding: 20px;
  padding-top: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    background: #e5e5e5;
    transform: translateY(1px);
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  flex-direction: row;
`;
