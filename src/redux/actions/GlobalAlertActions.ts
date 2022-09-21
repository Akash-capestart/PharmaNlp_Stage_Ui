import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPost } from "../../dataFetchingHelpers/fetchActions";

type CredentialProps = {
    phone_no: string,
    password: string
}

export const doGlobalAlertAction = createAsyncThunk(
    'globalAlertAction/doGlobalAlertAction',
    async ({endUrl,credential} : {endUrl : string, credential: CredentialProps}) =>{
        const response = await FetchPost(endUrl,credential)
        return response
    }
)