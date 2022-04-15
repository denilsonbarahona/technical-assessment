import React from 'react'
import FavButton from '../fav-button'
import './news-item.css'
import '../../styles/icons.css'

const NewsItem=()=>{
    return (
        <div className='news-item'>
            <div className='news-item__content'>
                <div className='news-item__time'>
                    <i className='news-item__icon icon-time' aria-hidden='true' />
                    <p className='news-item__time-paragraph'>3 hours ago by author</p>
                </div>
                <p className='news-item__content-text'> Yes, React is taking over front-end development. The question is why. </p>
            </div>
            <FavButton/>
        </div> )
}

export default NewsItem