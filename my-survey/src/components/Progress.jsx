import React from "react";
export default function Progress({finished, total}) {
    const percent = total > 0 ? Math.floor((finished / total) * 100) : 0;
    
    return (
        <div style={{
            position: 'fixed',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '200px',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
        }}>
            <h3 style={{
                fontSize: '1rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151',
                textAlign: 'center'
            }}>当前进度</h3>
            
            <div style={{
                width: '100%',
                height: '1rem',
                backgroundColor: '#e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${percent}%`,
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    transition: 'width 0.3s ease'
                }}/>
            </div>

            {finished === total && total > 0 ? (
                <div style={{textAlign: 'center',
                    marginTop: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.875rem'}}>
                    你完成了所有题目！
                </div>
            ) : (
                <div style={{textAlign: 'center',
                    marginTop: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.875rem'}}>
                    {finished} / {total} 题 ({percent}%)
                </div>
            )}
        </div>
    );
}