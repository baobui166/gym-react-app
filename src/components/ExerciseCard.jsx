import PropTypes from "prop-types";
import { useState } from "react";

function ExerciseCard(props) {
  const { exercies, i } = props;
  const [compeleted, setCompeleted] = useState(0);

  const handleSetIncrement = () => {
    setCompeleted((pre) => (pre + 1) % 6);
  };
  return (
    <div className="p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap">
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4">
        <h4 className="text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold">
          0 {i + 1}
        </h4>
        <h2 className="capitalize whitespace-normal truncate max-w-full text-lg md:text-2xl flex-1 sm:text-center">
          {exercies.name.replaceAll("_", " ")}
        </h2>
        <p className="text-sm text-slate-400 capitalize">{exercies.type}</p>
      </div>
      <div className="flex flex-col">
        <h3 className="text-slate-400 text-sm">Muscle Groups</h3>
        <p className="capitalize">{exercies.muscles.join(" & ")}</p>
      </div>
      <div className="flex flex-col bg-slate-950 gap-2">
        {exercies.description.split("_").map((val, index) => {
          return (
            <div key={index} className="text-sm">
              {val}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2 ">
        {["reps", "rest", "tempo"].map((info, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-2 rounded  border-[1.5px] border-solid border-slate-900 w-full"
            >
              <h3 className="capitalize text-slate-400 text-sm">
                {info === "reps" ? `${exercies.unit}` : info}
              </h3>
              <p className="font-medium">{exercies[info]}</p>
            </div>
          );
        })}
        <button
          onClick={handleSetIncrement}
          className="flex flex-col px-2 rounded border-[1.5px] duration-200 border-solid border-blue-900 hover:border-blue-600 w-full "
        >
          <h3 className="text-slate-400 text-sm capitalize">Sets completed</h3>
          <p className="font-medium">{compeleted} / 5</p>
        </button>
      </div>
    </div>
  );
}

ExerciseCard.propTypes = {
  exercies: PropTypes.object,
  i: PropTypes.number,
};

export default ExerciseCard;
