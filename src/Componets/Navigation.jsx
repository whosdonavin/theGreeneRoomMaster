import { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { mobile, tablet } from "../Responsive";
import MobileNavigation from "./MobileNavigation";
import { calculateTotalItems } from "../Features/Cart";
import { useSelector, useDispatch } from "react-redux";

const Nav = styled.nav`
  color: #fff;
  display: flex;
  padding: 1.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;
const Left = styled.div`
  text-align: center;
`;
const Right = styled.div``;
const Top = styled.div`
  ${mobile({
    display: "flex",
    width: "100%",
    "align-items": "center",
    "justify-content": "space-between",
  })}
`;
const Logo = styled(NavLink)`
  color: grey;
  margin: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  ${tablet({ margin: 0 })}
  &:hover {
    color: black;
  }
`;
const NavLinks = styled.ul`
  ${mobile({ display: "none" })}
`;
const Link = styled(NavLink)`
  color: grey;
  opacity: 0.8;
  margin: 0 10px;
  transition: 0.25s;
  font-size: 0.75rem;
  text-transform: uppercase;
  &:hover {
    color: #1d1d1d;
    font-size: 0.95rem;
  }
`;
const InCart = styled.span`
  color: green;
  margin-left: 0.5rem;
`;

const MessageBar = styled.div`
  width: 100%;
  text-align: center;
  transition: all ease-in-out 1s;
  ${mobile({ width: "100%" })};
`;
const Navigation = () => {
  const shoppingCart = useSelector((state) => state.cart.value);
  const { cart, itemStatus, totalItems } = shoppingCart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotalItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <Nav>
      <Top id="top">
        <Left>
          <Logo to="/">The Greene Room</Logo>
        </Left>
        <Right>
          <NavLinks>
            <Link to="/bakery">Bakery</Link>
            <Link to="/catering">Catering</Link>
            <Link to="/classes">Cooking Classes</Link>
            <Link to="/privateEvent">Private Event</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/checkout">
              Checkout <InCart>{totalItems}</InCart>
            </Link>
          </NavLinks>
          <MobileNavigation />
        </Right>
      </Top>
      <MessageBar id="messageBar" className={itemStatus.status}>
        {itemStatus.message}
      </MessageBar>
    </Nav>
  );
};

export default Navigation;
