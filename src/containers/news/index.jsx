import React from "react";
import NewsItem from "../../components/news-item";
import './news.css';

const News=()=>{
    return (
        <div className="news">
           <NewsItem/>
           <NewsItem/>
           <NewsItem/>
           <NewsItem/>
        </div>
    ) 
}

export default News;