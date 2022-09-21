import React from "react";
import { useAppDispatch,useAppSelector } from "../../redux/Hooks";
import { Button } from "../common/Button";
import { successAlertShow } from "../../redux/reducers/GlobalAlertSlice";

type SaveSearchModalProps = {
  closeModalHandler : Function;
}

export function SaveSearchModal({ closeModalHandler } : SaveSearchModalProps) {
  const { lowFont, midFont } = useAppSelector((state) => state.globalFontResizer);
  const dispatch = useAppDispatch();

  const modalClickHandler = () => {
    dispatch(
      successAlertShow()
    );
    closeModalHandler("saveSearchModalShow");
  };

  return (
    <div className="alert-box position-absolute">
      <div className="d-flex align-items-center">
        <img
          src="/images/save-search-image.png"
          className="icon-std"
          alt="Save..."
        />
        <span
          className="has-font-weight pad-l-10 font-change-animation"
          style={{ fontSize: midFont }}
        >
          SAVE SEARCH
        </span>
      </div>
      <div className="row no-margin align-items-center pad-t-15">
        <div className="col-md-5 no-padding">
          <p
            className="no-margin font-change-animation"
            style={{ fontSize: lowFont }}
          >
            Name
          </p>
        </div>
        <div className="col-md-7 no-padding">
          <input className="w-100 modal-field" />
        </div>
      </div>      
      <div className="text-end pad-t-15">
        <Button
          hasExtraPad={false}
          text={"Save"}
          upperCaseText={false}
          btnHasRadius={false}
          btnHasImg={false}
          btnClickHandler={modalClickHandler}
          fontSize={lowFont}
          imgUrl={""}
          loadingCase={true}
          isLoading={false}
          hasMarginLeft={false}
          textCenter={false}
        />
      </div>
    </div>
  );
}
