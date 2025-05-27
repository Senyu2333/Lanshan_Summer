import React from 'react';

export default function FillBlank({question, onChange, onDelete, viewOnly=false}) {
    const titleChange=e=>{
        onChange({...question,title:e.target.value})
    }

    if (viewOnly) {
        return (
            <div>
                <textarea 
                    placeholder="请输入您的答案"
                    style={{width: '80%', minHeight: '100px'}}
                />
            </div>
        )
    }

    return (
        <div>
            <button title="删除此题" type={'button'} onClick={onDelete}>🗑️</button>
            <textarea placeholder="请输入题干信息" onChange={titleChange}/>
            <div>
                <textarea></textarea>
            </div>
        </div>
    )
}