import React from "react";

export default function MultiChoice({question, onChange, onDelete, viewOnly=false, namePrefix=""}) {
    const handleAnswerChange = (optionIndex) => {
        const currentAnswers = Array.isArray(question.answer) ? question.answer : [];
        const newAnswers = currentAnswers.includes(optionIndex)
            ? currentAnswers.filter(a => a !== optionIndex)
            : [...currentAnswers, optionIndex];
        
        onChange({
            ...question,
            answer: newAnswers
        });
    }

    const titleChange = e => {
        onChange({...question, title: e.target.value});
    }

    const optionChange = (id, text) => {
        const opts = [...question.options];
        opts[id] = text;
        onChange({...question, options: opts});
    }

    const optionDelete = id => {
        const opts = question.options.filter((_, e) => e !== id);
        const newAnswers = Array.isArray(question.answer) 
            ? question.answer.filter(a => a !== id).map(a => a > id ? a - 1 : a)
            : [];
        onChange({...question, options: opts, answer: newAnswers});
    }

    const optionAdd = () => {
        onChange({...question, options: [...question.options, '']});
    }

    if (viewOnly) {
        return (
            <div style={{ margin: '1rem 0' }}>
                <p style={{
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                }}>{question.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {question.options.map((opt, idx) => (
                        <label key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.2s'
                        }}>
                            <input
                                type="checkbox"
                                checked={Array.isArray(question.answer) && question.answer.includes(idx)}
                                onChange={() => handleAnswerChange(idx)}
                                style={{
                                    marginRight: '0.75rem',
                                    width: '1rem',
                                    height: '1rem'
                                }}
                            />
                            {String.fromCharCode(65 + idx)}. {opt}
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <textarea 
                    placeholder="请输入题干信息" 
                    value={question.title || ''}
                    onChange={titleChange}
                    style={{
                        width: '100%',
                        minHeight: '40px',
                        padding: '8px 12px',
                        resize: 'none',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        fontSize: '16px',
                        lineHeight: '1.5'
                    }}
                />
                <button 
                    title="删除此题" 
                    onClick={onDelete} 
                    type={'button'}
                    style={{
                        padding: '0.5rem',
                        color: '#9ca3af',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        border: 'none',
                        backgroundColor: 'transparent'
                    }}
                >🗑️</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {question.options.map((opt, id) => (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                            width: '1.75rem',
                            textAlign: 'center'
                        }}>{String.fromCharCode(65 + id)}. </span>
                        <input 
                            type='checkbox'
                            checked={Array.isArray(question.answer) && question.answer.includes(id)}
                            onChange={() => handleAnswerChange(id)}
                            style={{
                                width: '1rem',
                                height: '1rem'
                            }}
                        />
                        <input 
                            type='text'
                            value={opt}
                            onChange={e => optionChange(id, e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                        />
                        <button 
                            title='删除选项'
                            type={'button'}
                            onClick={() => optionDelete(id)}
                            style={{
                                padding: '0.5rem',
                                color: '#9ca3af',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                border: 'none',
                                backgroundColor: 'transparent'
                            }}
                        >✖️</button>
                    </div>
                ))}
                <button 
                    title="增加选项" 
                    type={'button'} 
                    onClick={optionAdd}
                    style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        color: '#2563eb',
                        backgroundColor: 'transparent',
                        borderRadius: '0.375rem',
                        border: '1px solid #93c5fd',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >➕</button>
            </div>
        </div>
    );
}