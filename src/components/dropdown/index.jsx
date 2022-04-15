import React, {useState} from 'react';
import toggle from '../../utils/dropdown'
import './dropdown.css';
import '../../styles/icons.css';

const Dropdown = ({items, handleOnSelect})=>{

    const [selection, setSelection] = useState('')

    const togglePanel=()=>{
        toggle()
    }

    const onSelection =(event)=>{
        const selectedLabel = document.querySelector('.dropdown__selected-text')
        selectedLabel.innerText = event.target.innerText
        setSelection(event.target.innerText)
        togglePanel()
        handleOnSelect(event)
    }


    return (
        <div className='dropdown' role='listbox' aria-label='Select your news'>
            <div onClick={togglePanel}
                 onKeyUp={(e)=>e.code ==='Enter' && togglePanel()}
                 className='dropdown__selected' 
                 tabIndex='0'>

               <span className='dropdown__selected-text'>Select your news</span>
               <i className='icon-arrow_down' />

            </div>
            <div className='dropdown__panel'>

                {items.map((item)=>(

                    <div key={item.value}
                        onClick={onSelection} 
                        onKeyUp={(e)=>e.code==='Enter' && onSelectItem(e)}
                        role='option' 
                        tabIndex='0' 
                        className={`dropdown__panel-item ${selection === item.value && 'dropdown__panel-item--selected'}`} >

                        <figure className='dropdown__panel-item__image' >
                            <img src={item.img} width='24' height='24' alt={`${item.value}'s icon`} />
                        </figure>

                        <span>{item.value}</span>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default Dropdown