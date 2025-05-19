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
