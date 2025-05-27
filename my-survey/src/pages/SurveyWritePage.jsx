import React, {useState} from "react"
import Helmet from "react-helmet"
import Axios from "axios";
import {useEffect} from "react";
import FillBlank from "../components/Questions/FillBlank.jsx";
import Locate from "../components/Questions/Locate.jsx";
import MultiChoice from "../components/Questions/MultiChoice.jsx";
import Score from "../components/Questions/Score.jsx";
import SingleChoice from "../components/Questions/SingleChoice.jsx";
import {useParams} from "react-router-dom";



export default function SurveyWritePage() {
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id }            = useParams();
    useEffect(() => {

        Axios.get(`http://localhost:3000/surveys/${id}`)
            .then((res)=> {
                setSurvey(res.data);
            })
            .catch((err)=> {
                console.log(err);
            })
            .finally(()=>{
                setLoading(false);
            }) ;
    },[id])
    if (loading) {
        return <p style={{textAlign:'center'}}>问卷加载中…</p>;
    }
    if (!survey) {
        return <p style={{textAlign:'center', color:'red'}}>未找到该问卷</p>;
    }
    return (
        <div style={{textAlign: "center"}}>
            <Helmet>
                填写问卷
            </Helmet>
            <h1>{survey.title}</h1>
            <p>出卷人：{survey.creator}</p>
            <form>
                {survey.questions.map(question => {
                    // 创建一个不包含答案的问题对象
                    const questionWithoutAnswer = {
                        ...question,
                        answer: undefined
                    };
                    return (
                    <div key={question.id}>
                        <h2>{question.title}</h2>
                        {question.type==='single' && (
                        <SingleChoice question={questionWithoutAnswer} viewOnly={true} namePrefix={`survey-${survey.id}`}/>
                        )}
                        {question.type==='multi' && (
                            <MultiChoice question={questionWithoutAnswer} viewOnly={true} namePrefix={`survey-${survey.id}`}/>
                        )}
                        {question.type==='blank' && (
                            <FillBlank question={questionWithoutAnswer} viewOnly={true} namePrefix={`survey-${survey.id}`}/>
                        )}
                        {question.type==='score' && (
                            <Score question={question} viewOnly={true} namePrefix={`survey-${survey.id}`}/>
                        )}
                        {question.type==='locate' && (
                            <Locate question={question} viewOnly={true} namePrefix={`survey-${survey.id}`}/>
                        )}
                    </div>
                    );
                })}
            </form>
        </div>
    )
}