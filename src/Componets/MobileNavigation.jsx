import styled from "styled-components";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { calculateTotalItems } from "../Features/Cart";
import { useSelector, useDispatch } from "react-redux";

const Navigation = styled.nav`
  width: 100%;
  height: 100%;
`;
const MobileIcon = styled(FaBars)`
  ${mobile({ display: "flex" })}
  color: black;
  display: none;
  font-size: 2rem;
`;
const Close = styled(FaTimes)`
  ${mobile({ display: "flex" })}
  color: black;
  display: none;
  font-size: 2rem;
`;
const Menu = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  position: fixed;
  background: white;
  flex-direction: column;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  padding: 1.75rem;
  justify-content: flex-end;
`;
const Bottom = styled.div`
  gap: 1rem;
  width: 80%;
  height: 75%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const MenuItem = styled(Link)`
  color: grey;
  font-size: 1.5rem;
  &:hover {
    color: #1d1d1d;
  }
`;
const InCart = styled.span`
  color: green;
  margin-left: 0.5rem;
`;
const MobileNavigation = () => {
  const shoppingCart = useSelector((state) => state.cart.value);
  const { cart, totalItems } = shoppingCart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotalItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const [menuStatus, setMenuStatus] = useState("hide");
  function openMenu() {
    setMenuStatus("show");
  }
  function closeMenu() {
    setMenuStatus("hide");
  }
  return (
    <>
      <Navigation className={menuStatus}>
        <Menu>
          <Top>
            <Close onClick={closeMenu} />
          </Top>
          <Bottom>
            <MenuItem to="/" onClick={closeMenu}>
              Home
            </MenuItem>
            <MenuItem to="/shop" onClick={closeMenu}>
              Shop
            </MenuItem>
            <MenuItem to="/bakery" onClick={closeMenu}>
              Bakery
            </MenuItem>
            <MenuItem to="/catering" onClick={closeMenu}>
              Catering
            </MenuItem>
            <MenuItem to="/classes" onClick={closeMenu}>
              Classes
            </MenuItem>
            <MenuItem to="/privateEvent" onClick={closeMenu}>
              Private Event
            </MenuItem>
            <MenuItem to="/contact" onClick={closeMenu}>
              Contact
            </MenuItem>
            <MenuItem to="/checkout" onClick={closeMenu}>
              Checkout
              <InCart>{totalItems}</InCart>
            </MenuItem>
          </Bottom>
        </Menu>
      </Navigation>
      <MobileIcon onClick={openMenu} />
    </>
  );
};

export default MobileNavigation;
