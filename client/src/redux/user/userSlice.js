import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    val:null,
    PasswordReset:null,
    post:null,
    // QueryRes:false,
    // alluser:null
  };
  
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false;
            state.error=false;
            
        },
        signInFailure:(state,action)=>{
         
            state.loading=false;
            state.error=action.payload;
        },
        updateUserStart:(state)=>{
           state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
         },
         updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
         },
         deleteUserStart: (state) => {
            state.loading = false;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          SignOut:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
          },
          otpData:(state,action)=>{
            state.val=action.payload
          },
          PasswordResetStart:(state)=>{
             state.loading=true,
             state.error=false
          },
          PasswordResetProcess:(state,action)=>{
            state.val=action.payload,
             state.loading=true,
             state.error=false
          },
          PasswordResetFailure:(state)=>{
            state.error=true;
            state.loading=false
          },
          PasswordResetSuccess:(state)=>{
            state.error=false;
            state.loading=false
          },
          QuerytStart:(state)=>{
            state.loading=true,
            state.error=false
         },
          QueryResponse:(state,action)=>{
            state.QueryRes=action.payload
            state.loading=false,
            state.error=false
             
          },
          QuerytFailure:(state)=>{
            state.loading=false,
            state.error=true
         },
         postDetails:(state,action)=>{
          state.post=action.payload
         }
        
    }
});
export const{postDetails,QuerytFailure,QuerytStart, QueryResponse,PasswordResetSuccess,PasswordResetStart,PasswordResetFailure,otpData,SignOut,PasswordResetProcess,deleteUserFailure,deleteUserSuccess,deleteUserStart,signInFailure,signInStart,signInSuccess,updateUserFailure,updateUserSuccess,updateUserStart}=userSlice.actions;
export default userSlice.reducer;