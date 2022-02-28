import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { mobile, tablet } from "../../../../Responsive";
import { addItem, updateStatus } from "../../../../Features/Cart";

const ProductPage = styled.section`
  padding: 1rem;
`;
const Platter = styled.div`
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
  ${mobile({ "font-size": "2rem" })}
`;
const FeedQuantity = styled.form`
  display: flex;
  accent-color: black;
  ${mobile({ "flex-direction": "column" })}
`;
const Quantities = styled.div`
  ${mobile({ display: "flex" })}
`;
const Quantity = styled.span`
  margin: 0 1rem;
`;
const Label = styled.label`
  font-weight: bold;
`;
const ItemName = styled.label`
  font-size: 1rem;
`;
const Input = styled.input``;
const ProductVariations = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
`;
const ProductPrice = styled.div`
  display: flex;
`;

const Price = styled.p`
  margin: 0 1rem;
`;
const VariationsLabel = styled.div``;
const VariationItems = styled.form`
  gap: 1rem;
  width: 60%;
  display: grid;
  accent-color: black;
  grid-template-columns: repeat(2, 1fr);
  ${tablet({ width: "100%" })}
`;
const Variation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Item = styled.input`
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
  width: fit-content;
  border-radius: 3px;
  background: white;
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
const CustomPlatters = () => {
  const dispatch = useDispatch();

  // Selectable Elements
  const [item, setItem] = useState([]);

  const [cartId, setCartId] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemPhoto, setItemPhoto] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [assortment, setAssortment] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const [choiceOf, setChoiceOf] = useState(null);
  const [variationTotal, setVariationTotal] = useState(0);
  const [variationItems, setVariationItems] = useState([]);

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
    getTotalVariations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variationItems]);
  useEffect(() => {
    validateSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assortment, choiceOf, variationTotal]);

  // Update Price
  function updatePrice() {
    let feed = document.querySelector('input[name = "Feed"]:checked').value;
    let sizes = JSON.parse(item[0].eventSizes);
    let selectedItem = sizes.indexOf(parseInt(feed));
    let price = document.getElementById("price");
    price.innerText = `$${JSON.parse(item[0].eventPrices)[selectedItem]}`;
    let priceValue = price.innerText.split("$");

    setItemName(item[0].title);
    setItemPhoto(item[0].imgUrl);
    setAssortment(`Feeds: ${feed}`);
    setItemPrice(parseFloat(priceValue[1]));
  }

  // Set Choice Of
  function selectChoiceOf() {
    let choiceOf = document.getElementById("choiceOf");
    setChoiceOf(choiceOf.value);
  }

  // Set Variation Items
  function handleCheck(e) {
    let item = e.target;
    let itemName = e.target.name;

    if (item.checked === true) {
      setVariationItems((variationItems) => [...variationItems, itemName]);
    } else {
      let selectedVariations = Array.from(variationItems);
      let index = selectedVariations.indexOf(itemName);
      selectedVariations.splice(index, 1);
      setVariationItems(selectedVariations);
    }
  }

  // Set Variation Total
  function getTotalVariations() {
    setVariationTotal(variationItems.length);
  }

  // Create Cart Id
  function createId() {
    let randomNumber = Math.floor(Math.random() * 1000000);
    setCartId(randomNumber);
  }

  // Merge Choice Of & Variation Items
  function mergeDetails() {
    setItemDetails(`${choiceOf}, ${variationItems.toString()}`);
  }

  // Validation
  function validateSelections() {
    if (variationTotal < 2 || assortment === null || choiceOf === null) {
      return;
    } else {
      createId();
      mergeDetails();
      setDisabled("enabled");
    }
  }

  // Run onclick
  function addToCart() {
    let cartItem = {
      qty: 1,
      cartId: cartId,
      itemName: itemName,
      itemPhoto: itemPhoto,
      itemPrice: itemPrice,
      assortment: assortment,
      itemDetails: itemDetails,
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
          <Platter key={details.itemName}>
            <ImageContainer>
              <Image src={details.imgUrl} />
            </ImageContainer>

            <ProductDescription>
              <ProductTitle>{details.title}</ProductTitle>

              <FeedQuantity>
                <Label>Feed Quantity: </Label>
                <Quantities>
                  {JSON.parse(details.eventSizes).map((qty) => (
                    <Quantity key={qty} onChange={updatePrice}>
                      <Label htmlFor="FeedQuanity">{qty}</Label>
                      <Input type="radio" value={qty} name="Feed" />
                    </Quantity>
                  ))}
                </Quantities>
              </FeedQuantity>

              <ProductPrice>
                <Label>Starting At: </Label>
                <Price id="price">{`$${
                  JSON.parse(details.eventPrices)[0]
                }`}</Price>
              </ProductPrice>

              <ProductVariations>
                <VariationsLabel>
                  <Label>Select From: </Label>
                </VariationsLabel>
                <VariationItems id="form" onChange={handleCheck}>
                  {JSON.parse(details.variationItems).map((variation) => (
                    <Variation key={variation}>
                      <ItemName htmFor={variation}>{variation}</ItemName>
                      <Item
                        type="checkbox"
                        value={variation}
                        name={variation}
                      />
                    </Variation>
                  ))}
                </VariationItems>
              </ProductVariations>

              <SelectionBox>
                <Selections id="choiceOf" onChange={selectChoiceOf}>
                  <Selection selected disabled>
                    Select Sauce
                  </Selection>
                  {JSON.parse(details.choiceOfItems).map((choice) => (
                    <Selection key={choice}>{choice}</Selection>
                  ))}
                </Selections>
              </SelectionBox>
              <AddToCart id={disabled} onClick={addToCart}>
                Add To Cart
              </AddToCart>
            </ProductDescription>
          </Platter>
        );
      })}
    </ProductPage>
  );
};

export default CustomPlatters;
