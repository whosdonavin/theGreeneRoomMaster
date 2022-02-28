import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./Features/Cart";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
