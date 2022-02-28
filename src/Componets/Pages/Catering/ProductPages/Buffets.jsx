import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { mobile, tablet } from "../../../../Responsive";
import { addItem, updateStatus } from "../../../../Features/Cart";

const ProductPage = styled.section`
  padding: 1rem;
`;

// Item
const BuffetItem = styled.div`
  gap: 5%;
  color: black;
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  align-items: center;
  flex-direction: row;
  ${tablet({ "flex-direction": "column" })}
`;

// Image Container
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

// Product Description
const ProductDescription = styled.div`
  gap: 1rem;
  width: 50%;
  display: flex;
  font-size: 1.25rem;
  flex-direction: column;
  justify-content: center;
  ${tablet({ width: "100%", "align-items": "center", "text-align": "center" })}
`;
const ProductTitle = styled.h1`
  font-size: 3rem;
  ${tablet({ "font-size": "2rem" })}
`;
//
const FeedQuantity = styled.form`
  display: flex;
  accent-color: black;
  ${tablet({ "flex-direction": "column" })}
`;
const Quantities = styled.div`
  ${tablet({ display: "flex" })}
`;
const Quantity = styled.span`
  margin: 0 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;
const Input = styled.input`
  &:hover {
    cursor: pointer;
  }
`;
//
const ProductPrice = styled.div`
  display: flex;
`;

const Price = styled.p`
  margin: 0 1rem;
`;
//
const Included = styled.div`
  gap: 1rem;
  display: flex;
  ${tablet({ "flex-direction": "column" })}
`;
const Includes = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;
const IncludesLabel = styled.div``;
const ChoiceOfLabel = styled.div``;
const IncludedItems = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChoiceOfItems = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled.p`
  font-size: 1rem;
`;
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
  color: black;
  width: 100%;
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

const Buffets = () => {
  const dispatch = useDispatch();

  // Selectable Elements
  const [item, setItem] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [assortment, setAssortment] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

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
  }, [itemDetails, assortment, itemPrice]);

  // Update Price
  function updatePrice() {
    let feed = document.querySelector('input[name = "Feed"]:checked').value;
    let sizes = JSON.parse(item[0].eventSizes);
    let selectedItem = sizes.indexOf(parseInt(feed));
    let price = document.getElementById("price");
    price.innerText = `$${JSON.parse(item[0].eventPrices)[selectedItem]}.00`;
    updateValues();
  }

  // Update Values
  function updateValues() {
    let feed = document.querySelector('input[name = "Feed"]:checked').value;
    let price = document.getElementById("price").innerText;
    let priceValue = price.split("$");

    setItemName(item[0].title);
    setItemPhoto(item[0].imgUrl);
    setAssortment(`Feeds: ${feed}`);
    setItemPrice(parseFloat(priceValue[1]));
  }
  // Details
  function selectChoiceOf() {
    let details = document.getElementById("details");
    setItemDetails(details.value);
  }
  // Create Cart Id
  function createId() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    setCartId(randomNumber);
  }
  // validate
  function validateSelections() {
    if (itemDetails === null || assortment === null || itemPrice === null) {
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
          <BuffetItem key={details.itemName}>
            <ImageContainer>
              <Image src={details.imgUrl} />
            </ImageContainer>
            {/*  */}
            <ProductDescription>
              <ProductTitle>{details.title}</ProductTitle>
              {/*  */}

              <FeedQuantity>
                <Label>Feed Quantity:</Label>
                <Quantities>
                  {JSON.parse(details.eventSizes).map((qty) => (
                    <Quantity key={qty} onChange={updatePrice}>
                      <Label htmlFor="FeedQuanity">{qty}</Label>
                      <Input type="radio" value={qty} name="Feed" />
                    </Quantity>
                  ))}
                </Quantities>
              </FeedQuantity>
              {/*  */}
              <ProductPrice>
                <Label>Starting At: </Label>
                <Price id="price">{`$${
                  JSON.parse(details.eventPrices)[0]
                }.00`}</Price>
              </ProductPrice>
              {/*  */}
              <Included>
                <Includes>
                  <IncludesLabel>
                    <Label>Includes:</Label>
                  </IncludesLabel>
                  <IncludedItems>
                    {JSON.parse(details.includedItems).map((includedItem) => (
                      <Item key={includedItem}>{includedItem}</Item>
                    ))}
                  </IncludedItems>
                </Includes>
                {/*  */}
                <Includes>
                  <ChoiceOfLabel>
                    <Label>Choice Of:</Label>
                  </ChoiceOfLabel>
                  <ChoiceOfItems>
                    {JSON.parse(details.choiceOfItems).map((choiceItem) => (
                      <Item key={choiceItem}>{choiceItem}</Item>
                    ))}
                  </ChoiceOfItems>
                </Includes>
              </Included>
              <SelectionBox>
                <Selections id="details" onChange={selectChoiceOf}>
                  <Selection selected disabled>
                    Select Item
                  </Selection>
                  {JSON.parse(details.choiceOfItems).map((choiceItem) => (
                    <Selection key={choiceItem}>{choiceItem}</Selection>
                  ))}
                </Selections>
              </SelectionBox>
              <AddToCart id={disabled} onClick={addToCart}>
                Add To Cart
              </AddToCart>
            </ProductDescription>
          </BuffetItem>
        );
      })}
    </ProductPage>
  );
};

export default Buffets;
