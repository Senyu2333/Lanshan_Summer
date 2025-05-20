import React from "react";

export default function SingleChoice({question,onChange,onDelete}) {
    const titleChange=e=>{
        onChange({...question,title:e.target.value})
    }

    const optionChange=(id,text)=>{
        const opts=[...question.options];
        opts[id]=text;
        onChange({...question,options:opts});
    }

    const optionDelete=id=>{
        const opts=question.options.filter(option=>option.id !== id);
        const answer=opts.includes(question.answer?question.answer:null);
        onChange({...question,options:opts,answer});
    }

    const optionAdd=()=>{
        onChange({...question,options:[...question.options,'']});
    }

    const optionClick=opt=>{
        onChange({...question,answer:opt})
    }
    return(
        <div>
            <button title="删除此题">🗑️</button>
            <input placeholder="请输入题干信息"/>
            <div>
                {question.options.map((option,id)=>(
                    <div key={id}>
                        <input type='radio'/>
                        <input type='text'/>
                        <button title='删除选项'>✖️</button>
                    </div>
                ))}
                    <button title="增加选项">➕</button>
            </div>
        </div>

    )
}