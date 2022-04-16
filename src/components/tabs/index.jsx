import React from 'react'
import './tabs.css'

const Tabs=()=>{
    return(
        <div className='tabs'>
            <button className='tabs__item tabs__item--isSelected' title='click to render all news'>All</button>
            <button className='tabs__item' title='click to render my favorites news'>My Faves</button>
        </div>
    )
}

export default Tabs; 