import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useForm} from "react-hook-form";
import {loginAsync} from "../store/authSlice.js";
import {useNavigate} from "react-router-dom";
import {unwrapResult} from "@reduxjs/toolkit";

export default function LoginPage() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {loading,error,token} = useSelector((state) => state.auth);
    const {register, handleSubmit} = useForm();
    const onSubmit=data=>{
        dispatch(loginAsync(data))
        .unwrap()
        .then(()=>{
            navigate('/');
        })
        .catch(msg=>{
            console.log("登录失败",msg);
        });
    };
        if(token){
            navigate('/');
            return null;
        }
    return(
        <div style={{textAlign:'center'}}>
            <h1>登录页</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>用户名：</label>
                    <input {...register('username')} required/>
                </div>
                <div>
                    <label>密码：</label>
                    <input {...register('password')} required/>
                </div>
                <button type="submit" disabled={loading}>
                    {loading?'加载中':'登录'}
                </button>
                </form>
                {error&&<p style={{color:'red'}}>错误：{error}</p>}
        </div>
    );
}