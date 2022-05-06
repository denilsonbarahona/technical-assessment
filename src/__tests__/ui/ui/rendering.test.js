import React from "react";
import Header from "../../../components/header";
import News from "../../../containers/news";
import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
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

describe("check rendering of elements", () => {
  test("check rendering of header", () => {
    render(<Header />);
    const header = screen.queryAllByRole("banner");
    expect(header).toHaveLength(1);
  });
});

describe("check rendering of loader and dropdown", () => {
  MockingFetching(true);
  test("check appearance and disappearance of loading", async () => {
    const { container, getByRole } = render(
      <ProviderMock>
        <News />
      </ProviderMock>
    );
    const loader = container.getElementsByClassName("loader");
    expect(loader.length).toBe(1);
    await waitFor(() => {
      expect(loader.length).toBe(0);
      expect(getByRole("listbox")).toBeInTheDocument();
    });
  });
});

describe("rendering News", () => {
  test("checking appearance of news item when fetching status 200", async () => {
    MockingFetching(true);
    const { container } = render(
      <ProviderMock>
        <News />
      </ProviderMock>
    );
    const newsItems = container.getElementsByClassName("news-item");
    await waitFor(() => {
      expect(newsItems.length).toBeGreaterThan(0);
    });
  });

  test("checking appearance of notification error when fetching fails", async () => {
    MockingFetching(false);
    const { getByRole } = render(
      <ProviderMock>
        <News />
      </ProviderMock>
    );

    await waitFor(() => {
      expect(getByRole("alert")).toBeInTheDocument();
    });
  });
});
