import React, { useState } from "react";
export default function MultiChoice({question, onChange, onDelete, viewOnly=false}){
    const [answers, setAnswers] = useState([]);
    
    const titleChange=e=>{
        onChange({...question,title:e.target.value});
    }
    const optionChange=(id,text)=>{
        const opts=[...question.options];
        opts[id]=text;
        onChange({...question,options:opts});
    }
    const optionDelete=id=>{
        const opts=question.options.filter((_,e)=>e!==id);
        onChange({...question,options:opts});
    }
    const optionAdd=()=>{
        onChange({...question,options:[...question.options,'']});
    }
    
    const handleCheckboxChange = (id) => {
        if (viewOnly) {
            setAnswers(prev => 
                prev.includes(id) 
                    ? prev.filter(a => a !== id)
                    : [...prev, id]
            );
        } else {
            const currentAnswers = Array.isArray(question.answer) ? question.answer : [];
            const newAnswers = currentAnswers.includes(id)
                ? currentAnswers.filter(a => a !== id)
                : [...currentAnswers, id];
            onChange({...question, answer: newAnswers});
        }
    }

    if (viewOnly) {
        return (
            <div>
                {question.options.map((opt,id)=>(
                    <div key={id} style={{margin: '8px 0'}}>
                        <label style={{display: 'block'}}>
                            <input 
                                type='checkbox' 
                                checked={answers.includes(id)}
                                onChange={() => handleCheckboxChange(id)}
                            />
                            {' '}{String.fromCharCode(65 + id)}. {opt}
                        </label>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <button title="删除此题" onClick={onDelete} type={'button'}>🗑️</button>
            <textarea placeholder="请输入题干信息" onChange={titleChange}/>
            <div>
                {question.options.map((opt,id)=>(
                    <div key={id}>
                        <span>{String.fromCharCode(65 + id)}</span>
                        <input 
                            type='checkbox' 
                            checked={Array.isArray(question.answer) && question.answer.includes(id)}
                            onChange={() => handleCheckboxChange(id)}
                        />
                        <input type='text' value={opt} onChange={(e)=>optionChange(id,e.target.value)}/>
                        <button title='删除选项' type={'button'} onClick={()=>optionDelete(id) }>✖️</button>
                    </div>
                ))}
                <button title="增加选项" type={'button'} onClick={optionAdd}>➕</button>
            </div>
        </div>
    )
}