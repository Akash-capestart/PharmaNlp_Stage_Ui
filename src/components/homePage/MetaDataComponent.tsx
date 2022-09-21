import React, { useState } from "react";
import { useAppSelector } from "../../redux/Hooks";
import { CamelStringToCapsString } from "../../helpers/CamelStringToCapsString";

type MetaDataSelectBtnUIProps = {
  metaDataSelectorHandler: Function,
  value: string,
  activeMetaData: string
}

const MetaDataSelectBtnUI = ({
  metaDataSelectorHandler,
  value,
  activeMetaData,
}: MetaDataSelectBtnUIProps) => {
  return (
    <li
      className={`mar-r-5 pad-10 cursor-pointer has-font-weight gray-background ${value === activeMetaData && "active"
        }`}
      onClick={() => metaDataSelectorHandler(value)}
    >
      {CamelStringToCapsString(value)}
    </li>
  );
};

const MetaDataFieldsUI = ({ metaDataObj }: any) => {  

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);

  return (
    <>
      {Object.keys(metaDataObj[0]).map((key, idx) => {
        return (
          <div className="no-margin row pad-t-15" key={idx}>
            <div className="col-md-2 no-padding">
              <p
                className="text-light-gray mar-b-10 font-change-animation"
                style={{ fontSize: lowFont }}
              >
                {CamelStringToCapsString(key)}
              </p>
            </div>
            <div className="col-md-10 no-padding">
              <div className="meta-data-fields gray-background has-green-border mar-b-10">
                <p
                  className="text-light-gray no-margin font-change-animation"
                  style={{ fontSize: lowFont }}
                >
                  {metaDataObj[0][key] === ""
                    ? "-"
                    : String(metaDataObj[0][key])}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

type MetaDataComponentProps = {
  activeArticle: any,
  articleViewHeight: number,
  metaDataCloseHandler: Function,
  advanceSearchAndFilterShowHandler : Function
}

type MetaDataComponentStateProps = {
  activeMetaDataSelector: string[],
  activeMetaData: string
}

export function MetaDataComponent({
  activeArticle,
  articleViewHeight,
  metaDataCloseHandler,
  advanceSearchAndFilterShowHandler
}: MetaDataComponentProps) {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);
  const [metaDataComponentState, setmetaDataComponentState] = useState<MetaDataComponentStateProps>({
    activeMetaDataSelector: [],
    activeMetaData: "studyData",
  });

  const metaDataSelectorHandler = (key: string) => {
    advanceSearchAndFilterShowHandler()
    if (metaDataComponentState["activeMetaDataSelector"].includes(key[0])) {
      setmetaDataComponentState({
        ...metaDataComponentState,
        activeMetaDataSelector: [],
        activeMetaData: key,
      });
    } else {
      setmetaDataComponentState({
        ...metaDataComponentState,
        activeMetaDataSelector: [key[0]],
        activeMetaData: key,
      });
    }
  };

  return (
    <div
      className="col-md-8 overflow-auto"
      style={{ paddingRight: 0, maxHeight: articleViewHeight }}
    >
      <ul
        className="d-flex no-padding no-margin meta-data-options-box font-change-animation position-relative align-items-center"
        style={{ fontSize: lowFont }}
      >
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"studyData"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"studyLevelData"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"patientBaseline"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"interventions"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"outcomes"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <img
          onClick={() => metaDataCloseHandler(null, 0)}
          style={{ right: 0 }}
          className="cursor-pointer w-20 position-absolute"
          src="/images/cross-image.png"
          alt="Close..."
        />
      </ul>
      <MetaDataFieldsUI
        metaDataObj={activeArticle[metaDataComponentState["activeMetaData"]]}
      />
    </div>
  );
}
