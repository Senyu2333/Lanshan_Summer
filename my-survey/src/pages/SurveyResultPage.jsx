import React, {useState} from 'react'
import Helmet from 'react-helmet'
import Axios from 'axios'
import {useEffect} from "react";
export default function SurveyResultPage() {
    const [surveyResult, setSurveyResult] = useState({});
    useEffect(() => {
        Axios.get('http://localhost:3000/surveys')
        .then(res=>{
            setSurveyResult(res.data);
        })
            .catch(err=>{
                console.log(err)
            })
    },[])
    return (
        <div style={{textAlign:'center'}}>
            <Helmet>
                <title>问卷结果</title>
            </Helmet>
            <h1>问卷结果</h1>
        </div>

    )
}