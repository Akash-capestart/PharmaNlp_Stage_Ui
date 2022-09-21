import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/Hooks'
import { Button } from '../common/Button'
import { setCurrentTogglerToFilterOrAdvanceSearch } from '../../redux/reducers/FilterAndAdvanceSearchTogglerSlice';

export function AdvanceSearchAndFilterBtnSection() {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);
  const { advanceSearchContentHeight, advanceSearchContentRefHeight, filteringContentHeight, filteringContentRefHeight } = useAppSelector((state) => state.filerAndAdvanceSearchTogglerDetails);
  const dispatch = useAppDispatch()

  const advanceSearchAndFilterShowHandler = ( // used to toggle and collapse the advance search and filter UI!!!
    key: string,
    howMuchToScrollTop: number,
    scrollBehaviour: string
  ) => {
    if (key === "advanceSearchShow") {
      dispatch(setCurrentTogglerToFilterOrAdvanceSearch({
        activeContent: key,
        // advanceSearchContentHeight: advanceSearchContentHeight === 0 ? advanceSearchContentRefHeight + 20 : 0,
        advanceSearchContentHeight : advanceSearchContentHeight === 0 ? advanceSearchContentRefHeight : 0,
        filteringContentHeight: 0,
        howMuchToScrollTop: howMuchToScrollTop,
        scrollBehaviour: scrollBehaviour       
      }))
    } else if (key === "filteringShow") {
      dispatch(setCurrentTogglerToFilterOrAdvanceSearch({
        activeContent: key,
        advanceSearchContentHeight: 0,
        // filteringContentHeight: filteringContentHeight === 0 ? filteringContentRefHeight + 20 : 0,
        filteringContentHeight : filteringContentHeight === 0 ? filteringContentRefHeight : 0,
        howMuchToScrollTop: howMuchToScrollTop,
        scrollBehaviour: scrollBehaviour       
      }))
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Button
        hasExtraPad={false}
        text={"Advanced Search"}
        upperCaseText={false}
        btnHasRadius={true}
        btnHasImg={true}
        btnClickHandler={() =>
          advanceSearchAndFilterShowHandler("advanceSearchShow", 0, "auto")
        }
        fontSize={lowFont}
        imgUrl={"./images/advance-search-image.png"}
        loadingCase={false}
        isLoading={false}
        hasMarginLeft={true}
        textCenter={false}
      />
      <Button
        hasExtraPad={false}
        text={"Filter"}
        upperCaseText={false}
        btnHasRadius={true}
        btnHasImg={true}
        btnClickHandler={() =>
          advanceSearchAndFilterShowHandler("filteringShow", 0, "auto")
        }
        fontSize={lowFont}
        imgUrl={"./images/filter-image.png"}
        loadingCase={false}
        isLoading={false}
        hasMarginLeft={true}
        textCenter={false}
      />
      <Button
        hasExtraPad={false}
        text={"Import"}
        upperCaseText={false}
        btnHasRadius={true}
        btnHasImg={true}
        btnClickHandler={() =>
          advanceSearchAndFilterShowHandler("filteringShow", 0, "auto")
        }
        fontSize={lowFont}
        imgUrl={"./images/import-image.png"}
        loadingCase={false}
        isLoading={false}
        hasMarginLeft={true}
        textCenter={false}
      />
    </div>
  )
}
