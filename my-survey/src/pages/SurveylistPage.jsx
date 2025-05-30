import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";

const SurveylistPage = () => {
    const [surveys, setSurvey] = useState([])
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    useEffect(()=>{
        Axios.get('http://localhost:3000/surveys')
            .then(res=>{
                setSurvey(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])
    const surveyDelete=async(id)=>{
        const currentSurvey=surveys.find(s => s.id === id)
        if(currentSurvey.creator!==user.username){
            alert('⚠️ 你没有权限!');
            return;
        }
        const confirmDelete=window.confirm("⚠️ 确定要删除这个问卷吗？删除后将无法恢复！")
        if(!confirmDelete) return
        try{
            await Axios.delete(`http://localhost:3000/surveys/${id}`)
            setSurvey(prev=>prev.filter(e=>e.id!==id))
            alert(`问卷已经删除!`)
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div style={{
            textAlign: 'center',
            padding: '2rem'
        }}>
            <Helmet>
                <title>问卷列表</title>
            </Helmet>
            <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '2rem'
            }}>问卷列表</h1>
            
            <button 
                type={'button'} 
                onClick={()=>navigate('/edit')}
                style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '0.75rem',
                    border: 'none',
                    marginBottom: '2rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
            >
                创建问卷
            </button>
            
            <form>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'grid',
                    gap: '1rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    {surveys.length === 0 &&<p>还没有问卷哦</p>}
                    {surveys.map(survey=>(
                        <li key={survey.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            padding: '1.5rem',
                            border: '1px solid #e5e7eb',
                            transition: 'box-shadow 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '1rem'
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    color: '#111827',
                                    marginBottom: '0.5rem',
                                    cursor: 'pointer'
                                }}>{survey.title}</h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280'
                                }}>创建人: {survey.creator}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem'
                            }}>
                                <button 
                                    type='button' 
                                    onClick={()=>navigate(`/write/${survey.id}`)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem 0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >查看</button>
                                <button 
                                    type='button'
                                    onClick={()=>surveyDelete(survey.id)}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem 0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        color: '#dc2626',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >删除</button>
                                <button 
                                    type='button'
                                    onClick={()=>{survey.creator===user.username?navigate(`/result/${survey.id}`):navigate(`/403`)}}
                                        style={{
                                        flex: 1,
                                        padding: '0.5rem 0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        color: '#059669',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >结果</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default SurveylistPage;