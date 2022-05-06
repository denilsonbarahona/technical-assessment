import {
  SET_NEWS,
  LOADING,
  APPEND_PAGE,
  ADD_TO_FAVORITES,
  CHANGE_DROPDOWN,
  SHOW_ERROR,
} from "./actions";
import { getLocalStorage } from "../utils/localStorage";

/** favorite list saved in the local storage */
const fav = JSON.parse(getLocalStorage("fav")) ?? [];
/** filter key word saved in the local storage */
const filter = getLocalStorage("dropdown") ?? "Angular";

const initialState = {
  news: [],
  fav: [...fav],
  filter: filter,
  isLoading: false,
  showError: false,
  error: "",
  page: 0,
  maxPages: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        showError: false,
        news: action.payload.data,
        filter: action.payload.filter,
        maxPages: action.payload.nbPages,
      };
    case SHOW_ERROR:
      return {
        ...state,
        showError: true,
        error: action.payload,
      };
    case APPEND_PAGE:
      return {
        ...state,
        showError: false,
        news: [...state.news, ...action.payload.data],
        page: action.payload.page,
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        fav: [...action.payload],
      };
    case CHANGE_DROPDOWN:
      return {
        ...state,
        filter: action.payload,
      };
    case LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

export default reducer;
