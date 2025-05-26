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

export default function SurveyEditorPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth);


    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const handleCreate=()=>{
        if (!title.trim()) return alert("请先输入问卷标题");
                if (questions.length === 0) return alert("请至少添加一道题");
               dispatch(createAsync({ title, question: questions }))
                 .then(() => navigate('/surveylist'))
                 .catch(err => {
                     console.error("提交失败", err);
                     alert("创建问卷失败，请重试");
                        });
    console.log()
    };

    const addSingleChoice = () => {
        const newQuestion = {
            id: Date.now(),
            type:'single',
            title: '',
            options: ['', '','',''],
            answer: null
        }
        setQuestions(prev => [...prev, newQuestion])
    }
    const addMultiChoice = () => {
        const newQuestion = {
            id: Date.now(),
            type:'multi',
            title: '',
            options: ['', '','',''],
            answer: null
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
    })
    const addFillBlank = () => {
        const newQuestion = {
            id: Date.now(),
            type:'blank',
            title: '',
            answer: null
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
        <div style={{textAlign: 'center'}}>
            <Helmet>
                <title>问卷编辑</title>
            </Helmet>
            <form onSubmit={e => {e.preventDefault();handleCreate();}}>
                <h1>问卷编辑</h1>
                <div>
                    <label>标题</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"请输入标题"}/>
                </div>
                <div>
                    <span>增加题目</span>
                    <button type="button" onClick={() => addSingleChoice() }>单选题</button>
                    <button type="button" onClick={()=>addMultiChoice()}>多选题</button>
                    <button type="button" onClick={()=>addFillBlank()}>填空题</button>
                    <button type="button" onClick={()=>addScore()}>打分题</button>
                    <button type="button">下拉框题</button>
                    <button type="button" onClick={()=>addLocate()}>定位题</button>
                </div>

                {questions.map((question) => (
                    <div key={question.id}>
                        {question.type === 'single' &&
                            <SingleChoice question={question} onChange={newQuestion=>{
                                setQuestions(prev =>prev.map(e=>e.id===newQuestion.id?newQuestion:e))}}
                                          onDelete={() => setQuestions(prev =>prev.filter(e=>e.id!==question.id))}
                            />}
                        {question.type ==='blank' &&
                            <FillBlank question={question} onChange={newQuestion=>{
                                setQuestions(prev =>prev.map(e=>e.id===newQuestion.id?newQuestion:e))}}
                                       onDelete={()=>setQuestions(prev =>prev.filter(e=>e.id!==question.id))}
                            />}
                        {question.type === "score" &&
                            <Score question={question} onChange={newQuestion=>
                                setQuestions(prev =>prev.map(q=>(q.id===newQuestion.id?newQuestion: q)))}
                                   onDelete={() => setQuestions(prev => prev.filter(q => q.id !== question.id))}
                            />}
                        {question.type==='locate' &&
                            <Locate question={question} onChange={newQuestion=>
                                setQuestions(prev =>prev.map(e=>(e.id===newQuestion.id?newQuestion:e)))}
                                    onDelete={()=>setQuestions(prev =>prev.filter(q => q.id !== question.id))}
                            />}
                        {question.type==='multi'&&
                            <MultiChoice question={question} onChange={newQuestion=>
                                setQuestions(prev =>prev.map(e=>e.id===newQuestion.id?newQuestion:e))}
                                onDelete={()=>setQuestions(prev =>prev.filter(q => q.id !== question.id))}
                        />}
                    </div>))}
                {questions.length === 0 && <p>开始增加问题</p>}
                {questions.length > 0 &&<button type={'submit'} disabled={loading}>{loading?"创建中":"创建问卷"}</button>}
            </form>

        </div>
    )
}