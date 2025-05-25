import React from "react";
export default function MultiChoice({question,onChange,onDelete}){
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

    return (
        <div>
            <button title="删除此题" onClick={onDelete} type={'button'}>🗑️</button>
            <textarea placeholder="请输入题干信息" onChange={titleChange}/>
            <div>
                {question.options.map((opt,id)=>(
                    <div key={id}>
                        <span>{String.fromCharCode(65 + id)}</span>
                        <input type='checkbox' checked={question.answer===id}  onChange={(e)=>optionChange(id,e.target.value)}/>
                        <input type='text' onChange={(e)=>optionChange(id,e.target.value)}/>
                        <button title='删除选项' type={'button'} onClick={()=>optionDelete(id) }>✖️</button>
                    </div>
                ))}
                <button title="增加选项" type={'button'} onClick={optionAdd}>➕</button>
            </div>
        </div>
    )

}