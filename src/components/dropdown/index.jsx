import React, { useState } from "react";
import { useSelector } from "react-redux";
import toggle from "../../utils/dropdown";
import "./dropdown.css";
import "../../styles/icons.css";

/***custom dropdown following doc in https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role */
/**
 * @param  items :  list of items to render the options for the dropdown menu
 * @param  handleOnSelect : function to be injected into the item selection function
 * @returns the dropdown component
 */
const Dropdown = ({ items, handleOnSelect }) => {
  /**
   * we get the current selection saved in the local storage, by default the selection is settled as Angular
   */
  const { filter } = useSelector((state) => state.reducer);
  /**
   * state to manage the item selection
   */
  const [selection, setSelection] = useState(filter);

  /**
   * function to handle the toggle of the panel for the dropdown menu
   */
  const togglePanel = () => {
    toggle();
  };
  /**
   * function to handle the selection of each item in the dropdown
   */
  const onSelection = (event) => {
    setSelection(event.target.innerText);
    togglePanel();
    handleOnSelect(event);
  };

  return (
    <div className="dropdown" role="listbox" aria-label="Select your news">
      <div
        onClick={togglePanel}
        onKeyUp={(e) => e.code === "Enter" && togglePanel()}
        className="dropdown__selected"
        tabIndex="0"
      >
        <span className="dropdown__selected-text">{selection}</span>
        <i className="icon-arrow_down" />
      </div>
      <div className="dropdown__panel">
        {/** rendering the options for the menu */}
        {items.map((item) => (
          <div
            key={item.value}
            onClick={(event) => {
              /**here we avoid to handle the item selection when user click the same selected item */
              if (selection !== item.value) {
                onSelection(event);
              }
            }}
            onKeyUp={(e) => e.code === "Enter" && onSelectItem(e)}
            role="option"
            tabIndex="0"
            className={`dropdown__panel-item 
                             ${
                               selection === item.value &&
                               "dropdown__panel-item--selected"
                             }`}
          >
            <figure className="dropdown__panel-item__image">
              <img
                src={item.img}
                width="24"
                height="24"
                alt={`${item.value}'s icon`}
              />
            </figure>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
