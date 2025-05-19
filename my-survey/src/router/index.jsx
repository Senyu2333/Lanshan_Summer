import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import SurveylistPage from "../pages/SurveylistPage.jsx";
import ForbiddenPage from "../pages/ForbiddenPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SurveyEditorPage from "../pages/SurveyEditorPage.jsx";
import SurveyWritePage from "../pages/SurveyWritePage.jsx";
import SurveyResultPage from "../pages/SurveyResultPage.jsx";
import MyAnswersPage from "../pages/MyAnswersPage.jsx";
export default function AppRouter(){
    return (
        <Routes>
            <Route path="/surveylist" element={<SurveylistPage />} />
            <Route path="/" element={<LoginPage/>}/>
            <Route path="403" element={<ForbiddenPage />}/>
            <Route path="*" element={<NotFoundPage/> }/>
            <Route path="/register" element={<RegisterPage/> }/>
            <Route path="/write/:id" element={<SurveyWritePage />} />
            <Route path="/edit/:id?" element={<SurveyEditorPage />} />
            <Route path="/result/:id" element={<SurveyResultPage />} />
            <Route path="/myanswers" element={<MyAnswersPage />} />
        </Routes>
    )
}
