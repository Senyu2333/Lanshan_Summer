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
}