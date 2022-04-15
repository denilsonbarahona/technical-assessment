import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Main from "../layouts/main";
import News from "../containers/news";
import Dropdown from "../components/dropdown";
import '../styles/global.css'

const App = () =>{
    return ( <React.Fragment>
                <Header/>
                <Main>
                    <Dropdown 
                        handleOnSelect={(event)=>alert(event.target.innerText)}
                        items={[ 
                            {img:'https://imgur.com/ROc7nkS.png', value: 'Angular'},
                            {img:'https://imgur.com/DlYIrSe.png', value: 'React'},
                            {img:'https://imgur.com/15dvqzT.png', value: 'Vue'},
                         ]} />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<News />}></Route>
                            <Route path="/fav" element={<p>favorites</p>}></Route>
                        </Routes>
                    </BrowserRouter>
                </Main>
             </React.Fragment> )
}

export default App