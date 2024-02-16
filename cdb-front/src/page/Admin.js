import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { CHECK_IS_ADMIN_AUTHENTICATED, GET_ADMIN_JWT_TOKEN } from "../gql/admin-auth";
import styled from "styled-components";

const Admin = () => {
  const [inputCode, setInputCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const jwtAccessToken = localStorage.getItem('accessToken') || '';

    client
      .query({
        query: CHECK_IS_ADMIN_AUTHENTICATED,
        context: {
          headers: {
            authorization: jwtAccessToken ? `Bearer ${jwtAccessToken}` : '',
          }
        }
      })
      .then((res) => {
        console.log(res);
        setIsAuthenticated(res.data.adminCheck);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAuth = () => {
    setIsLoading(true);
    client
      .query({
        query: GET_ADMIN_JWT_TOKEN,
        variables: {
          code: inputCode,
        },
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.adminCodeToJwt.accessToken);
        setIsAuthenticated(true);
        alert("환영합니다 관리자님!");
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "not correct code") {
          alert("올바르지 않은 코드입니다.");
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    window.location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <Container>
      {!isAuthenticated ? (
        <LoginContainer>
          <LoginForm onSubmit={handleAuth}>
            <LoginTitle>관리자 로그인</LoginTitle>
            <Divider />
            <Input
              type="password"
              placeholder="관리자 코드를 입력하세요"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            />
            <ButtonContainer>
              <Button type="submit">로그인</Button>
            </ButtonContainer>
          </LoginForm>
        </LoginContainer>
      ) : (
        <>
          <ButtonLink to="/admin/upload">업로드하기</ButtonLink>
          <ButtonLink to="/admin/data">사용데이터 보기</ButtonLink>
          <BottomCorner>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </BottomCorner>
        </>
      )}
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  padding: 20px;
`;

const ButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: transparent;
  color: #4a3aff;
  border-radius: 10px;
  border: 2px solid #4a3aff;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #4a3aff;
    color: #fff;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.25);
  }
`;

const BottomCorner = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: transparent;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 50ox;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
`;

const LoginTitle = styled.h2`
  text-align: center;
  justify-content: center;  
  margin-bottom: 0rem;
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 1px solid ${(props) => (props.disabled ? "#ddd" : "#5b00ff")};
`;

const Input = styled.input`
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: #4a3aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    cursor: pointer;
    background-color: #3a2aff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px #4a3aff;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`;