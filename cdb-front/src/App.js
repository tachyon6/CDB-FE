import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/common/Header";
import Home from "./page/Home";
import { styled } from "styled-components";
import List from "./page/List";
import Admin from "./page/Admin";
import AdminUpload from "./component/admin/admin-page/AdminUpload";
import ProtectedRoute from "./component/admin/auth/RouteProtect";
import AdminData from "./component/admin/admin-page/AdminData";

function App() {
  return (
    <div className="App">
      <DefaultPage>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/upload" element={<ProtectedRoute><AdminUpload /></ProtectedRoute>} />
            <Route path="/admin/data" element={<ProtectedRoute><AdminData /></ProtectedRoute>} />
          </Routes>
        </Router>
      </DefaultPage>
    </div>
  );
}

export default App;

const DefaultPage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 1.125rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: var(--Grayscale-200, #D6D7DE);
`;
