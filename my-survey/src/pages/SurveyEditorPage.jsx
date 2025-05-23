import React, {useState,useEffect} from "react"
import Helmet from 'react-helmet'
import SingleChoice from "../components/Questions/SingleChoice.jsx";
import FillBlank from "../components/Questions/FillBlank.jsx";
import Score from "../components/Questions/Score.jsx";
export default function SurveyEditorPage() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
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
    useEffect(() => {
        questions.forEach(question=>{
            if(question.type === 'single'){
                if(question.options.length < 2){
                    alert('单选题答案不宜小于两个！')
                }else if(question.options.length > 26){
                    alert('单选题答案不宜大于二十六个！')
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
    return (
        <div style={{textAlign: 'center'}}>
            <Helmet>
                <title>问卷编辑</title>
            </Helmet>
            <h1>问卷编辑</h1>
            <div>
                <label>标题</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"请输入标题"}/>
            </div>
            <div>
                <span>增加题目</span>
                <button onClick={() => addSingleChoice()}>单选题</button>
                <button>多选题</button>
                <button  onClick={()=>addFillBlank()}>填空题</button>
                <button onClick={()=>addScore()}>打分题</button>
                <button>下拉框题</button>
                <button>定位题</button>
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
                            setQuestions(prev =>prev.filter(e=>e.id!==newQuestion.id))}}
                                   onDelete={()=>setQuestions(prev =>prev.filter(e=>e.id!==question.id))}
                        />}
                    {questions.map(question => (
                        <div key={question.id}>
                            {question.type === "score" && (
                                <Score question={question} onChange={updated =>
                            setQuestions(prev => prev.map(q => (q.id === updated.id ? updated : q)))}
                                  onDelete={() =>
                                        setQuestions(prev => prev.filter(q => q.id !== question.id))}
                        />)}
                        </div>
                    ))}
                </div>
            ))}
            {questions.length === 0 && <p>开始增加问题</p>}
        </div>
    )
}