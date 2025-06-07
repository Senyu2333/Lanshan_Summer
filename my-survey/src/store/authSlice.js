import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login ,register,createSurvey} from '../api'
export const registerAsync=createAsyncThunk(
    'auth/register',
    async (creds,{rejectWithValue}) => {
        const res = await register(creds);
        if(res.code!==0){
            return rejectWithValue(res.message)
        }
        return res.data;
    }
)

export const loginAsync=createAsyncThunk(
    'auth/login',
    async (creds,{rejectWithValue}) => {
        const res=await login(creds);
        if(res.code!==0){
            return rejectWithValue(res.message);
        }
        return res.data;
    }

    )

export const createAsync=createAsyncThunk(
    'auth/commit',
    async (e,{rejectWithValue,getState}) => {

        const {user}=getState().auth;
        if(!user){
            return rejectWithValue("用户未登录!");
        }
        const updatedUser={
            ...e,
            creator:user.username,
        }
        const res=await createSurvey(updatedUser);
        if(res.code!==0){
            return rejectWithValue(res.message)
        }
        return res.data
    }
)
const slice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null,
        surveys:[]
    },
    reducers:{
    loggedIn(state, action){
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
        logout(state){
            state.user=null;
            state.token=null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerAsync.pending,s =>{s.loading=true;s.error=null})
            .addCase(registerAsync.fulfilled,(s,a)=>{
                s.loading=false;
                s.user=a.payload;
                s.token=a.payload.token;
            })
            .addCase(registerAsync.rejected,(s,a)=>{
                s.loading=false;
                s.error=a.payload||a.error.message;
            })
            .addCase(loginAsync.pending,s => {s.loading=true;s.error=null})
            .addCase(loginAsync.fulfilled,(s,a) => {
                s.loading=false;
                s.user=a.payload;
                s.token=a.payload.token;
                localStorage.setItem('user',JSON.stringify(a.payload));
                localStorage.setItem('token',a.payload.token);
            })
            .addCase(loginAsync.rejected,(s,a) => {
            s.loading=false;
            s.error=a.payload||a.error.message;})
            .addCase(createAsync.pending,s =>{s.loading=true;s.error=null})
            .addCase(createAsync.fulfilled,(s,a) => {
                s.loading=false;
                s.surveys.push(a.payload);
            })
            .addCase(createAsync.rejected,(s,a) => {
                s.loading=false;
                s.error=a.payload||a.error.message;
            })
    }
});
export const {logout,loggedIn}=slice.actions;
export default slice.reducer;