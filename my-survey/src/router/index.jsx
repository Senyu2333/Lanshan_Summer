import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import SurveylistPage from "../pages/SurveylistPage.jsx";

export default function AppRouter(){
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<SurveylistPage />}></Route>
            <Route path="*" element={<Navigate to="/login" replace /> }></Route>
        </Routes>
    )
}
