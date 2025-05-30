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
Axios.defaults.baseURL = 'http://localhost:3000';
const SurveyWritePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [surveyFinished, setSurveyFinished] = useState(null);
    useEffect(() => {
        Axios.get(`/surveys/${id}`)
            .then((res)=> {
                const e=res.data;
                setSurvey(e);
                const initialAnswers = {};
                e.questions.forEach(q => {
                    initialAnswers[q.id] = q.type === 'multi' ? [] : null;
                });
                setAnswers(initialAnswers);
                const finished=Array.isArray(e.results)?e.results.find(s=>s.user===user.username):null;
                setSurveyFinished(finished||null);
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
        if(surveyFinished){
            alert('你已经完成问卷了')
            return
        }
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
            const { data: currentSurvey } = await Axios.get(`/surveys/${id}`);
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
    const finishedSurvey={
        user: user.username,
        answers: Object.entries(answers).map(([Id, answer]) => ({
            id: id,
            answer:ans
        }))
    }

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
                    {survey.questions.map((question,idx) => {
                        const prev=surveyFinished?surveyFinished.answers.find(e=>e.id===String(question.id)):null;
                        const prevAnswer=prev?prev.answer:null;



                        const questionWithAnswer = surveyFinished?{...question,answer:prevAnswer}:{...question,answer:answers[question.id]}
                        
                        return (
                            <div key={question.id} style={{
                                backgroundColor: '#f9fafb',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e5e7eb'
                            }}>
                                <span>第{idx+1}题</span>
                                <span style={{color: '#3b82f6'}}>
                                {question.type === 'locate' && question.answer
                                    ? `(${question.answer.latitude.toFixed(6)}, ${question.answer.longitude.toFixed(6)})`
                                    : question.answer}
                                    【{{
                                    single:   '单选题',
                                    multi:    '多选题',
                                    blank:    '填空题',
                                    score:    '打分题',
                                    locate:   '定位题',
                                    dropdown: '下拉框题'
                                }[question.type]}】</span>
                                {question.type === 'single' && (
                                    <SingleChoice 
                                        question={questionWithAnswer}
                                        viewOnly={Boolean(surveyFinished)}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={surveyFinished?undefined:(ans=>handleAnswerChange(question.id,ans))}
                                    />
                                )}
                                {question.type === 'multi' && (
                                    <MultiChoice 
                                        question={questionWithAnswer}
                                        viewOnly={Boolean(surveyFinished)}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={surveyFinished?undefined:(ans=>handleAnswerChange(question.id,ans))}
                                    />
                                )}
                                {question.type === 'blank' && (
                                    <FillBlank 
                                        question={questionWithAnswer}
                                        viewOnly={Boolean(surveyFinished)}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={surveyFinished?undefined:(ans=>handleAnswerChange(question.id,ans))}
                                    />
                                )}
                                {question.type === 'score' && (
                                    <Score
                                        question={questionWithAnswer}
                                        viewOnly={Boolean(surveyFinished)}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={surveyFinished?undefined:(ans=>handleAnswerChange(question.id,ans))}

                                    />
                                )}
                                {question.type === 'locate' && (
                                    <Locate 
                                        question={questionWithAnswer}
                                        viewOnly={Boolean(surveyFinished)}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={surveyFinished?undefined:(ans=>handleAnswerChange(question.id,ans))}
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
                            backgroundColor:surveyFinished?"#9ca3af":submitting ? '#9ca3af' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: '500',
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '1rem'
                        }}
                    >
                        {surveyFinished?'你已完成答卷':(submitting ? '提交中...' : '提交问卷')}

                    </button>
                </form>
            </div>
        </div>
    );
}

export default SurveyWritePage;