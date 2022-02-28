import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateStatus,
  calculateSubtotal,
  calculateTotalItems,
} from "../../Features/Cart";
import { mobile } from "../../Responsive";

const CheckoutPage = styled.section`
  padding: 1rem;
`;
const CheckoutContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;
const Heading = styled.h1`
  font-size: 2rem;
  text-align: center;
  padding-bottom: 2rem;
  text-transform: uppercase;
`;
const CheckoutSummary = styled.div``;

const Text = styled.p``;

const CheckoutItems = styled.div``;
// Header
const ItemsHeader = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid black;
`;
const ItemHeader = styled.div`
  width: 60%;
`;
const QuantityHeader = styled.div`
  width: 20%;
`;
const PriceHeader = styled.div`
  width: 20%;
  text-align: right;
`;
// Items
const Items = styled.div`
  gap: 1rem;
`;
const Item = styled.div`
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid black;
`;
const Top = styled.div``;
const Bottom = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Remove = styled.button`
  color: red;
  background: none;
  border: none;
  margin: 0.5rem 0;
  &:hover {
    cursor: pointer;
  }
`;
const DescriptionDetails = styled.div`
  width: 60%;
  display: flex;
  gap: 1rem;
  text-overflow: ellipsis;
`;
const ImgContainer = styled.div`
  width: 25%;
  ${mobile({ display: "none" })}
`;
const ItemImg = styled.img`
  height: 100%;
  width: 100%;
`;
const ItemDescription = styled.div``;
const ItemName = styled.p``;
const ItemDetails = styled.p``;
const Assortment = styled.p``;
const QtyDetails = styled.div`
  width: 20%;
  display: flex;
`;
const ItemQty = styled.input`
  text-align: center;
  width: 2rem;
  height: 2rem;
  border: none;
  pointer-events: none;
`;
const PriceDetails = styled.div`
  width: 20%;
  text-align: right;
`;
const ItemPrice = styled.p``;
// Subtotal
const Subtotal = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SubPrice = styled.p`
  margin-left: 0.5rem;
`;
const CheckoutBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
const Btn = styled.button`
  color: black;
  width: fit-content;
  font-size: 1rem;
  border-radius: 3px;
  padding: 0.5rem 2rem;
  border: 1px solid black;
  letter-spacing: 0.1rem;
  background: white;
  text-transform: uppercase;
  ${mobile({ width: "100%" })}

  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;

const Checkout = () => {
  const shoppingCart = useSelector((state) => state.cart.value);
  const { cart, subtotal } = shoppingCart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateSubtotal());
    dispatch(calculateTotalItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  // Remove Item From Cart
  function deleteItem(e) {
    const top = document.getElementById("top");
    let itemId = parseInt(e.target.parentElement.parentElement.id);
    let index = 0;

    cart.forEach((item) => {
      if (item.cartId !== itemId) {
        ++index;
      } else {
        dispatch(updateStatus({ status: "error", message: "Item Removed" }));
        dispatch(removeItem(index));
        setTimeout(() => {
          dispatch(updateStatus({ status: "", message: "" }));
        }, 2500);
      }
    });

    top.scrollIntoView();
  }
  function checkoutItems() {
    const top = document.getElementById("top");
    top.scrollIntoView();
    dispatch(
      updateStatus({
        status: "error",
        message: "Checkout Disabled In Test Mode",
      })
    );
    setTimeout(() => {
      dispatch(updateStatus({ status: "", message: "" }));
    }, 2500);
  }
  return (
    <CheckoutPage>
      <CheckoutContainer>
        <Heading>Shopping Cart</Heading>
        <CheckoutSummary>
          <CheckoutItems>
            <ItemsHeader>
              <ItemHeader>
                <Text>Item(s)</Text>
              </ItemHeader>
              <QuantityHeader>
                <Text>Quantity</Text>
              </QuantityHeader>
              <PriceHeader>
                <Text>Price</Text>
              </PriceHeader>
            </ItemsHeader>

            <Items>
              {cart.map((item) => (
                <Item key={item.cartId} id={item.cartId}>
                  <Top>
                    <Remove onClick={deleteItem}>Delete</Remove>
                  </Top>

                  <Bottom>
                    <DescriptionDetails>
                      <ImgContainer>
                        <ItemImg src={item.itemPhoto} />
                      </ImgContainer>
                      <ItemDescription>
                        <ItemName>{item.itemName}</ItemName>
                        <ItemDetails>{item.itemDetails}</ItemDetails>
                        <Assortment>{item.assortment}</Assortment>
                      </ItemDescription>
                    </DescriptionDetails>
                    <QtyDetails>
                      <ItemQty readOnly value={item.qty} />
                    </QtyDetails>
                    <PriceDetails>
                      <ItemPrice>{item.itemPrice.toFixed(2)}</ItemPrice>
                    </PriceDetails>
                  </Bottom>
                </Item>
              ))}
            </Items>

            <Subtotal>
              <Text>Subtotal</Text>
              <SubPrice>{subtotal}</SubPrice>
            </Subtotal>
            <CheckoutBtn>
              <Btn onClick={checkoutItems}>Checkout</Btn>
            </CheckoutBtn>
          </CheckoutItems>
        </CheckoutSummary>
      </CheckoutContainer>
    </CheckoutPage>
  );
};

export default Checkout;
