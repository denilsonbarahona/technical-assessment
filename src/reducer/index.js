import {
  SET_NEWS,
  LOADING,
  APPEND_PAGE,
  ADD_TO_FAVORITES,
  CHANGE_DROPDOWN,
} from "./actions";
import { getLocalStorage } from "../utils/localStorage";

const fav = JSON.parse(getLocalStorage("fav")) ?? [];
const filter = getLocalStorage("dropdown") ?? "Angular";

const initialState = {
  news: [],
  fav: [...fav],
  filter: filter,
  isLoading: false,
  page: 0,
  maxPages: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload.data,
        filter: action.payload.filter,
        maxPages: action.payload.nbPages,
      };
    case APPEND_PAGE:
      return {
        ...state,
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
