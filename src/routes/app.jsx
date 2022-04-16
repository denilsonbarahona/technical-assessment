import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Main from "../layouts/main";
import News from "../containers/news";
import Favorites from "../containers/favorites";
import Dropdown from "../components/dropdown";
import Tabs from "../components/tabs";
import { useDispatch } from "react-redux";
import { getNews } from "../reducer/actions";
import '../styles/global.css'

const App = () =>{
    const dispatch = useDispatch()

    const handleOnSelected = (event)=>{
      dispatch(getNews(event.target.innerText)) 
    }

    return ( <React.Fragment>
                <Header/>
                <Main>
                    <Tabs />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<React.Fragment>
                                                        <Dropdown 
                                                            handleOnSelect={handleOnSelected}
                                                            items={[ 
                                                                {img:'https://imgur.com/ROc7nkS.png', value: 'Angular'},
                                                                {img:'https://imgur.com/DlYIrSe.png', value: 'React'},
                                                                {img:'https://imgur.com/15dvqzT.png', value: 'Vue'},
                                                            ]} />
                                                        <News />
                                                    </React.Fragment> }></Route>
                            <Route path="/fav" element={<Favorites />}></Route>
                        </Routes>
                    </BrowserRouter>
                </Main>
             </React.Fragment> )
}

export default App