import React, { useState } from "react";
import { useAppSelector } from "../../redux/Hooks";
import { MoveToFolderModal } from "./MoveToFolderModal";
import { DropDown } from "../common/DropDown";
import { Button } from "../common/Button";

type ArticleViewButtonSectionProps = {
  articlesExpandHandler : (event : React.MouseEvent<HTMLDivElement>) => void,
  fullTextShow : boolean,
  metaDataClickHandler : Function,
  singleArticleView : boolean,  
}

type ArticleViewButtonSectionState = {
  activeDropDownVal : string,
  moveToFolderModalShow : boolean
}

export function ArticleViewButtonSection({
  articlesExpandHandler,
  fullTextShow,
  metaDataClickHandler,
  singleArticleView,  
} : ArticleViewButtonSectionProps) {
  
  const { lowFont } = useAppSelector((state) => state.globalFontResizer);

  const dropDownValues = ["Published Date", "Recently Added"];
  const [articleViewButtonSectionState, setarticleViewButtonSectionState] =
    useState<ArticleViewButtonSectionState>({
      activeDropDownVal: dropDownValues[0],
      moveToFolderModalShow: false,
    });

  const moveToFolderModalShowHandler = () => {
    setarticleViewButtonSectionState((prevVal) => ({
      ...prevVal,
      moveToFolderModalShow: !prevVal["moveToFolderModalShow"],
    }));
  };

  const dropDownValueHandler = (val : string) => {
    setarticleViewButtonSectionState({
      ...articleViewButtonSectionState,
      activeDropDownVal: val,
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-between has-green-border-bottom pad-b-5 article-view-head-height">
      <div className="d-flex align-items-center position-relative">
        <Button
          hasExtraPad={false}
          text={"Move To Folder"}
          upperCaseText={false}
          btnHasRadius={true}
          btnHasImg={true}
          btnClickHandler={moveToFolderModalShowHandler}
          fontSize={lowFont}
          imgUrl={"./images/folder-image.png"}
          loadingCase={false}
          isLoading={false}
          hasMarginLeft={false}
          textCenter={false}
        />
        {articleViewButtonSectionState["moveToFolderModalShow"] && (
          <MoveToFolderModal closeModalHandler={moveToFolderModalShowHandler} />
        )}
        {!singleArticleView && (
          <Button
            hasExtraPad={false}
            text={"Expand All"}
            upperCaseText={false}
            btnHasRadius={true}
            btnHasImg={true}
            btnClickHandler={articlesExpandHandler}
            fontSize={lowFont}
            imgUrl={"./images/expand-image.png"}
            loadingCase={false}
            isLoading={false}
            hasMarginLeft={true}
            textCenter={false}
          />
        )}
        <Button
          hasExtraPad={false}
          text={"Export"}
          upperCaseText={false}
          btnHasRadius={true}
          btnHasImg={true}
          btnClickHandler={articlesExpandHandler}
          fontSize={lowFont}
          imgUrl={"./images/export-image.png"}
          loadingCase={false}
          isLoading={false}
          hasMarginLeft={true}
          textCenter={false}
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span
          className="font-change-animation"
          style={{ fontSize: lowFont }}
        >
          Sort By : &nbsp;
        </span>
        <DropDown
          activeDropDownVal={articleViewButtonSectionState["activeDropDownVal"]}
          changeValHandler={dropDownValueHandler}
          dropdownValues={dropDownValues}
          width={175}
          height={"auto"}
          hasBorder={true}
          backGroundColor={""}
        />
      </div>
      {singleArticleView && (
        <ul
          className="meta-data-selector cursor-pointer d-flex has-font-weight font-change-animation"
          style={{ fontSize: lowFont }}
          onClick={() => metaDataClickHandler()}
        >
          <li className={!fullTextShow ? "active" : ""}>Meta Data</li>
          <li className={fullTextShow ? "active" : ""}>Full Text</li>
        </ul>
      )}
    </div>
  );
}
