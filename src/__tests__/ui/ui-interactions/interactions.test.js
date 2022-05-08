import React from "react";
import Dropdown from "../../../components/dropdown";
import MainContent from "../../../containers/main-content/main-content";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ProviderMock from "../../../__mocks__/providerMock";
import  "../../../__mocks__/IntersectionObserverMock";
import MockingFetching from '../../../__mocks__/FetchMock'

describe("testing ui interactions", () => {
  test("check show/hide panel when click dropdown", async () => {
    const { container } = render(
      <ProviderMock>
        <Dropdown
          items={[
            { img: "https://imgur.com/ROc7nkS.png", value: "Angular" },
            { img: "https://imgur.com/DlYIrSe.png", value: "Reactjs" },
            { img: "https://imgur.com/15dvqzT.png", value: "Vuejs" },
          ]}
        />
      </ProviderMock>
    );

    const panel = container.getElementsByClassName(
      "dropdown__panel--isVisible"
    );
    /**panel should be hidden by default */
    expect(panel.length).toBe(0);
    /**show panel when click dropdown */
    fireEvent.click(container.getElementsByClassName("dropdown__selected")[0]);
    expect(panel[0]).toBeInTheDocument();
    /**hide panel when click dropdown */
    fireEvent.click(container.getElementsByClassName("dropdown__selected")[0]);
    expect(panel.length).toBe(0);
  });

  test("test call function when click item in panel", async () => {
    const mockedFunction = jest.fn();
    const { container, getAllByRole } = render(
      <ProviderMock>
        <Dropdown
          handleOnSelect={mockedFunction}
          items={[
            { img: "https://imgur.com/ROc7nkS.png", value: "Angular" },
            { img: "https://imgur.com/DlYIrSe.png", value: "Reactjs" },
            { img: "https://imgur.com/15dvqzT.png", value: "Vuejs" },
          ]}
        />
      </ProviderMock>
    );

    fireEvent.click(container.getElementsByClassName("dropdown__selected")[0]);
    const LastOption = getAllByRole("option");
    /** check we are seeing the options */
    expect(LastOption.length).toBeGreaterThan(0);
    /** then we click the last options then check if the function was called one time */
    fireEvent.click(LastOption[2]);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });

  test("changing panel when click buttons", async() => {
    MockingFetching(true)
    const {container, queryByRole, getAllByRole} = render(
      <ProviderMock>
        <MainContent />
      </ProviderMock>
    );

    const loader = container.getElementsByClassName("loader");
    const links = getAllByRole('link')
    /** by default check the dropdown is in the dom */
    await waitFor(() => {
      expect(loader.length).toBe(0); 
      expect(queryByRole("listbox")).toBeInTheDocument();
    });

    /** when click the tab that goes to favorite, check the dropdown is not longer in the dom */
    fireEvent.click(links[1])
    expect(queryByRole("listbox")).not.toBeInTheDocument();
    
  }); 
});
