import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mobile, tablet, desktop } from "../../../Responsive";

const ProductsPage = styled.div`
  width: 75%;
  gap: 1.5rem;
  display: flex;
  padding: 1rem;
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
  padding: 1rem;
  display: flex;
  color: black;
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
const BakeryProduct = styled.div`
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
const BakeryProducts = () => {
  const [cakeItems, setCakes] = useState([]);
  const [treatItems, setTreats] = useState([]);
  const [cookieItems, setCookies] = useState([]);
  const [cupcakeItems, setCupcakes] = useState([]);
  const [dessertItems, setDesserts] = useState([]);

  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/bakery/cakes")
      .then((res) => {
        setCakes(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/bakery/cupcakes")
      .then((res) => {
        setCupcakes(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/bakery/cookies")
      .then((res) => {
        setCookies(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/bakery/desserts")
      .then((res) => {
        setDesserts(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/bakery/treats")
      .then((res) => {
        setTreats(res.data);
      });
  }, []);

  return (
    <ProductsPage>
      {cakeItems.map((cake) => (
        <ProductLink key={cake.itemName} to={`/bakery/cakes/${cake.itemName}`}>
          <BakeryProduct>
            <ProductImageContainer>
              <ProductImage src={cake.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{cake.title}</ProductTitle>
              <Price>{`$${JSON.parse(cake.prices)[0]}`}</Price>
            </ProductDescription>
          </BakeryProduct>
        </ProductLink>
      ))}
      {cupcakeItems.map((cupcake) => (
        <ProductLink
          key={cupcake.itemName}
          to={`/bakery/cupcakes/${cupcake.itemName}`}
        >
          <BakeryProduct>
            <ProductImageContainer>
              <ProductImage src={cupcake.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{cupcake.title}</ProductTitle>
              <Price>{`$${JSON.parse(cupcake.prices)[0]}`}</Price>
            </ProductDescription>
          </BakeryProduct>
        </ProductLink>
      ))}
      {cookieItems.map((cookie) => (
        <ProductLink
          key={cookie.itemName}
          to={`/bakery/cookies/${cookie.itemName}`}
        >
          <BakeryProduct>
            <ProductImageContainer>
              <ProductImage src={cookie.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{cookie.title}</ProductTitle>
              <Price>{`$${JSON.parse(cookie.prices)[0]}`}</Price>
            </ProductDescription>
          </BakeryProduct>
        </ProductLink>
      ))}
      {dessertItems.map((dessert) => (
        <ProductLink
          key={dessert.itemName}
          to={`/bakery/desserts/${dessert.itemName}`}
        >
          <BakeryProduct>
            <ProductImageContainer>
              <ProductImage src={dessert.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{dessert.title}</ProductTitle>
              <Price>{`$${dessert.price}`}</Price>
            </ProductDescription>
          </BakeryProduct>
        </ProductLink>
      ))}
      {treatItems.map((treat) => (
        <ProductLink
          key={treat.itemName}
          to={`/bakery/treats/${treat.itemName}`}
        >
          <BakeryProduct>
            <ProductImageContainer>
              <ProductImage src={treat.imgUrl} />
            </ProductImageContainer>
            <ProductDescription>
              <ProductTitle>{treat.title}</ProductTitle>
              <Price>{`$${JSON.parse(treat.prices)[0]}`}</Price>
            </ProductDescription>
          </BakeryProduct>
        </ProductLink>
      ))}
    </ProductsPage>
  );
};

export default BakeryProducts;
