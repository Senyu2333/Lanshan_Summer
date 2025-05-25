import React from "react";
export default function MultiChoice({question,onChange,onDelete}){
    const titleChange=e=>{
        onChange({...question,title:e.target.value});
    }



    return (
        <div>
            <button title="删除此题" onClick={onDelete} type={'button'}>🗑️</button>
            <textarea placeholder="请输入题干信息" onChange={titleChange}/>
            <div>
                {question.options.map((opt,id)=>(
                    <div key={id}>
                        
                    </div>
                ))}
            </div>
        </div>
    )

}