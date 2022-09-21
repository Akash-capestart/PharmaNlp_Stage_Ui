import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { Button } from "../common/Button";
import { successAlertShow } from "../../redux/reducers/GlobalAlertSlice";

type PublishNewsLetterModalProps = {
  closeModalHandler: Function;
}

export function PublishNewsLetterModal({ closeModalHandler }: PublishNewsLetterModalProps) {
  const { midFont,lowFont } = useAppSelector((state) => state.globalFontResizer);
  const dispatch = useAppDispatch();

  const modalClickHandler = () => {
    dispatch(
      successAlertShow()
    );
    closeModalHandler("publishNewsLetterModalShow");
  };

  return (
    <div className="alert-box position-absolute">
      <div className="d-flex align-items-center">
        <img
          src="/images/publish-news-letter-image.png"
          className="icon-std"
          alt="Save..."
        />
        <span
          className="has-font-weight pad-l-10 font-change-animation"
          style={{ fontSize: midFont }}
        >
          PUBLISH NEWSLETTER
        </span>
      </div>
      <div className="row no-margin align-items-center pad-t-15">
        <div className="col-md-5 no-padding">
          <p
            className="no-margin font-change-animation"
            style={{ fontSize: lowFont }}
          >
            Title
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
            Recipients
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
            Message
          </p>
        </div>
        <div className="col-md-7 no-padding">
          <textarea className="w-100 modal-field" />
        </div>
      </div>
      <span
        className="font-change-animation"
        style={{ fontSize: lowFont }}
      >
        Studies selected :
        <span
          className="text-green font-change-animation"
          style={{ fontSize: lowFont }}
        >
          {" "}
          5
        </span>
      </span>
      <div className="text-end pad-t-15">
        <Button
          hasExtraPad={false}
          text={"Send"}
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
