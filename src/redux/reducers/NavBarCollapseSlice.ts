import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
    sideBarPinned: boolean,
}

const initialState: InitialStateProps = {
    sideBarPinned: false,    
};

const NavBarCollapseSlice = createSlice({
    name: "navBarCollapseSlice",
    initialState,
    reducers: {
        setsideBarPinned: (state,action:PayloadAction<boolean>) => {
            return {
              ...state,
              sideBarPinned : action["payload"]
            };
          },
    },
});

export const { setsideBarPinned } = NavBarCollapseSlice.actions;
export default NavBarCollapseSlice.reducer;
