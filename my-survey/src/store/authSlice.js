import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login as loginApi} from '../api'

export const loginAsync=createAsyncThunk(
    'auth/login',
    async (creds,{rejectWithValue}) => {
        const res=await loginApi.login(creds);
        
    }
)