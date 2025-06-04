import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Pie from '../components/Pie';

export default function SurveyResultPage() {
    const { id } = useParams();
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`http://localhost:3000/surveys/${id}`)
            .then(res => {
                setSurvey(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const calculateResults = (question) => {
        const totalResponses = survey.results.length;
        const answers = survey.results.map(result => 
            result.answers.find(a => String(a.id) === String(question.id))?.answer
        ).filter(a => a !== undefined);

        switch (question.type) {
            case 'single':
            case 'multi': {
                const optionCounts = {};
                question.options.forEach((_, idx) => {
                    optionCounts[idx] = 0;
                });
                answers.forEach(answer => {
                    if (Array.isArray(answer)) {
                        answer.forEach(choice => {
                            optionCounts[choice] = (optionCounts[choice] || 0) + 1;
                        });
                    } else {
                        optionCounts[answer] = (optionCounts[answer] || 0) + 1;
                    }
                });
                return Object.entries(optionCounts).map(([optionIdx, count]) => {
                    const percentage = ((count / totalResponses) * 100).toFixed(1);
                    return `${String.fromCharCode(65 + parseInt(optionIdx))}: ${percentage}%`;
                }).join('  ');
            }
            case 'score': {
                const scoreCounts = {};
                answers.forEach(answer => {
                    const score = answer[0];
                    scoreCounts[score] = (scoreCounts[score] || 0) + 1;
                });
                return Object.entries(scoreCounts).map(([score, count]) => {
                    const percentage = ((count / totalResponses) * 100).toFixed(1);
                    return `${score}分: ${percentage}%`;
                }).join('  ');
            }
            case 'blank':
            case 'locate': {
                return answers.map((answer, idx) => {
                    if (question.type === 'locate') {
                        return `答案${idx + 1}: (经度:${answer.longitude.toFixed(4)}, 纬度:${answer.latitude.toFixed(4)})`;//司马百度地图只有4位精度
                    }
                    return `${user}: ${answer}`;
                }).join('\n');
            }

        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f4f6'
            }}>
                <p style={{
                    fontSize: '1.125rem',
                    color: '#6b7280'
                }}>结果加载中...</p>
            </div>
        );
    }

    if (!survey) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1>问卷不存在</h1>
            </div>
        );
    }
    const results=Array.isArray(survey.results)?survey.results:[];
    if(results.length===0){
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                color: '#4b5563',
                fontSize: '1.25rem'
            }}>
                <p>暂无结果喵，再耐心等等吧~</p>
            </div>
        )
    }
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem'
        }}>
            <Helmet>
                <title>问卷结果 - {survey.title}</title>
            </Helmet>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    color: '#111827'
                }}>{survey.title}</h1>

                <p style={{
                    textAlign: 'center',
                    color: 'green',
                    marginBottom: '2rem'
                }}>
                    答卷数：{survey.results?.length || 0}
                </p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'

                }}>
                    {survey.questions.map((question, idx) => (
                        <div key={question.id} style={{
                            backgroundColor: '#f9fafb',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{
                                marginBottom: '1rem'
                            }}>
                                <span>第{idx + 1}题</span>
                                <span style={{color: '#3b82f6'}}>
                                    【{{
                                        single: '单选题',
                                        multi: '多选题',
                                        blank: '填空题',
                                        score: '打分题',
                                        locate: '定位题',
                                        dropdown: '下拉框题'
                                    }[question.type]}】
                                </span>
                            </div>

                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                marginBottom: '1rem'
                            }}>{question.title}</h3>

                            {question.type === 'single' || question.type === 'multi' ? (
                                <div style={{marginBottom: '1rem'}}>
                                    <div style={{color: '#4b5563', marginBottom: '0.5rem'}}>选项：</div>
                                    {question.options.map((opt, idx) => (
                                        <div key={idx} style={{marginLeft: '1rem', color: '#6b7280'}}>
                                            {String.fromCharCode(65 + idx)}. {opt}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                backgroundColor: 'white',
                                borderRadius: '0.5rem',
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{color: '#4b5563', marginBottom: '0.5rem'}}>统计结果：</div>
                                {question.type === 'single' ? (
                                    <Pie
                                        domId={`pie-chart-${question.id}`}
                                        options={question.options}
                                        answers={survey.results.map(result => 
                                            result.answers.find(a => String(a.id) === String(question.id))?.answer
                                        ).filter(a => a !== undefined)}
                                        title={question.title}
                                    />
                                ) : (
                                    <pre style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        color: 'green',
                                        marginLeft: '1rem',
                                        fontWeight: 'bold',
                                        fontSize: '20px'
                                    }}>
                                        {calculateResults(question)}
                                    </pre>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}