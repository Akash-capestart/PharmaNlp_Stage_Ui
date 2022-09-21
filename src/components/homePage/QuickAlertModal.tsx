import React from "react";
import { useAppDispatch,useAppSelector } from "../../redux/Hooks";
import { Button } from "../common/Button";
import { successAlertShow } from "../../redux/reducers/GlobalAlertSlice";

type QuickAlertModalProps = {
  closeModalHandler : (e: any) => void;
}

export function QuickAlertModal({ closeModalHandler } : QuickAlertModalProps) {
  const { lowFont,midFont } = useAppSelector((state) => state.globalFontResizer);
  const dispatch = useAppDispatch(); 

  const modalClickHandler = () => {
    dispatch(
      successAlertShow()
    );
    closeModalHandler("quickAlertModalShow");
  };  

  return (
    <div className="alert-box position-absolute">
      <div className="d-flex align-items-center">
        <img
          src="/images/quick-alert-image.png"
          className="icon-std"
          alt="Alert..."
        />
        <span
          className="has-font-weight pad-l-15 font-change-animation"
          style={{ fontSize: midFont }}
        >
          QUICK ALERT CREATION
        </span>
      </div>
      <div className="row no-margin align-items-center pad-t-15">
        <div className="col-md-5 no-padding">
          <p
            className="no-margin font-change-animation"
            style={{ fontSize: lowFont }}
          >
            Report Label
          </p>
        </div>
        <div className="col-md-7 no-padding">
          <input className="w-100 modal-field" />
        </div>
      </div>
      <div className="row no-margin align-items-center pad-t-15">
        <div className="col-md-5 no-padding">
          <p
            className="no-margin font-change-animation"
            style={{ fontSize: lowFont }}
          >
            Report Recipients
          </p>
        </div>
        <div className="col-md-7 no-padding">
          <input className="w-100 modal-field" />
        </div>
      </div>      
      <div className="text-end pad-t-15">
        <Button
          hasExtraPad={false}
          text={"Quick Alert"}
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
