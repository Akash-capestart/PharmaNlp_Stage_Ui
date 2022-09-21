import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ArticlesSlice from "./reducers/ArticlesSlice";
import GlobalAlertSlice from "./reducers/GlobalAlertSlice";
import GlobalFontResizingSlice from "./reducers/GlobalFontResizingSlice";
import UserSlice from "./reducers/UserSlice";
import NavBarCollapseSlice from "./reducers/NavBarCollapseSlice";
import FilterAndAdvanceSearchTogglerSlice from "./reducers/FilterAndAdvanceSearchTogglerSlice";

const reducer = combineReducers({
  globalFontResizer: GlobalFontResizingSlice,
  userDetails : UserSlice,
  globalAlert : GlobalAlertSlice,
  articlesDetails : ArticlesSlice,
  navBarPinnedDetails : NavBarCollapseSlice,
  filerAndAdvanceSearchTogglerDetails : FilterAndAdvanceSearchTogglerSlice,  
})

export const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
