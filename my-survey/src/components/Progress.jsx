import React from "react";
import Axios from "axios";
import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
export default function Progress({finished,total}) {
    const id = useParams();
    const [survey,setSurvey]=useState(null);
    const user=useSelector((state) => state.auth.user)
    const totalQuestions=survey.questions.length;
    const findI=survey.results?.find(s=>s.user===user.username)
    const finishedQuestions=Array.isArray(findI?.answers)?findI?.answers.length:0
    const percent=finishedQuestions>0?Math.floor(finishedQuestions/totalQuestions):0;
    useEffect(() => {
        Axios.get(`http://localhost:3000/surveys/${id}`)
            .then((res)=>{
                setSurvey(res.data);
            })
        .catch((err)=>{
            console.log(err);
        })
    },[id])

    return (
        <div>
            <h2>当前进度</h2>
            <div>
            <div style={{
                width:`${percent}%`,
                color:'green',
                backgroundColor:'white',
                transition:'width 0.3s ease',
            }}>

            </div>
            </div>
        </div>
    )
}