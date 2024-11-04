import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const fetchData = createAsyncThunk('data/users', async ()=> {
        try{
            const response = await axios.get('http://localhost:3001/api/users');
            return response.data;

        }catch(error:any){
            console.error(error);
            return Promise.reject(error.response?.data || "error response")
        }
})

export const deleteData = createAsyncThunk('data/deleteusers', async (id: string)=> {
    try{
        const response = await axios.delete('http://localhost:3001/api/users/delete/'+id);
        return response.data;

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response?.data || "error response")
    }
})
interface userCreate  {
    username: string,
    password: string,
    email: string,
    isAdmin: string
}

export const createData = createAsyncThunk('data/createuser', async (values: userCreate)=> {
    try{
        const response = await axios.post('http://localhost:3001/api/users/create', values);
        return response.data;

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response?.data || "error response")
    }
})

interface update2 {
    id: string;
    values:{
        _id:string,
        username: string,
        password: string,
        email: string,
        isAdmin: string
    }
}


export const updateData = createAsyncThunk<any,update2>('data/updateuser', async ({id, values})=> {
    try{
        const response = await axios.patch(`http://localhost:3001/api/users/update/${id}`, values);
        return response.data;

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response?.data || "error response")
    }
})
interface users {
    _id: string,
    username: string,
    password: string,
    email: string,
    isAdmin: string
}

interface usersState  {
    loading: boolean | null,
    data: users[] ,
    error: string | number | null | boolean
}

const initialState: usersState={
    loading: false,
    data: [],
    error: null

}

export const dataSlice = createSlice({
    name:'data',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
            builder.addCase(fetchData.pending, (state, action) => {
                    state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(createData.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(deleteData.fulfilled, (state, action) => {
               state.data = state.data.filter((user) => user._id !== action.payload.id)
            })
            .addCase(updateData.fulfilled, (state, action) => {
                const updateDatas2 = state.data.map((user) => user._id === action.payload.id ? action.payload : user)
                return {...state, data: updateDatas2}
            })
    }
    
})


export default dataSlice.reducer