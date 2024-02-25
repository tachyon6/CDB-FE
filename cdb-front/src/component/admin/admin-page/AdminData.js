import React, { useEffect, useState } from "react";
import client from "../../../client";
import { GET_DOWNLOAD_LOGS_BY_DATE } from "../../../gql/create-download-log";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const AdminData = () => {
  const [downloadLogs, setDownloadLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  useEffect(() => {
    const localDate = new Date(selectedDate);
    localDate.setHours(0, 0, 0, 0);
    const year = localDate.getFullYear();
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2);
    const day = ('0' + localDate.getDate()).slice(-2);

    const formatDate = `${year}${month}${day}`;
    console.log(formatDate);
    client
      .query({
        query: GET_DOWNLOAD_LOGS_BY_DATE,
        variables: { date: formatDate },
      })
      .then((result) => {
        setDownloadLogs(result.data.getDownloadLogByDay);
        setCurrentPage(1);
        console.log(result.data.getDownloadLogByDay);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedDate]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = downloadLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(downloadLogs.length / logsPerPage);

  return (
    <div>
      <h1>사용 데이터 보기</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
      />
      <p>데이터 수: {downloadLogs.length}</p>
      <div>
        <LogItemHeader>
          <LogTitle>제목</LogTitle>
          <LogDetail>내용</LogDetail>
          <LogDetail>생성일</LogDetail>
        </LogItemHeader>
        {currentLogs.map((log) => (
          <LogItem key={log.id}>
            <LogTitle>{log.title}</LogTitle>
            <LogDetail>{log.input}</LogDetail>
            <LogDetail>{log.created_at}</LogDetail>
          </LogItem>
        ))}
      </div>
      <Pagination>
        <PageButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          이전
        </PageButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          다음
        </PageButton>
      </Pagination>
    </div>
  );
};

export default AdminData;

const LogItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px;
  &:last-child {
    border-bottom: none;
  }
  gap: 10px;
`;

const LogTitle = styled.p`
  font-weight: bold;
`;

const LogDetail = styled.p`
  color: #666;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  &:hover {
    cursor: pointer;
    background-color: #e9e9e9;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const LogItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 3px solid #000;
  border-bottom: 3px solid #000;
  padding: 10px;
  font-weight: bold;
  color: #000;
`;
