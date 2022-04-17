import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import News from "../containers/news";
import Favorites from "../containers/favorites";
import '../styles/global.css'


const AppRoutes = ({children}) =>{

    return ( <BrowserRouter>
                {children}
                <Routes>
                    <Route path="/" element={<News />}></Route>
                    <Route path="/fav" element={<Favorites />}></Route>
                </Routes>
            </BrowserRouter> )
}

export default AppRoutes