import React from 'react'
import './fav-button.css'
import '../../styles/icons.css'

const FavButton=({onClick, isFavorite})=>{
    return (
        <button onClick={onClick} className='favorite' title='add to favorite' >
            <i className={
                `favorite__icon 
                  ${isFavorite?'icon-favorite':'icon-favorite_outline'}`} aria-hidden='true' />
        </button>
    )
}

export default FavButton
