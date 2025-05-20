import React from "react";
import Helmet from 'react-helmet';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from "react-hook-form";
import {Navigate, useNavigate} from 'react-router-dom';
import {registerAsync} from "../store/authSlice.js";


export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,token}=useSelector(state=>state.auth);
    const {register,handleSubmit,watch,formState:{errors}} = useForm();
    const password=watch('password','');
    const onSubmit=data=>{
        const {username,password} = data
        dispatch(registerAsync({username,password}))
            .unwrap()
        .then(()=>{
            navigate('/surveylist');
        })
        .catch(msg=>{
            console.log('注册失败',msg);
        })
    }
    if(token){
        return(<Navigate to='/surveylist' replace />)
    }
    return (
        <div style={{textAlign:'center'}}>
            <Helmet>
                <title>注册页</title>
            </Helmet>
                <h1>注册页</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>姓名：</label>
                        <input {...register('username',{required:'请输入姓名',pattern:{value:/^[\u4e00-\u9fa5]{2,}$/,message:'姓名至少为两个中文字符'}})}/>
                    {errors.username && (<p style={{color:"red"}}>{errors.username.message}</p>)}
                </div>
                <div>
                    <label>密码：</label>
                        <input type='password' {...register('password',{required:'请输入密码',pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,message:'密码至少8位，且包含大写字母、小写字母和数字'}})}/>
                    {errors.password && (<p style={{color:"red"}}>{errors.password.message}</p>)}
                </div>
                <div>
                    <label>确认密码：</label>
                        <input type="password" {...register('confirm',{required:'请再次输入密码',validate:value=>value===password||'两次输入的密码不一致'})}/>
                    {errors.confirm && (<p style={{color:"red"}}>{errors.confirm.message}</p>)}
                </div>
                <button type="submit" disabled={loading}>
                    {loading?'提交中...':'注册'}
                </button>
            </form>
        </div>

    )
}