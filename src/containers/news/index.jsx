import React , {useEffect, useRef} from "react";
import { loadNewPage } from "../../reducer/actions";
import {useSelector, useDispatch} from 'react-redux'
import NewsItem from "../../components/news-item";
import '../news.css';

const News=()=>{
    const dispatch = useDispatch()
    const {news, filter, page, maxPages} = useSelector(state=>state.reducer)
    const interceptor = useRef(null)

    useEffect(()=>{ 
      const observer = new IntersectionObserver(handleInterceptor)
      if(interceptor.current) {
          observer.observe(interceptor.current)
      }
      return ()=>{
          if(interceptor.current)
              observer.unobserve(interceptor.current)
      }
    })

    const handleInterceptor=(entries)=>{
        if(entries[0].isIntersecting) {
            if(maxPages>=page)
               dispatch(loadNewPage(filter, page))
        }
    }


    return (
        <div className="news">
            {news.map(item=>(
               <NewsItem 
                    key={item.objectID} 
                    {...item} />
             ))}
            {news.length !==0 && <div id="interceptor" ref={interceptor} />}
        </div>
    ) 
}

export default News;