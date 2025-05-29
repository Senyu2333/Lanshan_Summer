import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useForm} from "react-hook-form";
import {loginAsync} from "../store/authSlice.js";
import {useNavigate, Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useEffect} from "react";

export default function LoginPage() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {loading,error,token} = useSelector((state) => state.auth);
    const {register, handleSubmit} = useForm();

    const onSubmit=data=>{
        dispatch(loginAsync(data))
        .unwrap()
        .then((response)=>{
            console.log('登录成功，响应数据：', response);
            navigate('/surveylist');
        })
        .catch(msg=>{
            console.log("登录失败",msg);
        });
    };

    useEffect(()=>{
        console.log('当前 token:', token);
        if(token){
            console.log('跳转到问卷列表页面');
            navigate('/surveylist',{ replace: true });
        }else{
            console.log('没有 token，无法跳转');
        }
    },[token, navigate])

    return(
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            padding: '2rem'
        }}>
            <Helmet>
                <title>登录页</title>
            </Helmet>

            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#111827'
                }}>登录</h1>

                <form onSubmit={handleSubmit(onSubmit)} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <label style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151'
                        }}>用户名</label>
                        <input
                            {...register('username')}
                            required
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <label style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151'
                        }}>密码</label>
                        <input
                            {...register('password')}
                            type="password"
                            required
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {loading ? '登录中...' : '登录'}
                    </button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '1rem'
                }}>
                    <Link to="/register" style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontSize: '0.875rem'
                    }}>
                        没有账号？去注册
                    </Link>
                </div>

                {error && (
                    <p style={{
                        color: '#dc2626',
                        fontSize: '0.875rem',
                        marginTop: '1rem',
                        textAlign: 'center'
                    }}>
                        错误：{error}
                    </p>
                )}
            </div>
        </div>
    );
}