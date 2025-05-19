import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login ,register} from '../api'
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

const slice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null
    },
    reducers:{
        logout(state){
            state.user=null;
            state.token=null
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerAsync.pending,s =>{s.loding=true;s.error=null})
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
            })
            .addCase(loginAsync.rejected,(s,a) => {
            s.loading=false;
            s.error=a.payload||a.error.message;
        });
    }
});
export const {logout}=slice.actions;
export default slice.reducer;