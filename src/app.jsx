import React, { useState } from "react";
import Header from "./components/header";
import Main from "./layouts/main";
import Tabs from "./components/tabs";
import { Link } from "react-router-dom";
import AppRoutes from "./routes/routes";
import "./styles/global.css";

const App = () => {
  const [state, setState] = useState("All");
  const handleTabClick = (event) => {
    setState(event.target.innerText);
  };

  return (
    <React.Fragment>
      <Header />
      <Main>
        <AppRoutes>
          <Tabs>
            <Link
              className={`tabs__item ${
                state === "All" && "tabs__item--isSelected"
              }`}
              onClick={handleTabClick}
              to="/"
              title="click to render all news"
            >
              All
            </Link>
            <Link
              className={`tabs__item ${
                state === "My Faves" && "tabs__item--isSelected"
              }`}
              onClick={handleTabClick}
              to="/fav"
              title="click to render my favorites news"
            >
              My Faves
            </Link>
          </Tabs>
        </AppRoutes>
      </Main>
    </React.Fragment>
  );
};

export default App;
