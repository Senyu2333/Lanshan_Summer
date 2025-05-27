import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from "react-hook-form";
import {Navigate, useNavigate} from 'react-router-dom';
import {registerAsync} from "../store/authSlice.js";
import {Helmet} from "react-helmet";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,token,error}=useSelector(state=>state.auth);
    const {register,handleSubmit,watch,formState:{errors}} = useForm();
    const password=watch('password','');
    
    const onSubmit=data=>{
        const {username,password} = data;
        dispatch(registerAsync({username,password}))
            .unwrap()
            .then(()=>{
                navigate('/login');
            })
            .catch(msg=>{
                console.log('注册失败',msg);
            })
    }
    
    if(token){
        return(<Navigate to='/surveylist' replace />)
    }
    
    return (
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
                <title>注册</title>
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
                }}>注册账号</h1>
                
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
                            {...register('username', {
                                required: '用户名是必填项',
                                minLength: {
                                    value: 3,
                                    message: '用户名至少需要3个字符'
                                }
                            })}
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                        {errors.username && (
                            <p style={{
                                color: '#dc2626',
                                fontSize: '0.75rem',
                                marginTop: '0.25rem'
                            }}>{errors.username.message}</p>
                        )}
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
                            type="password"
                            {...register('password', {
                                required: '密码是必填项',
                                minLength: {
                                    value: 6,
                                    message: '密码至少需要6个字符'
                                }
                            })}
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                        {errors.password && (
                            <p style={{
                                color: '#dc2626',
                                fontSize: '0.75rem',
                                marginTop: '0.25rem'
                            }}>{errors.password.message}</p>
                        )}
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
                        }}>确认密码</label>
                        <input 
                            type="password"
                            {...register('confirmPassword', {
                                required: '请确认密码',
                                validate: value => value === password || '两次输入的密码不匹配'
                            })}
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                        {errors.confirmPassword && (
                            <p style={{
                                color: '#dc2626',
                                fontSize: '0.75rem',
                                marginTop: '0.25rem'
                            }}>{errors.confirmPassword.message}</p>
                        )}
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
                        {loading ? '注册中...' : '注册'}
                    </button>
                </form>
                
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

export default RegisterPage;