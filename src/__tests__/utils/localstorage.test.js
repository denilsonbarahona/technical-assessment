describe("testing local storage functionality", () => {
  test("test setItem", () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    window.localStorage.setItem("key", "value");
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  test("test getItem", () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
    Object.setPrototypeOf(window.localStorage.getItem, jest.fn());
    window.localStorage.getItem("key");
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
});
