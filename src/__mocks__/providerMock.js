import React from "react";
import store from "../redux-config/store";
import { Provider } from "react-redux";

const ProviderMock = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderMock;
