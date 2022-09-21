import React, { useState } from "react";
import { useAppSelector } from "../../redux/Hooks";

type DropDownProps = {
  activeDropDownVal: string,
  changeValHandler: Function,
  dropdownValues: string[],
  width: number,
  height: number | string,
  hasBorder: boolean,
  backGroundColor: string
}

export function DropDown({
  activeDropDownVal,
  changeValHandler,
  dropdownValues,
  width,
  height,
  hasBorder,
  backGroundColor,
}: DropDownProps) {
  const {lowFont} = useAppSelector((state) => state.globalFontResizer);

  const [showDropDown, setshowDropDown] = useState<boolean>(false);

  const dropDownShowHandler = () => {
    setshowDropDown(prevVal => !prevVal);
  };

  const setSelectedValueHandler = (dropdownVal: string) => {
    changeValHandler(dropdownVal);
    setshowDropDown(prevVal => !prevVal);
  };

  return (
    <div style={{ width: width }} className="position-relative">
      <div
        onClick={() => dropDownShowHandler()}
        style={{
          border: hasBorder ? "solid 1px #EEEEEE" : "",
          backgroundColor: backGroundColor && backGroundColor,
        }}
        className="cursor-pointer d-flex align-items-center justify-content-between drop-down-box"
      >
        <p
          className="no-margin font-change-animation"
          style={{ fontSize: lowFont }}
        >
          {activeDropDownVal}
        </p>
        <img
          src="/images/gray-drop-down-image.png"
          className={showDropDown ? "drop-down-rotated" : "drop-down-icon"}
          alt="Drop Down..."
        />
      </div>
      {showDropDown && (
        <div
          className="drop-down-content-box"
          onMouseLeave={() => dropDownShowHandler()}
          style={{width:width}}
        >
          <div className="drop-down-content-scroll-box" id="custom-scrollbar"  style={{ height: height }}>
            {dropdownValues.map((dropdownVal, idx) => {
              return (
                <p
                  key={idx}
                  className="drop-down-content no-margin font-change-animation"
                  style={{ fontSize: lowFont }}
                  onClick={() => setSelectedValueHandler(dropdownVal)}
                >
                  {dropdownVal}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
