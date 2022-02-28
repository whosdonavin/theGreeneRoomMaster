import "./Layout.css";
import { addItem } from "./Features/Cart";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Elements
import Navigation from "./Componets/Navigation";
import Footer from "./Componets/Footer";

//Pages
import Home from "./Componets/Pages/Home";
import Bakery from "./Componets/Pages/Bakery/Bakery";
import Catering from "./Componets/Pages/Catering/Catering";
import Classes from "./Componets/Pages/Classes";
import PrivateEvent from "./Componets/Pages/PrivateEvent";
import Shop from "./Componets/Pages/Shop/Shop";
import Contact from "./Componets/Pages/Contact";
import Checkout from "./Componets/Pages/Checkout";
import NotFound from "./Componets/Pages/NotFound";

// Product Pages
// Bakery
import Cakes from "./Componets/Pages/Bakery/ProductPages/Cakes";
import Cupcakes from "./Componets/Pages/Bakery/ProductPages/Cupcakes";
import Cookies from "./Componets/Pages/Bakery/ProductPages/Cookies";
import Desserts from "./Componets/Pages/Bakery/ProductPages/Desserts";
import Treats from "./Componets/Pages/Bakery/ProductPages/Treats";
// Catering
import Buffets from "./Componets/Pages/Catering/ProductPages/Buffets";
import CustomBuffets from "./Componets/Pages/Catering/ProductPages/CustomBuffets";
import CustomPlatters from "./Componets/Pages/Catering/ProductPages/CustomPlatters";
import Platters from "./Componets/Pages/Catering/ProductPages/Platters";
import Sandwiches from "./Componets/Pages/Catering/ProductPages/Sandwiches";
// Shopping
import ShopItem from "./Componets/Pages/Shop/ProductPages/ShopItem";
import { useEffect } from "react";

// Entire Layout
function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    let sessionCart = JSON.parse(sessionStorage.getItem("cart"));
    if (!sessionCart) {
      return;
    } else {
      sessionCart.forEach((item) => {
        dispatch(addItem(item));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/bakery" element={<Bakery />}></Route>
        <Route path="/bakery/cakes/:id" element={<Cakes />}></Route>
        <Route path="/bakery/cupcakes/:id" element={<Cupcakes />}></Route>
        <Route path="/bakery/cookies/:id" element={<Cookies />}></Route>
        <Route path="/bakery/desserts/:id" element={<Desserts />}></Route>
        <Route path="/bakery/treats/:id" element={<Treats />}></Route>
        <Route path="/classes" element={<Classes />}></Route>
        <Route path="/catering" element={<Catering />}></Route>
        <Route path="/catering/buffets/:id" element={<Buffets />}></Route>
        <Route
          path="/catering/customBuffets/:id"
          element={<CustomBuffets />}
        ></Route>
        <Route
          path="/catering/customPlatters/:id"
          element={<CustomPlatters />}
        ></Route>
        <Route path="/catering/platters/:id" element={<Platters />}></Route>{" "}
        <Route path="/catering/sandwiches/:id" element={<Sandwiches />}></Route>
        <Route path="/privateEvent" element={<PrivateEvent />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/shop/:id" element={<ShopItem />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
export default Layout;
