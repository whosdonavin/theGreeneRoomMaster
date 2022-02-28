import axios from "axios";
import styled from "styled-components";
import { tablet } from "../../Responsive";
import { useState, useEffect } from "react";

const Container = styled.section`
  text-align: center;
  padding: 1rem 4rem;
  ${tablet({ padding: "0.5rem" })}
`;
const Heading = styled.h1`
  font-size: 3rem;
  ${tablet({ "font-size": "1.25rem", padding: "0 2rem" })}
`;
const SubHeading = styled.h3`
  font-size: 1.5rem;
  ${tablet({ "font-size": "1rem", padding: "0 2rem" })}
`;
const ImageGallery = styled.div`
  gap: 1rem;
  display: grid;
  padding: 2rem 0;
  place-content: center;
  grid-template-columns: repeat(auto-fit, 300px);
`;
const GalleryImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`;

const Home = () => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    axios
      .get(`https://thegreeneroommaster.herokuapp.com/api/home`)
      .then((res) => {
        setItem(res.data);
      });
  }, []);
  return (
    <Container>
      <Heading>Welcome To The Greene Room</Heading>
      <SubHeading> From Custom Cakes To Unique Dining Experiences</SubHeading>
      <ImageGallery>
        {item.map((img) => {
          return <GalleryImage key={img.id} src={img.imgUrl} />;
        })}
      </ImageGallery>
    </Container>
  );
};

export default Home;
