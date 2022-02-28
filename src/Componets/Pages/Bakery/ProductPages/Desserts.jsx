import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { mobile, tablet } from "../../../../Responsive";
import { addItem, updateStatus } from "../../../../Features/Cart";

const ProductPage = styled.section`
  padding: 1rem;
`;

const Dessert = styled.div`
  gap: 5%;
  color: black;
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  align-items: center;
  flex-direction: row;
  ${tablet({ "flex-direction": "column" })}
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
  width: 50%;
  gap: 1.5rem;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  justify-content: center;
  ${tablet({ width: "100%", "align-items": "center", "text-align": "center" })}
`;
const ProductTitle = styled.h1`
  font-size: 3rem;
  ${mobile({ "font-size": "2rem" })}
`;

const Description = styled.p``;

const Price = styled.p``;

const AddToCart = styled.button`
  color: black;
  font-size: 1rem;
  background: white;
  font-weight: bold;
  width: fit-content;
  border-radius: 3px;
  padding: 0.5rem 2rem;
  letter-spacing: 0.1rem;
  border: 2px solid black;
  text-transform: uppercase;
  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;
const Desserts = () => {
  const dispatch = useDispatch();

  // Selectable Elements
  const [item, setItem] = useState([]);

  const [cartId, setCartId] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  const [disabled, setDisabled] = useState("enabled");
  // On Load
  useEffect(() => {
    let location = window.location.pathname;
    axios
      .get(`https://thegreeneroommaster.herokuapp.com/api${location}`)
      .then((res) => {
        setItem(res.data);
        setItemName(res.data[0].title);
        setItemPhoto(res.data[0].imgUrl);
        setItemPrice(parseFloat(res.data[0].price));
        createId();
      });
  }, []);

  // Create Cart Id
  function createId() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    setCartId(randomNumber);
  }

  // Run onclick
  function addToCart() {
    let cartItem = {
      qty: 1,
      cartId: cartId,
      assortment: null,
      itemDetails: null,
      itemName: itemName,
      itemPhoto: itemPhoto,
      itemPrice: itemPrice,
    };

    dispatch(updateStatus({ status: "success", message: "Item Added" }));
    dispatch(addItem(cartItem));
    setDisabled("disabled");
    setTimeout(() => {
      dispatch(updateStatus({ status: "", message: "" }));
    }, 2500);
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }
  return (
    <ProductPage>
      {item.map((details) => {
        return (
          <Dessert>
            <ImageContainer>
              <Image src={details.imgUrl} />
            </ImageContainer>

            <ProductDescription>
              <ProductTitle>{details.title}</ProductTitle>
              <Price>{`$${details.price}`}</Price>
              <Description>{details.description}</Description>
              <AddToCart id={disabled} onClick={addToCart}>
                Add To Cart
              </AddToCart>
            </ProductDescription>
          </Dessert>
        );
      })}
    </ProductPage>
  );
};

export default Desserts;
