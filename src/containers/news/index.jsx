import React , {useEffect, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { loadNewPage, getNews, SaveDropDownChange } from "../../reducer/actions";
import NewsItem from "../../components/news-item";
import Dropdown from "../../components/dropdown"; 
import Loader from "../../components/loader";
import '../news.css';

const News=()=>{
    const dispatch = useDispatch()
    const {news, filter, page, maxPages, isLoading, isPaging} = useSelector(state=>state.reducer)
    const interceptor = useRef(null)

    /** useEffect for handle the intersection observer that makes the infinity scrolling */
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

    /**when the component is mounted retrieve information from the API 
     * with ANGULAR as default when the localstorage is empty
     */
    useEffect(()=>{
        dispatch(getNews(filter))
    },[dispatch])

    /** handle dispatch for infinity scrolling */
    const handleInterceptor=(entries)=>{
        if(entries[0].isIntersecting) {
            /** not dispatch loading of new pages when we reach the limit of page of the search*/
            if(maxPages>=page)
               dispatch(loadNewPage(filter, page))
        }
    }

    /** handle the onSelect event on the dropdown menu */
    const handleOnSelected = (event)=>{
      dispatch(getNews(event.target.innerText))
      dispatch(SaveDropDownChange(event.target.innerText))
    }


    return (
        <React.Fragment>
            <Dropdown 
                handleOnSelect={handleOnSelected}
                items={[ 
                    {img:'https://imgur.com/ROc7nkS.png', value: 'Angular'},
                    {img:'https://imgur.com/DlYIrSe.png', value: 'React'},
                    {img:'https://imgur.com/15dvqzT.png', value: 'Vue'},
            ]} />
            { isLoading &&   <Loader />}
            { !isLoading &&
                <div className="news">
                    {news.map(item=>(
                        <NewsItem 
                                key={item.objectID} 
                                {...item} />
                    ))}
                    {news.length !==0 && <div id="interceptor" ref={interceptor} />}
                </div>
            }
            { isPaging && <Loader /> } 
        </React.Fragment>
    ) 
}

export default News;