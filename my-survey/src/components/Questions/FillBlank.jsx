import React from 'react';

export default function FillBlank({question, onChange, onDelete, viewOnly=false}) {
    const handleAnswerChange = (e) => {
        onChange({
            ...question,
            answer: e.target.value
        });
    }

    const titleChange = e => {
        onChange({...question, title: e.target.value});
    }

    if (viewOnly) {
        return (
            <div style={{ margin: '1rem 0' }}>
                <p style={{
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                }}>{question.title}</p>
                <textarea 
                    placeholder="请输入您的答案"
                    value={question.answer || ''}
                    disabled={viewOnly}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        resize: 'vertical',
                        backgroundColor: viewOnly ? '#f3f4f6' : 'white',
                        cursor: viewOnly ? 'default' : 'text'
                    }}
                />
            </div>
        );
    }

    if (!onDelete) {
        return (
            <div style={{ margin: '1rem 0' }}>
                <p style={{
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                }}>{question.title}</p>
                <textarea 
                    placeholder="请输入您的答案"
                    value={question.answer || ''}
                    onChange={handleAnswerChange}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        resize: 'vertical'
                    }}
                />
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
                    type={'button'} 
                    onClick={onDelete}
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
            <div>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                }}>答题区预览:</p>
                <textarea 
                    placeholder="用户将在此处作答"
                    disabled
                    style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9fafb',
                        cursor: 'not-allowed',
                        resize: 'none'
                    }}
                />
            </div>
        </div>
    );
}