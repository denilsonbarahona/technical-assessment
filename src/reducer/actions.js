import searchNews from "../api/search";
import { saveLocalStorage } from "../utils/localStorage";

/**
 * actions types
 */
export const SET_NEWS = "SET NEWS";
export const LOADING = "IS LOADING";
export const APPEND_PAGE = "APPEND PAGE";
export const ADD_TO_FAVORITES = "ADD TO FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE FROM FAVORITES";
export const CHANGE_DROPDOWN = "CHANGE DROPDOWN";

/**
 * actions
 */
export const setNews = (payload) => ({
  type: SET_NEWS,
  payload,
});

export const appendNewPage = (payload) => ({
  type: APPEND_PAGE,
  payload,
});

export const loading = (_) => ({
  type: LOADING,
});

export const setFavorites = (payload) => ({
  type: ADD_TO_FAVORITES,
  payload,
});

export const changeDropDown = (payload) => ({
  type: CHANGE_DROPDOWN,
  payload,
});

/**
 * thunk middleware to save in the local storage the option selected in the dropdown
 * @param {*} item: option selected
 */
export const SaveDropDownChange = (item) => (dispatch) => {
  saveLocalStorage("dropdown", item);
  dispatch(changeDropDown(item));
};

/**
 * thunk middleware to remove from the favorites the news selected
 * @param {*} item : news selected to remove from favorite
 */
export const removeFromFavorite = (item) => async (dispatch, getState) => {
  /** current favorite list */
  const { fav } = getState().reducer;
  /** getting the index in fav of the item we want to remove */
  const itemIndex = fav.findIndex((row) => row.objectID === item.objectID);
  fav.splice(itemIndex, 1);
  /** save in the local storage the new favorite list */
  saveLocalStorage("fav", JSON.stringify(fav));
  dispatch(setFavorites(fav));
};

/**
 * thunk middleware to add to the favorite list
 * @param {*} item: news to add to the favorite list
 */
export const addFavorites = (item) => async (dispatch, getState) => {
  /** getting the current favorite list to push the new selected item */
  const { fav } = getState().reducer;
  fav.push(item);
  /**save in the local storage the new favorite list */
  saveLocalStorage("fav", JSON.stringify(fav));
  dispatch(setFavorites(fav));
};

/**
 * thunk middleware to get news from the API
 * @param {*} filter: keyword with which we'll fetch data from the API;
 */
export const getNews = (filter) => async (dispatch, getState) => {
  /** showing the loading */
  dispatch(loading());
  /** getting the current page we will fetch */
  const { page } = getState().reducer;
  /** getting the data and the number of pages of the response */
  const { data, nbPages } = await searchNews(filter, page);
  /** save the current data in the store */
  dispatch(setNews({ data, filter, nbPages }));
  dispatch(loading());
};

/**
 * thunk middleware to get a new page from the API
 * @param {*} filter: keyword with which we'll fetch data from the API;
 * @param {*} page: current page.
 */
export const loadNewPage = (filter, page) => async (dispatch) => {
  const { data } = await searchNews(filter, ++page);
  dispatch(appendNewPage({ data, page }));
};
