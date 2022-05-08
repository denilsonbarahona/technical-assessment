import React from "react";
import Header from "./components/header";
import MainContent from "./containers/main-content/main-content";
import "./styles/global.css";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <MainContent />
    </React.Fragment>
  );
};

export default App;
