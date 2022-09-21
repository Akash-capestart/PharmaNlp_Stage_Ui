import React, { useState } from "react";
import { DropDown } from "./DropDown";
import { AdvanceSearchAndFilterBtnSection } from "../homePage/AdvanceSearchAndFilterBtnSection";
import { SimpleSearchInput } from "./SimpleSearchInput";
import { HomeModalSection } from "../homePage/HomeModalSection";

type SearchSectionStateProps = {
  activeDropDownVal: string,
}

export function SearchSection() {

  const dropDownValues: string[] = ["Last 1 Year", "Last 2 Year", "Last 3 Year"];
  const [searchSectionState, setsearchSectionState] = useState<SearchSectionStateProps>({
    activeDropDownVal: dropDownValues[0]
  });

  const dropDownValueHandler = (val: string) => {
    setsearchSectionState({
      ...searchSectionState,
      activeDropDownVal: val,
    });
  };

  return (
    <div className="row search-box align-items-center h-36">
      <div className="col-md-5 no-padding">
        <div className="d-flex align-items-center justify-content-start">
          <SimpleSearchInput />
          <DropDown
            activeDropDownVal={searchSectionState["activeDropDownVal"]}
            hasBorder={true}
            changeValHandler={dropDownValueHandler}
            dropdownValues={dropDownValues}
            width={175}
            height={"auto"}
            backGroundColor={""}
          />
        </div>
      </div>
      <div className="col-md-5 no-padding">
        <AdvanceSearchAndFilterBtnSection />
      </div>
      <div className="col-md-2 no-padding position-relative">
        <HomeModalSection />
      </div>
    </div>
  );
}
