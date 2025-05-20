import React from "react"
import Helmet from 'react-helmet'
export default function SurveyEditorPage() {
    return (
        <div style={{textAlign:'center'}}>
            <Helmet>
                <title>问卷编辑</title>
            </Helmet>
                <h1>问卷编辑</h1>
            <div>
                <span>增加题目</span>
                <button>单选题</button>
                <button>多选题</button>
                <button>填空题</button>
                <button>打分题</button>
                <button>下拉框题</button>
                <button>定位题</button>
            </div>
        </div>
    )
}