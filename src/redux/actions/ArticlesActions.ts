import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchGet } from "../../dataFetchingHelpers/fetchActions";

export const fetchAllArticles = createAsyncThunk(
    'ActiclesAction/fetchAllArticles',
    async ({endUrl} : {endUrl : string}) =>{
        const response = await FetchGet(endUrl)
        return response
    }
)

export const fetchArticlesByKeyWords = createAsyncThunk(
    'ActiclesAction/fetchArticlesByKeyWords',
    async ({endUrl} : {endUrl : string}) =>{
        const response = await FetchGet(endUrl)
        return response
    }
)