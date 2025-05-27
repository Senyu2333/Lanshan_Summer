import React from "react";

export default function SingleChoice({question,onChange,onDelete,viewOnly=false,namePrefix=""}) {
    const authChange=(up)=>{
        if(!viewOnly&&onChange){
            onChange(up);
        }
    }

    const titleChange=e=>{
        authChange({...question,title:e.target.value})
    }

    const optionChange=(id,text)=>{
        const opts=[...question.options];
        opts[id]=text;
        authChange({...question,options:opts});
    }

    const optionDelete=id=>{
        const opts=question.options.filter((_,i)=>i!== id);
        const answer=opts.includes(question.answer)?question.answer:'';
        authChange({...question,options:opts,answer});
    }

    const optionAdd=()=>{
        authChange({...question,options:[...question.options,'']});
    }

    const optionClick=opt=>{
        authChange({...question,answer:opt})
    }

    if(viewOnly){
        return(
            <div>
                <div>
                    {question.options.map((opt, idx) => (
                        <label key={idx} style={{ display: "block", margin: "4px 0" }}>
                            <input
                                type="radio"
                                name={`${namePrefix}-${question.id}`}
                                checked={question.answer === idx}
                                disabled
                            />{" "}
                            {opt}
                        </label>
                    ))}
                </div>
            </div>
        )
    }
    return(
        <div>
            <button title="删除此题" onClick={onDelete} type={'button'}>🗑️</button>
            <textarea placeholder="请输入题干信息" onChange={titleChange}/>
            <div>
                {question.options.map((opt,id)=>(
                    <div key={id}>
                        <span>{String.fromCharCode(65 + id)}</span>
                        <input type='radio' checked={question.answer===id}  onChange={()=>optionClick(id)}/>
                        <input type='text' onChange={e=>optionChange(id,e.target.value)}/>
                        <button title='删除选项' type={'button'} onClick={()=>optionDelete(id) }>✖️</button>
                    </div>
                ))}
                    <button title="增加选项" type={'button'} onClick={optionAdd}>➕</button>
            </div>
        </div>

    )
}