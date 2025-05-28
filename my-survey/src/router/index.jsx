import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import ForbiddenPage from "../pages/ForbiddenPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import MyAnswersPage from "../pages/MyAnswersPage.jsx";
import {Suspense,lazy} from "react";
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.jsx"));
const SurveyEditorPage = lazy(() => import("../pages/SurveyEditorPage.jsx"));
const SurveyResultPage = lazy(() => import("../pages/SurveyResultPage.jsx"));
const SurveyWritePage = lazy(() => import("../pages/SurveyWritePage.jsx"));
const SurveylistPage = lazy(() => import("../pages/SurveyListPage.jsx"));
export default function AppRouter(){
    return (
            <Suspense fallback={<h1 style={{
                textAlign: "center"

            }}>加载中...</h1>}>
                <Routes>
                    <Route path="/surveylist" element={<SurveylistPage />} />
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="403" element={<ForbiddenPage />}/>
                    <Route path="*" element={<NotFoundPage/> }/>
                    <Route path="/register" element={<RegisterPage/> }/>
                    <Route path="/login" element={<LoginPage/> }/>
                    <Route path="/write/:id" element={<SurveyWritePage />} />
                    <Route path="/edit/:id?" element={<SurveyEditorPage />} />
                    <Route path="/result/:id" element={<SurveyResultPage />} />
                    <Route path="/myanswers" element={<MyAnswersPage />} />
                </Routes>
            </Suspense>
    )
}
