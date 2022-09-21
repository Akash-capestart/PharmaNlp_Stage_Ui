import React, { useState } from "react";
import { ArticleViewButtonSection } from "./ArticleViewButtonSection";
import { ArticlesListsSection } from "./ArticlesListsSection";
import { FullTextViewSection } from "./FullTextViewSection";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { addActiveArticle, addArticlesToSelected } from "../../redux/reducers/ArticlesSlice";
import { setsideBarPinned } from "../../redux/reducers/NavBarCollapseSlice";

type ArticleViewComponentProps = {
  articleViewHeight: number,  
  advanceSearchAndFilterShowHandler: Function
  scrollToTopHandler: Function
}

type ArticleViewContainerStateProps = {
  fullTextShow: boolean,
  articlesExpand: boolean, 
}

export function ArticleViewComponent({
  articleViewHeight,  
  advanceSearchAndFilterShowHandler,
  scrollToTopHandler
}: ArticleViewComponentProps) {

  const dispatch = useAppDispatch()
  const { articles, activeArticle, activeArticleId,selectedArticles } = useAppSelector((state) => state.articlesDetails)
  const { sideBarPinned } = useAppSelector((state) => state.navBarPinnedDetails) 

  const [articleViewContainerState, setarticleViewContainerState] = useState<ArticleViewContainerStateProps>({
    fullTextShow: true,
    articlesExpand: false,       
  });

  const metaDataClickHandler = () => { // helps to toggle between full text and meta data view
    setarticleViewContainerState(prevVal => ({
      ...prevVal,
      fullTextShow: !prevVal["fullTextShow"],
    }));
  };

  const articleSelectHandler = (val: string) => { // helps to select the articles by the user
    console.log(val,"onchange value.....")
    if (selectedArticles.includes(val)) {
      const notValArr = selectedArticles.filter(
        (each) => each !== val
      );      
      dispatch(addArticlesToSelected(notValArr))
    } else {      
      dispatch(addArticlesToSelected([
        ...selectedArticles,
        val
      ]))
    }
  };

  const articlesExpandHandler = () => { // it helps to exand all articles while the user clicks the expand btn!!!
    setarticleViewContainerState(prevVal => ({
      ...prevVal,
      articlesExpand: !prevVal["articlesExpand"],
    }));
  };

  const singleArticleClickHandler = (id: number | null) => { // executed while the user clicks the article title and in full text view,
                                                             // also this function will executed while clicking close article view icon!!!
    if(!sideBarPinned){                                                      
      dispatch(setsideBarPinned(true)) 
    }                        
    advanceSearchAndFilterShowHandler()                      // this will collapse advance search or filter component if it is opened and soll the scrollToTopRef in the ArticleViewContainer    
    dispatch(addActiveArticle({ activeArticle: id ? articles["data"].filter((each: any) => each.refId === id) : null, activeArticleId: id }))
  }; 

  return (
    <>
      <ArticleViewButtonSection
        articlesExpandHandler={articlesExpandHandler}
        singleArticleView={activeArticleId ? true : false}
        fullTextShow={articleViewContainerState["fullTextShow"]}
        metaDataClickHandler={metaDataClickHandler}        
      />
      {!activeArticleId ? (
        <ArticlesListsSection
          articles={articles}
          articlesExpand={articleViewContainerState["articlesExpand"]}
          selectedArticles={selectedArticles}
          articleSelectHandler={articleSelectHandler}
          singleArticleClickHandler={singleArticleClickHandler}
          scrollToTopHandler={scrollToTopHandler}
        />
      ) : (
        <FullTextViewSection
          articleViewHeight={articleViewHeight}
          articles={articles}
          activeArticleId={activeArticleId}
          activeArticle={activeArticle[0]}
          selectedArticles={selectedArticles}
          fullTextShow={articleViewContainerState["fullTextShow"]}
          articleSelectHandler={articleSelectHandler}          
          singleArticleClickHandler={singleArticleClickHandler}
          advanceSearchAndFilterShowHandler = {advanceSearchAndFilterShowHandler} // this function is drilled as prop to metaDataComponent for the following one, 
        />                                                                        // this will collapse advance search or filter component if it is opened while clicking meta data selectors and soll the scrollToTopRef in the ArticleViewContainer 
      )}  
    </>
  );
}
