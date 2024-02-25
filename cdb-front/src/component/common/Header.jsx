import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleListClick = () => {
    navigate("/list");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleAdminClick = () => {
    navigate("/admin");
  }

  return (
    <HeaderContainer>
      <Logo onClick={handleHomeClick} />
      <NavContainer>
        <Nav onClick={handleHomeClick} active={isActive("/")}>
          기출문제 뽑기
        </Nav>
        <Nav onClick={handleListClick} active={isActive("/list")}>
          리스트 생성하기
        </Nav>
        {localStorage.getItem("accessToken") ? <AdminHeader onClick={handleAdminClick} >관리자페이지</AdminHeader> : null}
      </NavContainer>
      <RightSpace />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  min-width: 680px;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 3rem;
  background: var(--Grayscale-000, #fff);
  box-sizing: border-box; 
  border: none;

  @media (max-width: 768px) {
    min-width: 0;
    justify-content: space-between;
    gap: 0;
  }

`;

const Logo = styled.div`
  width: 8.5rem;
  height: 2.5rem;
  background: url("/assets/Original 1.svg"), lightgray -29.013px -76.396px / 142.4% 481.081% no-repeat;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;

  @media (max-width: 768px) {
    flex: 1 0 0;
  }
`;

const Nav = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: flex-start;

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;

  border-radius: 0.5rem;
  background: #fff;
  color: ${(props) => (props.active ? "#4a3aff" : "#000")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #4a3aff;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const RightSpace = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.5rem;
  align-items: flex-start;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 0;
  }
`;

const AdminHeader = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: flex-start;

  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;

  border-radius: 0.5rem;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #0064ff;
    border: 2px solid #0064ff;
  }
`;