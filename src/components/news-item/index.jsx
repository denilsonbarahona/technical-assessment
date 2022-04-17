import React from "react";
import FavButton from "../fav-button";
import { useSelector, useDispatch } from "react-redux";
import getTimeFormat from "../../utils/time-ago";
import { addFavorites, removeFromFavorite } from "../../reducer/actions";
import "./news-item.css";
import "../../styles/icons.css";

/**
 * component that render the information of each news
 * @param {*} item the information of each news
 */
const NewsItem = (item) => {
  const dispatch = useDispatch();
  /**
   * getting the list of favorites news to detect if the current news is a favorite one
   */
  const { fav } = useSelector((state) => state.reducer);
  const isFavorite = fav.some((favItem) => favItem.objectID === item.objectID);
  /**
   * destructuring the useful information from the prop (item)
   */
  const { story_title, created_at, author, story_url } = item;

  /**
   * functions to handle the click event to add the item to favorites or
   * remove the item from favorites if the news is currently settled as favorite
   */
  const AddToFavorites = () => dispatch(addFavorites(item));
  const RemoveFromFavorites = () => dispatch(removeFromFavorite(item));

  const HandleOnClick = () => {
    if (!isFavorite) AddToFavorites();
    else RemoveFromFavorites();
  };

  return (
    <div className="news-item">
      <a href={story_url} target="blank" className="news-item__content">
        <div className="news-item__time">
          <i className="news-item__icon icon-time" aria-hidden="true" />
          <p className="news-item__time-paragraph">
            {getTimeFormat(created_at)} by {author}
          </p>
        </div>
        <p className="news-item__content-text"> {story_title} </p>
      </a>
      <FavButton isFavorite={isFavorite} onClick={HandleOnClick} />
    </div>
  );
};

export default NewsItem;
