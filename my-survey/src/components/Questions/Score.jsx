import React, { useState } from "react";
import { useEffect } from "react";

export default function Score({ question, onChange, onDelete, viewOnly=false, namePrefix="" }) {
    const { title = "", cells = [] } = question;
    const [scores, setScores] = useState({});

    const authChange=(up)=>{
        if(!viewOnly && onChange){
            onChange(up);
        }
    }

    useEffect(() => {
        if (cells.length > 10) {
            alert("打分题格子不宜超过 10 个！");
            // 如果超过10个，自动截取前10个
            const newCells = cells.slice(0, 10);
            authChange({ ...question, cells: newCells });
        }
    }, [cells]);

    const handleTitleChange = e => {
        authChange({ ...question, title: e.target.value });
    };

    const addCell = () => {
        if (cells.length >= 10) {
            alert("打分题格子不宜超过 10 个！");
            return;
        }
        authChange({ ...question, cells: [...cells, ""] });
    };

    const removeCell = idx => {
        const newCells = cells.filter((_, i) => i !== idx);
        authChange({ ...question, cells: newCells });
    };

    const changeCell = (idx, value) => {
        const newCells = [...cells];
        newCells[idx] = value;
        authChange({ ...question, cells: newCells });
    };

    const handleScoreChange = (cellIndex, score) => {
        setScores(prev => ({
            ...prev,
            [cellIndex]: score
        }));
    };

    if(viewOnly){
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
                        alignItems: 'center',
                        padding: '0.625rem 0'
                    }}>
                        <span style={{ 
                            marginRight: '1.25rem',
                            color: '#374151',
                            fontSize: '0.875rem'
                        }}>评分：</span>
                        <div style={{
                            display: 'flex',
                            gap: '0.25rem',
                            flex: 1,
                            overflowX: 'auto',
                            padding: '0.5rem 0'
                        }}>
                            {[1,2,3,4,5].map(score => (
                                <div
                                    key={score}
                                    onClick={() => handleScoreChange(0, score)}
                                    style={{
                                        minWidth: '2.5rem',
                                        height: '2.5rem',
                                        border: '1px solid #d1d5db',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: scores[0] === score ? '#93c5fd' : 'white',
                                        color: scores[0] === score ? '#1e40af' : '#374151',
                                        borderRadius: '0.375rem',
                                        transition: 'all 0.2s',
                                        userSelect: 'none'
                                    }}
                                >
                                    {score}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                display: 'flex', 
                alignItems: 'center',
                overflowX: 'auto',
                padding: '0.5rem 0'
            }}>
                <table style={{ 
                    borderCollapse: 'collapse', 
                    width: '100%',
                    minWidth: cells.length > 5 ? '800px' : 'auto'
                }}>
                    <tbody>
                        <tr>
                            {cells.map((cell, idx) => (
                                <td key={idx}
                                    style={{
                                        padding: '0.5rem',
                                        border: '1px solid #e5e7eb',
                                        textAlign: 'center',
                                        minWidth: '100px'
                                    }}>
                                    <input 
                                        type="text" 
                                        value={cell} 
                                        placeholder={`第 ${idx + 1} 项`}
                                        onChange={e => changeCell(idx, e.target.value)}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            outline: 'none',
                                            textAlign: 'center',
                                            backgroundColor: 'transparent',
                                            fontSize: '0.875rem'
                                        }}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeCell(idx)} 
                                        title="删除本项"
                                        style={{
                                            marginLeft: '0.25rem',
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            padding: '0.25rem',
                                            color: '#9ca3af'
                                        }}
                                    >
                                        ✖️
                                    </button>
                                </td>
                            ))}
                            <td style={{ 
                                verticalAlign: 'middle', 
                                paddingLeft: '0.5rem',
                                minWidth: '50px'
                            }}>
                                <button
                                    onClick={addCell}
                                    title="增加一项"
                                    type="button"
                                    style={{
                                        cursor: cells.length >= 10 ? 'not-allowed' : 'pointer',
                                        border: 'none',
                                        background: 'none',
                                        padding: '0.25rem',
                                        color: cells.length >= 10 ? '#9ca3af' : '#3b82f6'
                                    }}
                                >
                                    ➕
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
