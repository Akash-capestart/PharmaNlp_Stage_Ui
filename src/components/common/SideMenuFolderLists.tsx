import React, { useState, useRef } from "react";
import { GetFirstLetter } from "../../helpers/GetFirstLetter";
import { useAppSelector } from "../../redux/Hooks";

type SideMenuForderListsStateProps = {
  folderListsShow: boolean,
  folderListsHeight: number
}

type FilesDataProps = {
  filesData: { color: string, file: string, count: number }[],
  sideBarPinned: boolean
}

export function SideMenuFolderLists({ filesData, sideBarPinned }: FilesDataProps) {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);

  const [sideMenuForderListsState, setsideMenuForderListsState] = useState<SideMenuForderListsStateProps>({
    folderListsShow: false,
    folderListsHeight: 0,
  });

  const folderListsContentRef = useRef<HTMLDivElement>(null!);

  const accToggleHandler = () => {
    setsideMenuForderListsState(prevVal => ({
      ...prevVal,
      folderListsShow: !prevVal["folderListsShow"],
      folderListsHeight:
        sideMenuForderListsState.folderListsHeight === 0
          ? folderListsContentRef.current.scrollHeight
          : 0,
    }));
  };

  return (
    <div style={{ padding: "0px 5px 5px 5px" }}>
      <div
        className={`d-flex align-items-center ${!sideBarPinned ? "justify-content-between" : "justify-content-center"} cursor-pointer light-green-background pad-5`}
        onClick={() => accToggleHandler()}
      >
        <>
          <img
            className={
              sideMenuForderListsState["folderListsShow"]
                ? "drop-down-rotated"
                : "drop-down-icon"
            }
            src="/images/green-drop-down-image.png"
            alt="Drop Down..."
          />
          <span
            className={`text-green font-change-animation has-font-weight ${!sideBarPinned ? "pad-l-10" : "pad-l-5"}`}
            style={{ fontSize: lowFont }}
          >
            {!sideBarPinned ? "Device" : GetFirstLetter("Device")}
          </span>
        </>
        {!sideBarPinned &&
          <span
            className="text-green font-change-animation has-font-weight"
            style={{ fontSize: lowFont }}
          >
            145
          </span>
        }
      </div>
      <div
        ref={folderListsContentRef}
        className="accordian-height-animation"
        style={{ maxHeight: sideMenuForderListsState["folderListsHeight"] }}
      >
        {filesData.map((each: { color: string, file: string, count: number }, idx: number) => {
          return (
            <div
              key={idx}
              className={`d-flex align-items-center pad-5 ${!sideBarPinned ? "justify-content-between" : "justify-content-center"}`}
            >
              <div>
                <div
                  className="rounded-indicator"
                  style={{ backgroundColor: each.color }}
                ></div>
                <span
                  className={`text-green font-change-animation has-font-weight ${!sideBarPinned ? "pad-l-10" : "pad-l-5"}`}
                  style={{ fontSize: lowFont }}
                >
                  {sideBarPinned ? GetFirstLetter(each.file) : each.file}
                </span>
              </div>
              {!sideBarPinned &&
                <span
                  className="text-green font-change-animation has-font-weight"
                  style={{ fontSize: lowFont }}
                >
                  {each.count}
                </span>
              }
            </div>
          );
        })}
      </div>
      <div className={`d-flex align-items-center ${!sideBarPinned ? "justify-content-between" : "justify-content-center"} cursor-pointer light-green-background pad-5 mar-t-10`}>
        <div>
          <div
            className="rounded-indicator"
            style={{ backgroundColor: "#C92121" }}
          ></div>
          <span
            className={`text-green font-change-animation has-font-weight ${!sideBarPinned ? "pad-l-10" : "pad-l-5"}`}
            style={{ fontSize: lowFont }}
          >
            {sideBarPinned ? GetFirstLetter("Adverse Events") : "Adverse Events"}
          </span>
        </div>
        {!sideBarPinned &&
          <span
            className="text-green font-change-animation has-font-weight"
            style={{ fontSize: lowFont }}
          >
            19
          </span>
        }
      </div>
      <div className={`d-flex align-items-center ${!sideBarPinned ? "justify-content-between" : "justify-content-center"} cursor-pointer light-green-background pad-5 mar-t-10`}>
        <div>
          <div
            className="rounded-indicator"
            style={{ backgroundColor: "#D7D03D" }}
          ></div>
          <span
            className={`text-green font-change-animation has-font-weight ${!sideBarPinned ? "pad-l-10" : "pad-l-5"}`}
            style={{ fontSize: lowFont }}
          >
            {sideBarPinned ? GetFirstLetter("Review Later") : "Review Later"}
          </span>
        </div>
        {!sideBarPinned &&
          <span
            className="text-green font-change-animation has-font-weight"
            style={{ fontSize: lowFont }}
          >
            28
          </span>
        }
      </div>
    </div>
  );
}
