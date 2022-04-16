import React from 'react'
import FavButton from '../fav-button'
import { useSelector, useDispatch } from 'react-redux'
import getTimeFormat from '../../utils/time-ago'
import { addFavorites, removeFromFavorite } from '../../reducer/actions'
import './news-item.css'
import '../../styles/icons.css'

const NewsItem=(item)=>{
    const dispatch = useDispatch()
    const {fav} = useSelector(state=>state.reducer)
    const isFavorite = fav.some(favItem=>favItem.objectID === item.objectID)
    const {story_title, created_at, author, story_url} = item

    const AddToFavorites = ()=>dispatch(addFavorites(item))
    const RemoveFromFavorites = ()=>dispatch(removeFromFavorite(item))

    const HandleOnClick =()=>{
        if (!isFavorite) 
            AddToFavorites()
        else 
            RemoveFromFavorites()
    }

    return (
        <div className='news-item'>
            <a href={story_url} target='blank' className='news-item__content'>
                <div className='news-item__time'>
                    <i className='news-item__icon icon-time' aria-hidden='true' />
                    <p className='news-item__time-paragraph'>
                        {getTimeFormat(created_at)} by {author}</p>
                </div>
                <p className='news-item__content-text'> {story_title} </p>
            </a>
            <FavButton isFavorite={isFavorite} onClick={HandleOnClick} />
        </div> )
}




export default NewsItem