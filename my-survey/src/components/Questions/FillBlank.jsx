import React from 'react';

export default function FillBlank({question,onChange,onDelete}) {
    const titleChange=e=>{
        onChange({...question,title:e.target.value})
    }

    return (
        <div>
            <button title="删除此题" onClick={onDelete}>🗑️</button>
            <textarea placeholder="请输入题干信息" onChange={titleChange}/>
            <div>
                <textarea></textarea>
            </div>
        </div>
    )
}