import React, {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {Helmet} from "react-helmet"
import Axios from "axios";
import FillBlank from "../components/Questions/FillBlank.jsx";
import Locate from "../components/Questions/Locate.jsx";
import MultiChoice from "../components/Questions/MultiChoice.jsx";
import Score from "../components/Questions/Score.jsx";
import SingleChoice from "../components/Questions/SingleChoice.jsx";

// 设置axios默认配置
Axios.defaults.baseURL = 'http://localhost:3000';

const SurveyWritePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    
    useEffect(() => {
        Axios.get(`/surveys/${id}`)
            .then((res)=> {
                setSurvey(res.data);
                // 初始化answers对象
                const initialAnswers = {};
                res.data.questions.forEach(q => {
                    initialAnswers[q.id] = q.type === 'multi' ? [] : null;
                });
                setAnswers(initialAnswers);
            })
            .catch((err)=> {
                console.log(err);
            })
            .finally(()=>{
                setLoading(false);
            });
    },[id])

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleSubmit = async () => {
        // 验证所有问题是否都已回答
        const unansweredQuestions = survey.questions.filter(q => {
            const answer = answers[q.id];
            return answer === null || (Array.isArray(answer) && answer.length === 0) || answer === '';
        });

        if (unansweredQuestions.length > 0) {
            alert('请回答所有问题后再提交！');
            return;
        }

        setSubmitting(true);
        try {
            // 获取最新的问卷数据
            const { data: currentSurvey } = await Axios.get(`/surveys/${id}`);
            
            // 构建提交的答案数据
            const updatedSurvey = {
                ...currentSurvey,
                results: [
                    ...(currentSurvey.results || []),
                    {
                        user: user.username,
                        answers: Object.entries(answers).map(([questionId, answer]) => ({
                            id: questionId,
                            answer
                        }))
                    }
                ]
            };

            // 更新问卷数据
            await Axios.put(`/surveys/${id}`, updatedSurvey);
            alert('问卷提交成功！');
            navigate('/surveylist');
        } catch (error) {
            console.error('提交失败：', error);
            alert('提交失败，请重试！');
        } finally {
            setSubmitting(false);
        }
    };
    
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
                
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {survey.questions.map(question => {
                        const questionWithAnswer = {
                            ...question,
                            answer: answers[question.id]
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
                                        question={questionWithAnswer}
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(newQuestion) => handleAnswerChange(question.id, newQuestion.answer)}
                                    />
                                )}
                                {question.type === 'multi' && (
                                    <MultiChoice 
                                        question={questionWithAnswer}
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(newQuestion) => handleAnswerChange(question.id, newQuestion.answer)}
                                    />
                                )}
                                {question.type === 'blank' && (
                                    <FillBlank 
                                        question={questionWithAnswer}
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(newQuestion) => handleAnswerChange(question.id, newQuestion.answer)}
                                    />
                                )}
                                {question.type === 'score' && (
                                    <Score 
                                        question={questionWithAnswer}
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(newQuestion) => handleAnswerChange(question.id, newQuestion.answer)}
                                    />
                                )}
                                {question.type === 'locate' && (
                                    <Locate 
                                        question={questionWithAnswer}
                                        viewOnly={true} 
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(newQuestion) => handleAnswerChange(question.id, newQuestion.answer)}
                                    />
                                )}
                            </div>
                        );
                    })}
                    
                    <button 
                        type="submit"
                        disabled={submitting}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: submitting ? '#9ca3af' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: '500',
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '1rem'
                        }}
                    >
                        {submitting ? '提交中...' : '提交问卷'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SurveyWritePage;