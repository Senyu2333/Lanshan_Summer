import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import SurveylistPage from "../pages/SurveylistPage.jsx";
import ForbiddenPage from "../pages/ForbiddenPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AppRouter(){
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<SurveylistPage />}></Route>
            <Route path="403" element={<ForbiddenPage />}></Route>
            <Route path="*" element={<NotFoundPage/> }></Route>
        </Routes>
    )
}
