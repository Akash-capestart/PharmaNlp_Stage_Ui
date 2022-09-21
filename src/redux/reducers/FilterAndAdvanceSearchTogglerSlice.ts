import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
    activeContent : string,
    advanceSearchContentHeight: number,
    advanceSearchContentRefHeight : number,
    filteringContentHeight: number,
    filteringContentRefHeight: number,
    howMuchToScrollTop: number,
    scrollBehaviour: string
}

type SetCurrentTogglerToFilterOrAdvanceSearch = {
    activeContent : string,
    advanceSearchContentHeight: number,    
    filteringContentHeight: number,    
    howMuchToScrollTop: number,
    scrollBehaviour: string
}

const initialState: InitialStateProps = {
    activeContent : "",
    advanceSearchContentHeight: 0,
    advanceSearchContentRefHeight : 0,
    filteringContentHeight: 0,
    filteringContentRefHeight: 0,
    howMuchToScrollTop: 0,
    scrollBehaviour: "auto"
}

const FilterAndAdvanceSearchTogglerSlice = createSlice({
    name: "filterAndAdvanceSearchTogglerSlice",
    initialState,
    reducers: {
        setCurrentTogglerToFilterOrAdvanceSearch : (state, action: PayloadAction<SetCurrentTogglerToFilterOrAdvanceSearch>) => {
            return {
                ...state,
                activeContent : action["payload"]["activeContent"],
                advanceSearchContentHeight: action["payload"]["advanceSearchContentHeight"],
                filteringContentHeight: action["payload"]["filteringContentHeight"],
                howMuchToScrollTop: action["payload"]["howMuchToScrollTop"],
                scrollBehaviour: action["payload"]["scrollBehaviour"]                               
            }
        },
        setContentRefHeight : (state, action: PayloadAction<any>) => {
            return {
                ...state,
                filteringContentRefHeight : action["payload"]["filteringContentRefHeight"],
                advanceSearchContentRefHeight : action["payload"]["advanceSearchContentRefHeight"]
            }
        }
    }
})

export const { setCurrentTogglerToFilterOrAdvanceSearch,setContentRefHeight } = FilterAndAdvanceSearchTogglerSlice.actions;
export default FilterAndAdvanceSearchTogglerSlice.reducer;