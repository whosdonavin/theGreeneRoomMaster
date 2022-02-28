import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Message = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;
const Home = styled(Link)`
  color: black;
  border-bottom: 1px solid;
`;
const NotFound = () => {
  return (
    <NotFoundPage>
      <Message>
        Looks like you're lost, let's get you back <Home to="/">home</Home>.
      </Message>
    </NotFoundPage>
  );
};

export default NotFound;
