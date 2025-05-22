import React, {useState} from "react"
import Helmet from 'react-helmet'
import SingleChoice from "../components/Questions/SingleChoice.jsx";
import { createSurvey } from '../api';
import { useNavigate } from 'react-router-dom';
export default function SurveyEditorPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const addSingleChoice = (type) => {

        const newQuestion = {
            id: Date.now(),
            type,
            title: '',
            options: ['', '','',''],
            answer: ''
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

            {questions.map((question, index) => (
                <div key={question.id}>
                    {question.type === 'single' && <SingleChoice question={question}/>}
                </div>
            ))}
            {questions.length === 0 && <p>开始增加问题</p>}
        </div>
    )
}