import React, {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

import {Helmet} from "react-helmet"
import Axios from "axios";
import FillBlank from "../components/Questions/FillBlank.jsx";
import Locate from "../components/Questions/Locate.jsx";
import MultiChoice from "../components/Questions/MultiChoice.jsx";
import Score from "../components/Questions/Score.jsx";
import SingleChoice from "../components/Questions/SingleChoice.jsx";

const SurveyWritePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
            });
    },[id])
    
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f4f6'
            }}>
                <p style={{
                    fontSize: '1.125rem',
                    color: '#6b7280'
                }}>问卷加载中…</p>
            </div>
        );
    }
    
    if (!survey) {
        navigate('*')
    }
    
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem'
        }}>
            <Helmet>
                <title>填写问卷 - {survey.title}</title>
            </Helmet>
            
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    color: '#111827'
                }}>{survey.title}</h1>
                
                <p style={{
                    textAlign: 'center',
                    color: '#6b7280',
                    marginBottom: '2rem'
                }}>出卷人：{survey.creator}</p>
                
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {survey.questions.map(question => {
                        // 创建一个不包含答案的问题对象
                        const questionWithoutAnswer = {
                            ...question,
                            answer: undefined
                        };
                        
                        return (
                            <div key={question.id} style={{
                                backgroundColor: '#f9fafb',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e5e7eb'
                            }}>
                                {question.type === 'single' && (
                                    <SingleChoice 
                                        question={questionWithoutAnswer} 
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                    />
                                )}
                                {question.type === 'multi' && (
                                    <MultiChoice 
                                        question={questionWithoutAnswer} 
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                    />
                                )}
                                {question.type === 'blank' && (
                                    <FillBlank 
                                        question={questionWithoutAnswer} 
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                    />
                                )}
                                {question.type === 'score' && (
                                    <Score 
                                        question={question} 
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                    />
                                )}
                                {question.type === 'locate' && (
                                    <Locate 
                                        question={question} 
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                    
                    <button 
                        type="button"
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '1rem'
                        }}
                    >
                        提交问卷
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SurveyWritePage;