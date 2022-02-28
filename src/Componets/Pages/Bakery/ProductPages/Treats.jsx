import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { mobile, tablet } from "../../../../Responsive";
import { addItem, updateStatus } from "../../../../Features/Cart";

const ProductPage = styled.section`
  padding: 1rem;
`;

const Treat = styled.div`
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
const SelectionBox = styled.div`
  width: 50%;
  display: flex;
  color: black;
  overflow: hidden;
  background: white;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  border: 2px solid black;
  ${tablet({ width: "60%" })}

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
  font-weight: bold;
  background: white;
  width: fit-content;
  border-radius: 3px;
  padding: 0.5rem 2rem;
  letter-spacing: 0.1rem;
  border: 2px solid black;
  text-transform: uppercase;

  &:hover {
    color: white;
    cursor: pointer;
    background: black;
  }
`;
const Treats = () => {
  const dispatch = useDispatch();

  // Selectable Elements
  const [item, setItem] = useState([]);

  const [cartId, setCartId] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [assortment, setAssortment] = useState(null);

  const [disabled, setDisabled] = useState("disabled");

  // On Load
  useEffect(() => {
    let location = window.location.pathname;
    axios
      .get(`https://thegreeneroommaster.herokuapp.com/api${location}`)
      .then((res) => {
        setItem(res.data);
      });
  }, []);

  useEffect(() => {
    validateSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assortment]);

  // Update Price
  function updatePrice() {
    let price = document.getElementById("price");
    let assortmentIndex = document.getElementById("assortment").selectedIndex;
    let priceIndex = assortmentIndex - 1;
    price.innerText = `$${JSON.parse(item[0].prices)[priceIndex]}`;
    updateValues();
  }

  // Update Values
  function updateValues() {
    let assortment = document.getElementById("assortment");
    let price = document.getElementById("price").innerText;
    let priceValue = price.split("$");

    setItemName(item[0].title);
    setItemPhoto(item[0].imgUrl);
    setAssortment(assortment.value);
    setItemPrice(parseFloat(priceValue[1]));
  }

  // Create Cart Id
  function createId() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    setCartId(randomNumber);
  }

  // Validate
  function validateSelections() {
    if (assortment === null || itemPrice === null) {
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
      itemDetails: null,
      itemName: itemName,
      itemPhoto: itemPhoto,
      itemPrice: itemPrice,
      assortment: assortment,
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
          <Treat>
            <ImageContainer>
              <Image src={details.imgUrl} />
            </ImageContainer>

            <ProductDescription>
              <ProductTitle id="itemName" data-value={details.itemName}>
                {details.title}
              </ProductTitle>
              <Price id="price">${JSON.parse(details.prices)[0]}</Price>
              <Description>{details.description}</Description>
              <SelectionBox>
                <Selections id="assortment" onChange={updatePrice}>
                  <Selection selected disabled>
                    Select Quantity
                  </Selection>
                  {JSON.parse(details.quantity).map((qty) => (
                    <Selection>{qty}</Selection>
                  ))}
                </Selections>
              </SelectionBox>

              <AddToCart id={disabled} onClick={addToCart}>
                Add To Cart
              </AddToCart>
            </ProductDescription>
          </Treat>
        );
      })}
    </ProductPage>
  );
};

export default Treats;
