import React from "react";
import { useSelector } from "react-redux";
import NewsItem from "../../components/news-item";

const Favorites = () => {
  const { fav } = useSelector((state) => state.reducer);

  return (
    <div className="news">
      {fav.map((item) => (
        <NewsItem key={item.objectID} {...item} />
      ))}
    </div>
  );
};

export default Favorites;
