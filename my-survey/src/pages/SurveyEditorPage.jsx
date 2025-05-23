import React, {useState} from "react"
import Helmet from 'react-helmet'
import SingleChoice from "../components/Questions/SingleChoice.jsx";
export default function SurveyEditorPage() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const addSingleChoice = (type) => {

        const newQuestion = {
            id: Date.now(),
            type,
            title: '',
            options: ['', '','',''],
            answer: null
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
                <button onClick={() => addSingleChoice('single')}>单选题</button>
                <button>多选题</button>
                <button>填空题</button>
                <button>打分题</button>
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
                    {question.options.length < 2 && alert('单选题答案不宜小于两个！')}
                    {question.options.length > 26 && alert('单选题答案不宜大于二十六个！')}
                </div>
            ))}
            {questions.length === 0 && <p>开始增加问题</p>}
        </div>
    )
}