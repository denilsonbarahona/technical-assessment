import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadNewPage,
  getNews,
  SaveDropDownChange,
} from "../../reducer/actions";
import NewsItem from "../../components/news-item";
import Dropdown from "../../components/dropdown";
import Loader from "../../components/loader";
import "../news.css";

const News = () => {
  const dispatch = useDispatch();
  /** getting from the store the information useful in this component */
  const { news, filter, page, maxPages, isLoading } = useSelector(
    (state) => state.reducer
  );

  /** ref object to use as interceptor observer */
  const interceptor = useRef(null);
  /** useEffect to set the intersection observer that makes the infinite ty scrolling */
  useEffect(() => {
    const observer = new IntersectionObserver(handleInterceptor);
    if (interceptor.current) {
      observer.observe(interceptor.current);
    }

    return () => {
      if (interceptor.current) observer.unobserve(interceptor.current);
    };
  });

  /**when the component is mounted we retrieve information from the API
   * with the current value in the filter object
   */
  useEffect(() => {
    dispatch(getNews(filter));
  }, [dispatch]);

  /** handle a dispatch for infinite scrolling when we intercept the intersection observer*/
  const handleInterceptor = (entries) => {
    if (entries[0].isIntersecting) {
      /**not dispatch loading of new pages when we reach the limit of pages given by the API*/
      if (maxPages >= page) dispatch(loadNewPage(filter, page));
    }
  };

  /** handle the onSelect event on the dropdown menu */
  const handleOnSelected = (event) => {
    dispatch(getNews(event.target.innerText));
    dispatch(SaveDropDownChange(event.target.innerText));
  };

  return (
    <React.Fragment>
      <Dropdown
        handleOnSelect={handleOnSelected}
        items={[
          { img: "https://imgur.com/ROc7nkS.png", value: "Angular" },
          { img: "https://imgur.com/DlYIrSe.png", value: "Reactjs" },
          { img: "https://imgur.com/15dvqzT.png", value: "Vuejs" },
        ]}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="news">
          {news.map((item) => (
            <NewsItem key={item.objectID} {...item} />
          ))}
          {news.length !== 0 && <div id="interceptor" ref={interceptor} />}
        </div>
      )}
    </React.Fragment>
  );
};

export default News;
