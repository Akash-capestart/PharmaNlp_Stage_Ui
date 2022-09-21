import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllArticles, fetchArticlesByKeyWords } from "../actions/ArticlesActions"

type InitialStateProps = {
    articles: null | any, 
    activeArticle : null | any,
    activeArticleId : null | any,
    selectedArticles: string[],
    activePage : number,
    searchKeyWord : null | string,
    articleViewContainerLoading : boolean
}

const initialState: InitialStateProps = {
    articles: null,     
    activeArticle : null,
    activeArticleId : null,
    selectedArticles : [],
    activePage : 0,
    searchKeyWord : null,
    articleViewContainerLoading : false
}

const ArticlesSlice = createSlice({
    name: "articlesSlice",
    initialState,
    reducers: {
        removeArticles: (state) => {
            return {
                ...state,
                articles: null, 
                activePage : 0               
            }
        },
        addActiveArticle : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                activeArticle : action["payload"]["activeArticle"],
                activeArticleId : action["payload"]["activeArticleId"]
            }
        },
        addActivePageNumber : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                activePage : action["payload"]["activePage"]
            }
        },
        addSearchKeyWord : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                searchKeyWord : action["payload"]["searchKeyWord"],
                activePage : 0
            }
        }, 
        addArticlesToSelected : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                selectedArticles : action["payload"]
            }
        }
    },
    extraReducers: (builder) => {

        //fetchAllArticles action!!!

        builder.addCase(fetchAllArticles.pending, (state, action: PayloadAction<any>) => {            
            state.articleViewContainerLoading = true
        })
        builder.addCase(fetchAllArticles.fulfilled, (state, action: PayloadAction<any>) => {
            state.articles = action["payload"]
            state.searchKeyWord = null
            state.articleViewContainerLoading = false
        })
        builder.addCase(fetchAllArticles.rejected, (state) => {
            state.articles = null
        })

        //fetchArticlesByKeyWords action!!!

        builder.addCase(fetchArticlesByKeyWords.pending, (state, action: PayloadAction<any>) => {
            state.articleViewContainerLoading = true
        })
        builder.addCase(fetchArticlesByKeyWords.fulfilled, (state, action: PayloadAction<any>) => {
            state.activeArticleId = null
            state.articles = action["payload"]
            state.articleViewContainerLoading = false
        })
        builder.addCase(fetchArticlesByKeyWords.rejected, (state) => {
            state.activeArticleId = null
            state.articles = null
        })
    },
})

export const { removeArticles,addActiveArticle,addActivePageNumber,addSearchKeyWord,addArticlesToSelected } = ArticlesSlice.actions;
export default ArticlesSlice.reducer;