import React from "react";
import { NavBar } from "../components/common/NavBar";
import { SideMenu } from "../components/common/SideMenu";
import { ArticlesViewContainer } from "../components/homePage/ArticlesViewContainer";
import { SearchSection } from "../components/common/SearchSection";
import { useAppSelector } from "../redux/Hooks";

export function Home() {

  const { innerWidth } = window
  const { sideBarPinned } = useAppSelector(state => state.navBarPinnedDetails)

  return (
    <div className="h-100vh d-flex">
      <div className="w-100 d-flex">
        <div className="h-100vh position-relative width-animation side-menu" style={{ width: !sideBarPinned ? "15%" : 50 }}>
          <SideMenu sideBarPinned={sideBarPinned} />
        </div>
        <div className="h-100vh width-animation" style={{ width: !sideBarPinned ? "85%" : (innerWidth - 50) }}>
          <NavBar />
          <SearchSection />
          <div className="white-background">
            <ArticlesViewContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
