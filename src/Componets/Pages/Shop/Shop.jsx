import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mobile, tablet, desktop } from "../../../Responsive";

const ShopPage = styled.div`
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
const ShopProduct = styled.div`
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
const ShoppingProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://thegreeneroommaster.herokuapp.com/api/shop")
      .then((res) => {
        setItems(res.data);
      });
  }, []);

  return (
    <ShopPage>
      {items.map((details) => {
        return (
          <ProductLink key={details.itemName} to={`/shop/${details.itemName}`}>
            <ShopProduct>
              <ProductImageContainer>
                <ProductImage src={details.imgUrl} />
              </ProductImageContainer>
              <ProductDescription>
                <ProductTitle>{details.title}</ProductTitle>
              </ProductDescription>
            </ShopProduct>
          </ProductLink>
        );
      })}
    </ShopPage>
  );
};

export default ShoppingProducts;
