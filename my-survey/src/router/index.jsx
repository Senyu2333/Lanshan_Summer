import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import ForbiddenPage from "../pages/ForbiddenPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import MyAnswersPage from "../pages/MyAnswersPage.jsx";
import {Suspense, lazy} from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.jsx"));
const SurveyEditorPage = lazy(() => import("../pages/SurveyEditorPage.jsx"));
const SurveyResultPage = lazy(() => import("../pages/SurveyResultPage.jsx"));
const SurveyWritePage = lazy(() => import("../pages/SurveyWritePage.jsx"));
const SurveylistPage = lazy(() => import("../pages/SurveyListPage.jsx"));

export default function AppRouter() {
    return (
        <Suspense fallback={<h1 style={{textAlign: "center"}}>加载中...</h1>}>
            <Routes>
                <Route path="/" element={<Navigate to="/surveylist" replace />} />
                <Route path="/surveylist" element={<ProtectedRoute><SurveylistPage /></ProtectedRoute>} />
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/write/:id" element={<ProtectedRoute><SurveyWritePage /></ProtectedRoute>} />
                <Route path="/edit/:id?" element={<ProtectedRoute><SurveyEditorPage /></ProtectedRoute>} />
                <Route path="/result/:id" element={<ProtectedRoute><SurveyResultPage /></ProtectedRoute>} />
                <Route path="/myanswers" element={<ProtectedRoute><MyAnswersPage /></ProtectedRoute>} />
            </Routes>
        </Suspense>
    )
}
