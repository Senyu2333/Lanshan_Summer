import React, { useState, useEffect } from "react";

export default function Score({ question, onChange, onDelete, viewOnly=false, namePrefix="" }) {
    const { title = "" } = question;
    const [scores, setScores] = useState(question.answer || {});
    const [scoreOptions, setScoreOptions] = useState(question.scoreOptions || [0, 2, 4, 6, 8, 10]);

    const handleTitleChange = e => {
        onChange({
            ...question,
            title: e.target.value
        });
    };

    const handleScoreOptionChange = (index, value) => {
        const newScoreOptions = [...scoreOptions];
        newScoreOptions[index] = parseInt(value) || 0;
        setScoreOptions(newScoreOptions);
        onChange({
            ...question,
            scoreOptions: newScoreOptions
        });
    };

    const handleScoreChange = (score) => {
        if (viewOnly) return;
        setScores({ 0: score });
        onChange({
            ...question,
            answer: { 0: score }
        });
    };
    if (onDelete !== undefined && !viewOnly) {
        return (
            <div style={{
                border: '1px solid #e5e7eb',
                padding: '1.25rem',
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb',
                marginBottom: '1rem'
            }}>
                <button
                    onClick={onDelete}
                    title="删除此题"
                    type="button"
                    style={{
                        float: 'right',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: '0.25rem',
                        color: '#9ca3af'
                    }}
                >
                    🗑️
                </button>
                <div style={{ marginBottom: '1rem' }}>
                    <textarea
                        placeholder="请输入题干信息"
                        value={title}
                        onChange={handleTitleChange}
                        style={{
                            width: '100%',
                            minHeight: '40px',
                            padding: '0.75rem',
                            resize: 'none',
                            borderRadius: '0.5rem',
                            border: '1px solid #d1d5db',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        }}
                    />
                </div>
                <div style={{
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        设置分值选项：
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {scoreOptions.map((score, index) => (
                            <input
                                key={index}
                                type="number"
                                value={score}
                                onChange={(e) => handleScoreOptionChange(index, e.target.value)}
                                style={{
                                    width: '4rem',
                                    padding: '0.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    textAlign: 'center'
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1rem'
                }}>
                    预览：
                </div>
                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    backgroundColor: '#ffffff'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center'
                    }}>
                        {scoreOptions.map((score, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9fafb',
                                    color: '#374151'
                                }}
                            >
                                {score}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div style={{ margin: '1rem 0' }}>
            <div style={{
                border: '1px solid #e5e7eb',
                padding: '1.25rem',
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb'
            }}>
                <div style={{
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '0.625rem',
                    marginBottom: '0.625rem'
                }}>
                    <h3 style={{
                        margin: '0 0 0.625rem 0',
                        fontWeight: '500',
                        color: '#111827'
                    }}>{title || '题干'}</h3>
                </div>
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    padding: '0.5rem 0'
                }}>
                    {(question.scoreOptions || scoreOptions).map((score, index) => {
                        const isSelected = scores[0] === score;
                        return (
                            <div
                                key={index}
                                onClick={() => !viewOnly && handleScoreChange(score)}
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    border: '1px solid #d1d5db',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: viewOnly ? 'default' : 'pointer',
                                    backgroundColor: isSelected ? '#86efac' : 'white',
                                    color: isSelected ? '#166534' : '#374151',
                                    borderRadius: '0.375rem',
                                    transition: 'all 0.2s',
                                    userSelect: 'none',
                                    opacity: viewOnly ? 0.7 : 1
                                }}
                            >
                                {score}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
