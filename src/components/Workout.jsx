import ExerciseCard from "./ExerciseCard";
import SectionWrapper from "./SectionWrapper";
import PropTypes from "prop-types";

function Workout({ workout }) {
  return (
    <SectionWrapper
      id={"workout"}
      header={"welcome to"}
      title={["The", "DANGER", "zone"]}
    >
      <div className="flex flex-col gap-4">
        {workout.map((exercies, index) => (
          <ExerciseCard exercies={exercies} i={index} key={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

Workout.propTypes = {
  workout: PropTypes.object,
};

export default Workout;
