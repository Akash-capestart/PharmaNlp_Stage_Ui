import { createSlice } from "@reduxjs/toolkit"
import { doGlobalAlertAction } from "../actions/GlobalAlertActions"

type InitialStateProps = {
    loading : boolean,
    showAlert : boolean,
    alertMsg : string
}

const initialState : InitialStateProps = {
    loading : false,
    showAlert : false,
    alertMsg : ''
}

const GlobalAlertSlice = createSlice({
    name:"globalAlertSlice",
    initialState,
    reducers:{
        successAlertShow : (state) => {
            return{
                ...state,
                loading : false,
                showAlert : false,
                alertMsg : ""
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(doGlobalAlertAction.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(doGlobalAlertAction.fulfilled,(state) => {
            state.loading = false
            state.showAlert = true
            state.alertMsg = "Success"
        })
        builder.addCase(doGlobalAlertAction.rejected,(state)=>{
            state.loading = false
            state.showAlert = false
            state.alertMsg = "Failed"
        })
    }
})

export const {successAlertShow} = GlobalAlertSlice.actions;
export default GlobalAlertSlice.reducer;