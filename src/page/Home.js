import { styled } from "styled-components";
import Curation from "../component/home/Curation";
import Discription from "../component/home/Description";
import Input from "../component/home/Input";
import Reference from "../component/home/Reference";

const Home = () => {
  return (
    <div>
      <CardList>
        <Input />
        <Curation />
        <Discription />
        <Reference  />
      </CardList>
    </div>
  );
};

export default Home;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
