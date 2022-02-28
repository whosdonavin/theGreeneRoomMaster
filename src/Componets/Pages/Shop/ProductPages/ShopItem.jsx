import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { mobile, tablet } from "../../../../Responsive";
import { addItem, updateStatus } from "../../../../Features/Cart";

const ProductPage = styled.section`
  padding: 1rem;
`;
const Cake = styled.div`
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
const Label = styled.label`
  font-weight: bold;
`;
const ProductPrice = styled.div`
  display: flex;
`;
const Price = styled.p`
  margin: 0 1rem;
`;
const Description = styled.p``;
const SelectionBox = styled.div`
  width: 50%;
  color: black;
  display: flex;
  background: white;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  border: 2px solid black;
  ${tablet({ width: "60%" })}
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const Selections = styled.select`
  width: 100%;
  color: black;
  border: none;
  background: none;
  -webkit-appearance: none;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const Selection = styled.option``;
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
const Deposit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let location = window.location.pathname;
    axios
      .get(`https://thegreeneroommaster.herokuapp.com/api${location}`)
      .then((res) => {
        setItem(res.data);
      });
  }, []);

  // Selectable Elements
  const [item, setItem] = useState([]);
  const [cartId, setCartId] = useState("");
  const [itemName, setItemName] = useState(null);
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  const [disabled, setDisabled] = useState("disabled");

  useEffect(() => {
    validateSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPrice]);

  // Update Value
  function updateValues() {
    let price = document.getElementById("price").innerText;
    let priceValue = price.split("$");

    setItemName(item[0].title);
    setItemPhoto(item[0].imgUrl);
    setItemPrice(parseFloat(priceValue[1]));
  }
  // Update Price
  function updatePrice() {
    let price = document.getElementById("price");
    let assortmentIndex = document.getElementById("assortment").selectedIndex;
    let priceIndex = assortmentIndex - 1;
    price.innerText = `$${JSON.parse(item[0].prices)[priceIndex]}.00`;
    updateValues();
  }
  // Create Cart Id
  function createId() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    setCartId(randomNumber);
  }
  // Validate
  function validateSelections() {
    if (itemPrice === null) {
      return;
    } else {
      createId();
      setDisabled("enabled");
    }
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
  }
  return (
    <ProductPage>
      {item.map((details) => {
        return (
          <Cake key={details.itemName}>
            <ImageContainer>
              <Image src={details.imgUrl} />
            </ImageContainer>
            <ProductDescription>
              <ProductTitle id="itemName" data-value={details.itemName}>
                {details.title}
              </ProductTitle>
              <ProductPrice>
                <Label>Starting At:</Label>
                <Price id="price">{`$${
                  JSON.parse(details.prices)[0]
                }.00`}</Price>
              </ProductPrice>
              <Description>{details.description}</Description>

              <SelectionBox>
                <Selections id="assortment" onChange={updatePrice}>
                  <Selection selected disabled>
                    Select Amount
                  </Selection>
                  {JSON.parse(details.prices).map((size) => (
                    <Selection key={size}>{`$ ${size}.00`}</Selection>
                  ))}
                </Selections>
              </SelectionBox>

              <AddToCart id={disabled} onClick={addToCart}>
                Add To Cart
              </AddToCart>
            </ProductDescription>
          </Cake>
        );
      })}
    </ProductPage>
  );
};

export default Deposit;
