import searchNews from "../api/search";
import { saveLocalStorage } from "../utils/localStorage";

export const SET_NEWS = "SET NEWS";
export const LOADING = "IS LOADING";
export const APPEND_PAGE = "APPEND PAGE";
export const ADD_TO_FAVORITES = "ADD TO FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE FROM FAVORITES"
export const CHANGE_DROPDOWN = "CHANGE DROPDOWN"

export const setNews = (payload) => ({
  type: SET_NEWS,
  payload,
});

export const appendNewPage = (payload) => ({
  type: APPEND_PAGE,
  payload,
});

export const loading =_=> ({
  type: LOADING,
});

export const setFavorites = (payload) => ({
  type: ADD_TO_FAVORITES,
  payload,
});

export const changeDropDown = (payload) =>({
  type: CHANGE_DROPDOWN,
  payload
})


export const SaveDropDownChange = (item) => (dispatch) =>{
  saveLocalStorage('dropdown', item)
  dispatch(changeDropDown(item))
}

export const removeFromFavorite = (item) => async (dispatch, getState) => {
   const {fav} = getState().reducer
   const itemIndex = fav.findIndex(row=>row.objectID === item.objectID)
   fav.splice(itemIndex, 1)
   saveLocalStorage('fav', JSON.stringify(fav))
   dispatch(setFavorites(fav))
} 

export const addFavorites = (item) => async (dispatch, getState) => {
  const {fav} = getState().reducer
  fav.push(item)
  saveLocalStorage('fav', JSON.stringify(fav))
  dispatch(setFavorites(fav));
};

export const getNews = (filter) => async (dispatch, getState) => {
  dispatch(loading())
  const { page } = getState().reducer;
  const { data, nbPages } = await searchNews(filter, page);
  dispatch(setNews({ data, filter, nbPages }));
  dispatch(loading())
};

export const loadNewPage = (filter, page) => async (dispatch) => {
  const { data } = await searchNews(filter, ++page);
  dispatch(appendNewPage({ data, page }));
};