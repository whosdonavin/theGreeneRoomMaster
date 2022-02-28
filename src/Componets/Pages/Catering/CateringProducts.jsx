import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mobile, tablet, desktop } from "../../../Responsive";

const ProductsPage = styled.div`
  width: 75%;
  gap: 1.5rem;
  padding: 1rem;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  ${tablet({
    width: "100%",
    display: "grid",
    "grid-template-columns": "repeat(3, 1fr)",
  })}
  ${mobile({ "grid-template-columns": "repeat(2, 1fr)" })};
`;

const ProductLink = styled(Link)`
  width: 20%;
  color: black;
  display: flex;
  padding: 1rem;
  border-radius: 5px;
  height: fit-content;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  ${tablet({ width: "100%" })}
  &:hover {
    color: grey;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
const CateringProduct = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductImageContainer = styled.div`
  width: 100%;
`;
const ProductImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const ProductDescription = styled.div``;
const ProductTitle = styled.p`
  height: 8vh;
  font-size: 0.85rem;
  ${desktop({ "font-size": "1.25rem" })};
`;
const Price = styled.p`
  font-size: 1rem;
`;
const CateringProducts = () => {
  const [buffetItems, setBuffets] = useState([]);
  const [platterItems, setPlatters] = useState([]);
  const [sandwichItems, setSandwiches] = useState([]);
  const [customBuffetItems, setCustomBuffets] = useState([]);
  const [customPlatterItems, setCustomPlatters] = useState([]);

  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/catering/buffets")
      .then((res) => {
        setBuffets(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://thegreeneroommaster.herokuapp.com/api/catering/customBuffets"
      )
      .then((res) => {
        setCustomBuffets(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://thegreeneroommaster.herokuapp.com/api/catering/customPlatters"
      )
      .then((res) => {
        setCustomPlatters(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/catering/platters")
      .then((res) => {
        setPlatters(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/catering/sandwiches")
      .then((res) => {
        setSandwiches(res.data);
      });
  }, []);
  return (
    <ProductsPage>
      {buffetItems.map((buffet) => (
        <ProductLink
          key={buffet.itemName}
          to={`/catering/buffets/${buffet.itemName}`}
        >
          <CateringProduct>
            <ProductImageContainer>
              <ProductImage src={buffet.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{buffet.title}</ProductTitle>
              <Price>{`$${JSON.parse(buffet.eventPrices)[0]}.00`}</Price>
            </ProductDescription>
          </CateringProduct>
        </ProductLink>
      ))}
      {customBuffetItems.map((customBuffet) => (
        <ProductLink
          key={customBuffet.itemName}
          to={`/catering/customBuffets/${customBuffet.itemName}`}
        >
          <CateringProduct>
            <ProductImageContainer>
              <ProductImage src={customBuffet.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{customBuffet.title}</ProductTitle>
              <Price>{`$${JSON.parse(customBuffet.eventPrices)[0]}.00`}</Price>
            </ProductDescription>
          </CateringProduct>
        </ProductLink>
      ))}
      {platterItems.map((platter) => (
        <ProductLink
          key={platter.itemName}
          to={`/catering/platters/${platter.itemName}`}
        >
          <CateringProduct>
            <ProductImageContainer>
              <ProductImage src={platter.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{platter.title}</ProductTitle>
              <Price>{`$${JSON.parse(platter.eventPrices)[0]}.00`}</Price>
            </ProductDescription>
          </CateringProduct>
        </ProductLink>
      ))}
      {customPlatterItems.map((customPlatter) => (
        <ProductLink
          key={customPlatter.itemName}
          to={`/catering/customPlatters/${customPlatter.itemName}`}
        >
          <CateringProduct>
            <ProductImageContainer>
              <ProductImage src={customPlatter.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{customPlatter.title}</ProductTitle>
              <Price>{`$${JSON.parse(customPlatter.eventPrices)[0]}`}</Price>
            </ProductDescription>
          </CateringProduct>
        </ProductLink>
      ))}
      {sandwichItems.map((sandwich) => (
        <ProductLink
          key={sandwich.itemName}
          to={`/catering/sandwiches/${sandwich.itemName}`}
        >
          <CateringProduct>
            <ProductImageContainer>
              <ProductImage src={sandwich.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{sandwich.title}</ProductTitle>
              <Price>{`$${JSON.parse(sandwich.eventPrices)[0]}`}</Price>
            </ProductDescription>
          </CateringProduct>
        </ProductLink>
      ))}
    </ProductsPage>
  );
};

export default CateringProducts;
