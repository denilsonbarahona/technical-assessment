import React, { useState } from "react";
import Main from "../../layouts/main";
import Tabs from "../../components/tabs";
import AppRoutes from "../../routes/routes";
import { Link } from "react-router-dom";

const MainContent = () => {
  const [state, setState] = useState("All");
  /** handle the click on a tab */
  const handleTabClick = (event) => {
    setState(event.target.innerText);
  };

  return (
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
  );
};

export default MainContent;
