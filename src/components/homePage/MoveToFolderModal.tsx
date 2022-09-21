import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { doGlobalAlertAction } from "../../redux/actions/GlobalAlertActions";
import { useAppDispatch,useAppSelector } from "../../redux/Hooks";
import { Button } from "../common/Button";
import { FolderColorSelectorDropDown } from "../common/FolderColorSelectorDropDown";

type MoveToFolderModalProps = {
  closeModalHandler : Function;
}

type PostObjProps = {
  endUrl : string,
  credential : {
    phone_no : string,
    password : string
  }
}

export function MoveToFolderModal({ closeModalHandler } : MoveToFolderModalProps) {
  const { midFont,lowFont } = useAppSelector((state) => state.globalFontResizer);  
  const {loading} = useAppSelector((state) => state.globalAlert)

  const dispatch = useAppDispatch();
  const folderColors = ["#31d0da", "#eb629b", "#9031da", "#c92121", "#d7d03d"];
  const [activeDropDownVal, setactiveDropDownVal] = useState<string>(folderColors[0]);

  const changeFolderColorHandler = (val : string) => {
    setactiveDropDownVal(val);
  };

  const modalClickHandler = () => {    
    let userLoginPostObj : PostObjProps = {
      endUrl: "/login",
      credential: {
        phone_no : "8870239911",
        password : "Qwerty"
      },
    };
    dispatch(doGlobalAlertAction(userLoginPostObj))
    .then(unwrapResult)
    .then((result : any) => {
      if(result["status"] === "success"){
        closeModalHandler();
      }
    })
  };

  return (
    <div className="alert-box position-absolute" style={{ left: 0 }}>
      <div className="d-flex align-items-center">
        <img
          src="/images/create-folder-image.png"
          className="icon-std"
          alt="Save..."
        />
        <span
          className="has-font-weight pad-l-10 font-change-animation"
          style={{ fontSize: midFont }}
        >
          Move To Folder
        </span>
      </div>
      <div className="row no-margin align-items-center pad-t-15">
        <div className="col-md-5 no-padding">
          <p
            className="no-margin font-change-animation"
            style={{ fontSize: lowFont }}
          >
            New Folder
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
            Existing Folder
          </p>
        </div>
        <div className="col-md-7 no-padding">
          <input className="w-100 modal-field" />
        </div>
      </div>
      <div className="row no-margin align-items-center pad-t-15">
        <div className="col-md-5 no-padding"></div>
        <div className="col-md-7 no-padding">
          <FolderColorSelectorDropDown
            dropDownValues={folderColors}
            activeDropDownVal={activeDropDownVal}
            changeValHandler={changeFolderColorHandler}
            width={100}
            height={"auto"}
            hasBorder={true}
          />
        </div>
      </div>
      <div className="text-end pad-t-15">
        <Button
          hasExtraPad={false}
          hasMarginLeft={false}
          text={"save"}
          upperCaseText={false}
          btnHasRadius={false}
          btnHasImg={false}
          btnClickHandler={modalClickHandler}
          fontSize={lowFont}
          imgUrl={""}
          loadingCase={true}
          isLoading={loading}
          textCenter={false}
        />
      </div>
    </div>
  );
}
