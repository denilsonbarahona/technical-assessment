import React from 'react'
import './fav-button.css'
import '../../styles/icons.css'

const FavButton=()=>{
    return (
        <button className='favorite' title='add to favorite' >
            <i className='favorite__icon icon-favorite_outline' aria-hidden='true' />
        </button>
    )
}

export default FavButton
