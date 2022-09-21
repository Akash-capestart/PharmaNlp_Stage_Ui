import React, { useRef, useEffect, useCallback } from "react";
import { fetchAllArticles } from "../../redux/actions/ArticlesActions";
import { useAppSelector, useAppDispatch } from "../../redux/Hooks";
import { setContentRefHeight, setCurrentTogglerToFilterOrAdvanceSearch } from "../../redux/reducers/FilterAndAdvanceSearchTogglerSlice";
import { Loader } from "../common/Loader";
import { AdvanceSearchComponent } from "./AdvanceSearchComponent";
import { ArticlesCountDisplayer } from "./ArticlesCountDisplayer";
import { ArticleViewComponent } from "./ArticleViewComponent";
import { HomeFilteringComponent } from "./HomeFilteringComponent";

export function ArticlesViewContainer() {

  const dispatch = useAppDispatch()  
  const { articleViewContainerLoading, articles } = useAppSelector((state) => state.articlesDetails);  
  const { advanceSearchContentHeight, filteringContentHeight, activeContent, howMuchToScrollTop, scrollBehaviour } = useAppSelector((state) => state.filerAndAdvanceSearchTogglerDetails);

  const scrollToTopHandler = useCallback((howMuchToScrollTop: number, scrollBehaviour: string) => {
    if (scrollBehaviour === "smooth") { // this condition is used to delay the scrolling or the scrollToTopRef won't fully scrolled!!
      setTimeout(() => {
        scrollHandler(howMuchToScrollTop, scrollBehaviour);
      }, 400);
    } else {
      scrollHandler(howMuchToScrollTop, scrollBehaviour);
    }
  },[]);

  const scrollHandler = (howMuchToScrollTop: number, scrollBehaviour: string) => {
    scrollToTopRef.current.scrollTo({
      top: howMuchToScrollTop,
      behavior: scrollBehaviour,
    });
  }

  const { innerHeight } = window;

  useEffect(() => {     
    if(activeContent === ""){ // this condition is used to fetch the getAllArticles on starting only not after every render...      
      dispatch(fetchAllArticles({ endUrl: "/article/getAllArticles?page=0" }))  
    }
    dispatch(setContentRefHeight({filteringContentRefHeight: filteringContentRef.current.scrollHeight + 20,advanceSearchContentRefHeight: advanceSearchContentRef.current.scrollHeight +20}))  
    scrollToTopHandler(howMuchToScrollTop,scrollBehaviour) 
  }, [dispatch,scrollToTopHandler,howMuchToScrollTop,scrollBehaviour,activeContent])  

  const advanceSearchContentRef = useRef<HTMLDivElement>(null!);
  const filteringContentRef = useRef<HTMLDivElement>(null!);
  const scrollToTopRef = useRef<HTMLDivElement | any>(null!);

  const advanceSearchAndFilterShowHandler = ( // used to toggle and collapse the advance search and filter UI!!!
    key: string,
    howMuchToScrollTop: number,
    scrollBehaviour: string
  ) => {        
    if (key === "advanceSearchShow") {    
      dispatch(setCurrentTogglerToFilterOrAdvanceSearch({
        activeContent: key,
        advanceSearchContentHeight: 0,        
        filteringContentHeight: 0,        
        howMuchToScrollTop: howMuchToScrollTop,
        scrollBehaviour: scrollBehaviour,        
      }))
    } else if (key === "filteringShow") {
      dispatch(setCurrentTogglerToFilterOrAdvanceSearch({
        activeContent: key,
        advanceSearchContentHeight: 0,        
        filteringContentHeight: 0,        
        howMuchToScrollTop: howMuchToScrollTop,
        scrollBehaviour: scrollBehaviour,        
      }))
    }
    scrollToTopHandler(howMuchToScrollTop, scrollBehaviour);
  };    

  const collapseHandler = () => { // this function helps to find the which one is toggled? advance search or filter content!!!
    let toCollapse;
    if (
      advanceSearchContentHeight === 0 &&
      filteringContentHeight === 0
    ) {
      toCollapse = "";
    } else {
      toCollapse =
        advanceSearchContentHeight !== 0
          ? "advanceSearchShow"
          : "filteringShow";
    }
    return toCollapse;
  };

  return (
    <>      
      <div
        className="advance-search-container"
        style={{ height: innerHeight - 120 }}
        ref={scrollToTopRef}
      >
        <div
          ref={advanceSearchContentRef}
          className="smooth-height-animation"
          style={{
            height: advanceSearchContentHeight,
          }}
        >
          <AdvanceSearchComponent
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(activeContent, 0, "smooth")}
          />
        </div>
        <div
          ref={filteringContentRef}
          className="smooth-height-animation"
          style={{
            height: filteringContentHeight,
          }}
        >
          <HomeFilteringComponent
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(activeContent, 0, "smooth")}
          />
        </div>
        {articles && !articleViewContainerLoading ?
          <>
            {articles["data"].length > 0 ?
              <>
                <div className="pad-15">
                  <ArticlesCountDisplayer />
                </div>
                <div style={{ padding: "0px 15px 15px 15px" }}>
                  <ArticleViewComponent
                    articleViewHeight={innerHeight - 120}
                    advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(collapseHandler(), 110, "smooth")}
                    scrollToTopHandler={scrollToTopHandler}
                  />
                </div>
              </> :
              <div className="d-flex align-items-center justify-content-center h-100">
                <img src="images/no-result-found-image.png" alt="No Result..."/><p className="no-margin pad-l-15">No Result!!!</p>
              </div>}
          </> : <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <Loader
              size={60}
              activeColor={"#2BB24C"}
              inActiveColor={"#FFFFFF"}
              loaderBarWidth={"5px"}
            />            
          </div>
        }
      </div>    
    </>    
  );
}
