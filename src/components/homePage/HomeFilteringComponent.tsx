import React, { useState } from "react";
import { useAppSelector } from "../../redux/Hooks";
import { Button } from "../common/Button";

type MultiSelectViewProps = {
  label : string,
  itemLists : string[],
  filterHadler : Function,
  checkValue : string[]
}

const MultiSelectView = ({ label, itemLists, filterHadler, checkValue } : MultiSelectViewProps) => {
  const { minFont,lowFont } = useAppSelector((state) => state.globalFontResizer);

  const filterContentClickHandler = (key : string, val : string) => {
    filterHadler(key, val);
  };

  return (
    <>
      <p
        className="no-margin text-green has-font-weight font-change-animation"
        style={{ fontSize: lowFont }}
      >
        {label}
      </p>
      <div>
        {itemLists.map((each:string, idx:number) => (
          <div
            key={idx}
            className="d-flex align-items-center justify-content-between cursor-pointer filtering-content"
            onClick={() => filterContentClickHandler(label, each)}
          >
            <p
              className="no-margin text-dark-gray has-font-weight pad-5 font-change-animation"
              style={{ fontSize: minFont }}
            >
              {each}
            </p>
            {checkValue.includes(each) && (
              <img
                src="/images/selected-image.png"
                className="w-10 mar-r-5"
                alt="Selected..."
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

type UserEntryViewProps = {
  label : string
}

const UserEntryView = ({ label }:UserEntryViewProps) => {
  const { lowFont } = useAppSelector((state) => state.globalFontResizer);

  return (
    <>
      <p
        className="no-margin text-green has-font-weight font-change-animation"
        style={{ fontSize: lowFont }}
      >
        {label}
      </p>
      <input placeholder="-" className="filtering-input w-100" />
    </>
  );
};

type HomeFilteringComponentProps = {  
  advanceSearchAndFilterShowHandler : Function
}

export function HomeFilteringComponent({  
  advanceSearchAndFilterShowHandler,
}:HomeFilteringComponentProps) {

  const { lowFont,midFont } = useAppSelector((state) => state.globalFontResizer);
  const sourcesLists = [
    "All",
    "Pubmed",
    "Embase",
    "Google Scholar",
    "Cochrane Central",
  ];
  const countryLists = [
    "All",
    "United States",
    "United Kingdom",
    "France",
    "Germany",
    "Russia",
    "Australia",
  ];
  const languageLists = ["All", "English", "French", "Japanese"];
  const adverseEvents = ["All", "Yes", "No"];
  const textAvailability = ["All", "Free", "Paid"];
  const studyDesign = [
    "All",
    "Randomized Controlled Trial",
    "Non-Randomized Trial",
    "Case-Control Study",
    "Systemetic Review",
    "Cross-Sectional Study",
  ];
  const typeOfControl = [
    "All",
    "Active",
    "Placebo",
    "Active-Placebo",
    "No Therapy",
  ];
  const categoryOfTreatment = [
    "All",
    "First Time Therapy",
    "Consolidation Therapy",
    "Salvage Therapy",
  ];
  const gender = ["All", "Male", "Female"];

  const [multiSelectState, setmultiSelectState] = useState<any>({
    "Source": ["All"],
    "Country": ["All"],
    "Language": ["All"],
    "Adverse Event": ["All"],
    "Full-Text-Availability": ["All"],
    "Study Design": ["All"],
    "Type of Control": ["All"],
    "Category Of Treatment": ["All"],
    "Gender": ["All"],
  });

  const filterResetHandler = () => {
    setmultiSelectState({
      ...multiSelectState,
      Source: ["All"],
      Country: ["All"],
      Language: ["All"],
      "Adverse Event": ["All"],
      "Full-Text-Availability": ["All"],
      "Study Design": ["All"],
      "Type of Control": ["All"],
      "Category Of Treatment": ["All"],
      Gender: ["All"],
    });
  };

  const filterContentClickHandler = (key:string, val:string) => {
    if (!multiSelectState[key].includes(val)) {
      if (val === "All") {
        setmultiSelectState({
          ...multiSelectState,
          [key]: [val],
        });
      } else {
        const notAllArr = multiSelectState[key].filter(
          (each:string) => each !== "All"
        );
        const newArr = [...notAllArr, val];
        setmultiSelectState({
          ...multiSelectState,
          [key]: newArr,
        });
      }
    } else {
      if (val === "All") {
        setmultiSelectState({
          ...multiSelectState,
          [key]: [],
        });
      } else {
        setmultiSelectState({
          ...multiSelectState,
          [key]: multiSelectState[key].filter((each : string) => each !== val),
        });
      }
    }
  };

  const filterSetHandler = () => {
    advanceSearchAndFilterShowHandler();
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between has-gray-border-bottom mar-15">
        <p
          className="text-green has-font-weight no-margin font-change-animation"
          style={{ fontSize: midFont }}
        >
          BASIC FILTERS
        </p>
        <div>
          <Button
            hasExtraPad={false}
            text={"Clear All"}
            upperCaseText={false}
            btnHasRadius={true}
            btnHasImg={false}
            btnClickHandler={filterResetHandler}
            fontSize={lowFont}
            imgUrl={""}
            loadingCase={false}
            isLoading={false}
            hasMarginLeft={false}
            textCenter={false}
          />
          <Button
            hasExtraPad={false}
            text={"Apply"}
            upperCaseText={false}
            btnHasRadius={true}
            btnHasImg={false}
            btnClickHandler={filterSetHandler}
            fontSize={lowFont}
            imgUrl={""}
            loadingCase={true}
            isLoading={false}
            hasMarginLeft={true}
            textCenter={false}
          />
        </div>
      </div>
      <div className="row has-green-border-bottom mar-15">
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Source"}
            itemLists={sourcesLists}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Source"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Country"}
            itemLists={countryLists}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Country"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Language"}
            itemLists={languageLists}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Language"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Adverse Event"}
            itemLists={adverseEvents}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Adverse Event"]}
          />
          <MultiSelectView
            label={"Full-Text-Availability"}
            itemLists={textAvailability}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Full-Text-Availability"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Study Design"}
            itemLists={studyDesign}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Study Design"]}
          />
        </div>
        <div className="col-md-2 filter-content-box-margin" id="custom-scrollbar">
          <UserEntryView label={"Author"} />
          <UserEntryView label={"Journal"} />
          <UserEntryView label={"Publication Year"} />
        </div>
      </div>
      <div className="row no-margin">
        <div className="col-md-6">
          <p
            className="no-margin text-green has-font-weight has-gray-border-bottom font-change-animation"
            style={{ fontSize: midFont }}
          >
            STUDY INTERVENTION
          </p>
        </div>
        <div className="col-md-6 pad-l-0">
          <p
            className="no-margin text-green has-font-weight has-gray-border-bottom font-change-animation"
            style={{ fontSize: midFont }}
          >
            BASELINE CHARACTARISTICS OF PATIENTS
          </p>
        </div>
      </div>
      <div className="row has-green-border-bottom mar-15">
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Type of Control"}
            itemLists={typeOfControl}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Type of Control"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <MultiSelectView
            label={"Category Of Treatment"}
            itemLists={categoryOfTreatment}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Category Of Treatment"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <UserEntryView label={"Experimental Intervention"} />
          <UserEntryView label={"Intervention Control"} />
          <UserEntryView label={"Outcomes"} />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <UserEntryView label={"Age"} />
          <MultiSelectView
            label={"Gender"}
            itemLists={gender}
            filterHadler={filterContentClickHandler}
            checkValue={multiSelectState["Gender"]}
          />
        </div>
        <div className="col-md-2 border-right-green filter-content-box-margin" id="custom-scrollbar">
          <UserEntryView label={"Diagnosis"} />
          <UserEntryView label={"Extent of Disease"} />
          <UserEntryView label={"Organ Involvement"} />
        </div>
        <div className="col-md-2 filter-content-box-margin" id="custom-scrollbar">
          <UserEntryView label={"Stage"} />
          <UserEntryView label={"Previous Treatment"} />
          <UserEntryView label={"Performance Status"} />
        </div>
      </div>
    </>
  );
}
