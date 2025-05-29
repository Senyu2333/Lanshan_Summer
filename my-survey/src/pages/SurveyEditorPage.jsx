import React, {useState,useEffect} from "react"
import Helmet from 'react-helmet'
import SingleChoice from "../components/Questions/SingleChoice.jsx";
import FillBlank from "../components/Questions/FillBlank.jsx";
import Score from "../components/Questions/Score.jsx";
import Locate from "../components/Questions/Locate.jsx";
import {createAsync} from "../store/authSlice.js";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import MultiChoice from "../components/Questions/MultiChoice.jsx";

const SurveyEditorPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth);

    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    
    const handleCreate=()=>{
        if (!title.trim()) return alert("请先输入问卷标题");
        if (questions.length === 0) return alert("请至少添加一道题");
        dispatch(createAsync({ title, questions: questions }))
            .then(() => navigate('/surveylist'))
            .catch(err => {
                console.error("提交失败", err);
                alert("创建问卷失败，请重试");
            });
    };

    const addSingleChoice = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'single',
            title: '',
            options: ['', '', '', ''],
            answer: null
        }
        setQuestions(prev => [...prev, newQuestion])
    }
    const addMultiChoice = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'multi',
            title: '',
            options: ['', '', '', ''],
            answer: []
        }
        setQuestions(prev => [...prev, newQuestion])
    }
    useEffect(() => {
        questions.forEach(question=>{
            if(question.type === 'single'){
                if(question.options.length < 2){
                    alert('单选题选项不宜小于两个！')
                }else if(question.options.length > 26){
                    alert('单选题选项不宜大于二十六个！')
                }
            }else if(question.type === 'multi'){
                if(question.options.length < 2){
                    alert('多选题选项不宜小于两个')
                }else if(question.options.length > 26){
                    alert('单选题选项不宜大于二十六个！')
                }
            }
        })
    }, [questions])
    const addFillBlank = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'blank',
            title: '',
            answer: ''
        }
        setQuestions(prev => [...prev, newQuestion])
    }
    const addScore=()=>{
        const newQuestion = {
            id: Date.now(),
            type:'score',
            title: '',
            cells:['']
        }
        setQuestions(prev => [...prev, newQuestion])
    }
    const addLocate=()=>{
        const newQuestion = {
            id: Date.now(),
            type:'locate',
            title: '',
            answer: null
        }
        setQuestions(prev => [...prev, newQuestion])
    }
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, white, #f3f4f6)'
        }}>
            <Helmet>
                <title>问卷编辑</title>
            </Helmet>
            <form onSubmit={e => {e.preventDefault();handleCreate();}} style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem 1rem'
            }}>
                <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>问卷编辑</h1>
                
                <div style={{
                    width: '75%',
                    margin: '0 auto',
                    marginBottom: '2rem'
                }}>

                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="请输入问卷标题" 
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.25rem',
                            textAlign: 'center',
                            fontWeight: '500',
                            borderRadius: '1rem',
                            border: '2px solid rgba(31, 41, 55, 0.2)',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{
                    width: '75%',
                    margin: '0 auto',
                    marginBottom: '3rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center'
                }}>
                    {['单选题', '多选题', '填空题', '打分题', '下拉框题', '定位题'].map((type, index) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => {
                                switch(index) {
                                    case 0: addSingleChoice(); break;
                                    case 1: addMultiChoice(); break;
                                    case 2: addFillBlank(); break;
                                    case 3: addScore(); break;
                                    case 5: addLocate(); break;
                                }
                            }}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '0.75rem',
                                border: '2px solid rgba(31, 41, 55, 0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >{type}</button>
                    ))}
                </div>

                <div style={{
                    width: '100%',
                    maxWidth: '672px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {questions.map((question,idx) => (
                        <div key={question.id} style={{
                            backgroundColor: 'rgba(249, 250, 251, 0.8)',
                            backdropFilter: 'blur(4px)',
                            padding: '1.25rem',
                            borderRadius: '0.75rem',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(229, 231, 235, 0.6)'
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
                            {question.type === 'single' &&
                                <SingleChoice question={question} 
                                    onChange={newQuestion => setQuestions(prev => prev.map(e => e.id === newQuestion.id ? newQuestion : e))}
                                    onDelete={() => setQuestions(prev => prev.filter(e => e.id !== question.id))}
                                />}
                            {question.type === 'blank' &&
                                <FillBlank question={question} 
                                    onChange={newQuestion => setQuestions(prev => prev.map(e => e.id === newQuestion.id ? newQuestion : e))}
                                    onDelete={() => setQuestions(prev => prev.filter(e => e.id !== question.id))}
                                />}
                            {question.type === "score" &&
                                <Score question={question} 
                                    onChange={newQuestion => setQuestions(prev => prev.map(q => (q.id === newQuestion.id ? newQuestion : q)))}
                                    onDelete={() => setQuestions(prev => prev.filter(q => q.id !== question.id))}
                                />}
                            {question.type === 'locate' &&
                                <Locate question={question} 
                                    onChange={newQuestion => setQuestions(prev => prev.map(e => (e.id === newQuestion.id ? newQuestion : e)))}
                                    onDelete={() => setQuestions(prev => prev.filter(q => q.id !== question.id))}
                                />}
                            {question.type === 'multi' &&
                                <MultiChoice question={question} 
                                    onChange={newQuestion => setQuestions(prev => prev.map(e => e.id === newQuestion.id ? newQuestion : e))}
                                    onDelete={() => setQuestions(prev => prev.filter(q => q.id !== question.id))}
                                />}
                        </div>
                    ))}
                </div>

                {questions.length === 0 && 
                    <div style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        fontSize: '1.125rem',
                        marginTop: '3rem'
                    }}>
                        开始增加问题
                    </div>
                }

                {questions.length > 0 &&
                    <div style={{
                        textAlign: 'center',
                        marginTop: '3rem'
                    }}>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                padding: '0.75rem 2rem',
                                backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {loading ? "创建中..." : "创建问卷"}
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}

export default SurveyEditorPage;