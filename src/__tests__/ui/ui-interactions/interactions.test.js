import React from "react";
import Dropdown from "../../../components/dropdown";
import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import ProviderMock from "../../../__mocks__/providerMock";
import MockResponse from "../../../__mocks__/fetchResponseMock";

function MockingFetching(status) {
  const mockEntries = [{ isIntersecting: false }];
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status,
      json: () => Promise.resolve(MockResponse),
    })
  );
  jest.spyOn(document, "querySelector").mockReturnValueOnce(mockEntries);
}

describe("testing ui interactions", () => {
  test("check rendering panel when click dropdown", async () => {
    MockingFetching(true);
    const mockedFunction = jest.fn()
    const { getByRole, container } = render(
      <ProviderMock>
        <Dropdown
          handleOnSelect={() => mockedFunction}
          items={[
            { img: "https://imgur.com/ROc7nkS.png", value: "Angular" },
            { img: "https://imgur.com/DlYIrSe.png", value: "Reactjs" },
            { img: "https://imgur.com/15dvqzT.png", value: "Vuejs" },
          ]}
        />
      </ProviderMock>
    );

    fireEvent.click(container.getElementsByClassName('dropdown__selected')[0])
    expect(mockedFunction).toHaveBeenCalled()
  });
});
