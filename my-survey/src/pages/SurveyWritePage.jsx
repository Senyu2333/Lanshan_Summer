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
import Progress from "../components/Progress.jsx";
Axios.defaults.baseURL = 'http://localhost:3000';
const SurveyWritePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [survey, setSurvey] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [surveyFinished, setSurveyFinished] = useState(null);
    const [isCreator, setIsCreator] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [finishedQuestions, setFinishedQuestions] = useState(0);

    useEffect(() => {
        Axios.get(`/surveys/${id}`)
            .then((res)=> {
                const e = res.data;
                setSurvey(e);
                setIsCreator(e.creator === user.username);
                const initialAnswers = {};
                e.questions.forEach(q => {
                    initialAnswers[q.id] = q.type === 'multi' ? [] : null;
                });
                setAnswers(initialAnswers);
                const finished = Array.isArray(e.results) ? e.results.find(s => s.user === user.username) : null;
                setSurveyFinished(finished || null);
                setTotalQuestions(e.questions.length);
                if (finished) {
                    setFinishedQuestions(finished.answers.length);
                }
            })
            .catch((err)=> {
                console.log(err);
                navigate('*');
            })
    }, [id, user.username])

    useEffect(() => {
        if (!survey) return;
        
        const answeredCount = Object.values(answers).filter(answer => {
            if (Array.isArray(answer)) {
                return answer.length > 0;
            }
            if (typeof answer === 'object' && answer !== null) {
                if ('latitude' in answer && 'longitude' in answer) {
                    return answer.latitude && answer.longitude;
                }
                if ('0' in answer) {
                    return typeof answer[0] === 'number';
                }
                return false;
            }
            return answer !== null && answer !== '';
        }).length;
        
        setFinishedQuestions(answeredCount);
    }, [answers, survey]);

    const handleAnswerChange = (questionId, question) => {
        if (surveyFinished) return;
        
        const answer = question.type === 'multi' ? 
            (Array.isArray(question.answer) ? [...question.answer] : []) : 
            question.answer;
            
        console.log('Saving answer for question', questionId, ':', answer);
        
        setAnswers(prev => {
            const newAnswers = {
                ...prev,
                [questionId]: answer
            };
            console.log('New answers state:', newAnswers);
            return newAnswers;
        });
    };

    const handleSubmit = async () => {
        if(surveyFinished){
            alert('你已经完成问卷了')
            return
        }

        const unansweredQuestions = survey.questions.filter(q => {
            const answer = answers[q.id];
            if (q.type === 'locate') {
                return !answer || !answer.latitude || !answer.longitude;
            }
            return answer === null || (Array.isArray(answer) && answer.length === 0) || answer === '';
        });

        if (unansweredQuestions.length > 0) {
            alert('请回答所有问题，对于定位题请点击"获取当前位置"按钮！');
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

    if (!survey) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#f3f4f6',
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: '1.125rem',
                    color: '#6b7280'
                }}>
                    加载中...
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem'
        }}>
            <Helmet>
                <title>问卷填写 - {survey.title}</title>
            </Helmet>
            
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                marginRight: 'calc(200px + 4rem)', // 为进度条留出空间
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
                {!surveyFinished && <Progress finished={finishedQuestions} total={totalQuestions}/>}
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
                                    【{{
                                    single:   '单选题',
                                    multi:    '多选题',
                                    blank:    '填空题',
                                    score:    '打分题',
                                    locate:   '定位题',
                                }[question.type]}】</span>
                                {question.type === 'single' && (
                                    <SingleChoice 
                                        question={questionWithAnswer}
                                        viewOnly={surveyFinished}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(ans) => handleAnswerChange(question.id, ans)}
                                        onDelete={undefined}
                                    />
                                )}
                                {question.type === 'multi' && (
                                    <MultiChoice 
                                        question={questionWithAnswer}
                                        viewOnly={surveyFinished}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(ans) => handleAnswerChange(question.id, ans)}
                                        onDelete={undefined}
                                    />
                                )}
                                {question.type === 'blank' && (
                                    <FillBlank 
                                        question={questionWithAnswer}
                                        viewOnly={surveyFinished}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(ans) => handleAnswerChange(question.id, ans)}
                                        onDelete={undefined}
                                    />
                                )}
                                {question.type === 'score' && (
                                    <Score
                                        question={questionWithAnswer}
                                        viewOnly={surveyFinished}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(ans) => handleAnswerChange(question.id, ans)}
                                        onDelete={undefined}
                                    />
                                )}
                                {question.type === 'locate' && (
                                    <Locate 
                                        question={questionWithAnswer}
                                        viewOnly={surveyFinished}
                                        namePrefix={`survey-${survey.id}`}
                                        onChange={(ans) => handleAnswerChange(question.id, ans)}
                                        onDelete={undefined}
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