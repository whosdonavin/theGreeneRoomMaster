import styled from "styled-components";
import Img from "../../Img/privateEvent.jpeg";
import { mobile, tablet } from "../../Responsive";

const PrivateEventPage = styled.section`
  padding: 1rem;
`;
const NoAppointments = styled.div`
  color: red;
`;
const ItemContainer = styled.div`
  gap: 5%;
  color: black;
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  align-items: center;
  flex-direction: row;
  ${tablet({ "flex-direction": "column-reverse" })}
`;
const ImageContainer = styled.div`
  width: 50%;
  ${tablet({ width: "60%" })}
  ${mobile({ width: "100%" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const ProductDescription = styled.div`
  gap: 2rem;
  width: 50%;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  justify-content: flex-start;
  ${tablet({ width: "60%", "text-align": "center", "margin-bottom": "1rem" })}
  ${mobile({ width: "100%" })}
`;
const ProductTitle = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
`;
const ProductDetails = styled.p``;
const Price = styled.p``;

const PrivateEvent = () => {
  return (
    <PrivateEventPage>
      <ItemContainer>
        <ImageContainer>
          <Image src={Img} />
        </ImageContainer>

        <ProductDescription>
          <ProductTitle>Private Event</ProductTitle>
          <ProductDetails>
            Want to enjoy a romantic night in? Host a small dinner party? Let
            our premiere Chef create a unique dining experience for you in the
            comfort of your own home. You will not regret it!
          </ProductDetails>
          <Price>$500.00</Price>
          <NoAppointments>Currenly No Appointments Avaliable</NoAppointments>
        </ProductDescription>
      </ItemContainer>
    </PrivateEventPage>
  );
};

export default PrivateEvent;
