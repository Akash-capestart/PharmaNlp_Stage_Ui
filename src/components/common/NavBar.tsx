import React from "react";
import { FontSlider } from "./FontSlider";
import { useAppSelector } from "../../redux/Hooks";
import { LogOutSection } from "./LogOutSection";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const {highFont,lowFont} = useAppSelector((state) => state.globalFontResizer);
  const navigate = useNavigate()

  return (
    <>
      <div className="row no-margin h-50px light-green-background">
        <div className="col-md-7 no-padding nav-box">
          <p
            className="active no-margin font-change-animation w-50"
            style={{ fontSize: highFont }}
          >
            RELEVANT
          </p>
          <p
            className="no-margin font-change-animation w-50"
            style={{ fontSize: highFont }}
            onClick={()=>navigate('/irrelevant')}
          >
            IRRELEVANT
          </p>
          {/* <p
            className="no-margin font-change-animation"
            style={{ fontSize: highFont }}
          >
            DUPLICATES
          </p>
          <p
            className="no-margin font-change-animation"
            style={{ fontSize: highFont }}
          >
            ALL STUDIES
          </p> */}
        </div>
        <div className="col-md-5 no-padding">
          <div className="d-flex align-items-center justify-content-around h-50px">
            <FontSlider />
            <div className="d-flex position-relative cursor-pointer">
              <img
                src="/images/bell-image.png"
                className="w-20"
                alt="Notification..."
              />
              <img
                src="/images/msg-notify-image.png"
                className="position-absolute w-10"
                style={{ right: -3 }}
                alt="!."
              />
            </div>
            <span
              className="text-center has-font-weight pad-5 font-change-animation"
              style={{ fontSize: lowFont }}
            >
              Karthika Balasubramoniam
            </span>
            <LogOutSection />
          </div>
        </div>
      </div>
    </>
  );
}
