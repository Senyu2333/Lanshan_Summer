import Mock from 'mockjs'
Mock.mock('/api/login','post',({body})=>{
    const {username}=JSON.parse(body);
    return{
        code:0,
        data:{
            id:'ul',
            username,
            token:'fake-token'
        }
    }
})
Mock.mock('/api/register','post',({body})=>{
    const {username}=JSON.parse(body);
    if (username==="taken"){
        return{code:1,message:"用户名已被占用"}
    }
    return {
        code:0,
        data:{
            id:Mock.mock('@guid'),
            username,
            token:'fake-token'
        }
    }


})