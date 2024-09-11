import { useState } from "react";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import SectionWrapper from "./SectionWrapper";
import PropTypes from "prop-types";
import Button from "./Button";

function Header({ index, title, description }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

function Generator({
  poison,
  setPoison,
  muscles,
  setMuscles,
  goals,
  setGoals,
  updateWorkout,
}) {
  const [showModel, setShowModel] = useState(false);

  const toggleModel = () => {
    setShowModel((pre) => !pre);
  };

  const updateMuscles = (muscleGroup) => {
    // Kiểm tra nếu nhóm cơ đã có trong mảng `muscles`
    if (muscles.includes(muscleGroup)) {
      // Nếu đã có, loại bỏ nó khỏi mảng
      setMuscles((prevMuscles) =>
        prevMuscles.filter((muscle) => muscle !== muscleGroup)
      );
    } else {
      // Kiểm tra số lượng nhóm cơ đã chọn
      if (muscles.length >= 3) {
        return;
      }

      if (poison !== "individual") {
        // Nếu không phải chế độ "individual", chỉ cho phép chọn một nhóm cơ
        setMuscles([muscleGroup]);
        setShowModel(false);
      } else {
        // Chế độ "individual", thêm nhóm cơ mới vào mảng
        setMuscles((prevMuscles) => [...prevMuscles, muscleGroup]);

        // Nếu đã chọn 2 nhóm cơ, đóng model lại
        if (muscles.length === 2) {
          setShowModel(false);
        }
      }
    }
  };

  return (
    <SectionWrapper
      header={"generate your workout"}
      title={['It"s', "Huge", "o'clock"]}
      id={"generate"}
    >
      <Header
        index={"01"}
        title={"Pick your poison "}
        description={"Select the workout you wish to endsure."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              className={`bg-slate-950 border py-2 rounded-lg overflow-hidden duration-200 hover:border-blue-600 px-4 ${
                type === poison ? "border-blue-950" : "border-blue-400"
              } `}
              key={typeIndex}
              onClick={() => {
                setPoison(type);
              }}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on target"}
        description={"Select the muscles judges for annihition."}
      />
      <div className="bg-slate-950 p-3 border border-solid border-blue-500 rounded-lg flex flex-col">
        <button
          onClick={toggleModel}
          className="relative p-3 flex items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length == 0 ? "Select muscles" : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-down-long"></i>
        </button>
        {showModel && (
          <div className="flex flex-col px-3 pb-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup) ? " text-blue-400" : " ")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, index) => {
          return (
            <button
              className={`bg-slate-950 border py-2 rounded-lg overflow-hidden duration-200 hover:border-blue-600 px-4 ${
                scheme === goals ? "border-blue-950" : "border-blue-400"
              } `}
              key={index}
              onClick={() => {
                setGoals(scheme);
              }}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button func={updateWorkout} text={"Formulate"}></Button>
    </SectionWrapper>
  );
}

Header.propTypes = {
  index: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Generator.propTypes = {
  poison: PropTypes.string,
  setPoison: PropTypes.func,
  muscles: PropTypes.array,
  setMuscles: PropTypes.func,
  goals: PropTypes.string,
  setGoals: PropTypes.func,
};

export default Generator;
