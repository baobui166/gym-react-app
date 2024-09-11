import { useState } from "react";
import Generator from "./components/Generator";
import Hero from "./components/Hero";
import Workout from "./components/WorkOut";
import { generateWorkout } from "./utils/function";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  const updateWorkout = () => {
    if (muscles.length < 1) {
      return;
    }
    const newWorkout = generateWorkout({ poison, muscles, goals });
    setWorkout(newWorkout);
    window.location.href = "#workout";
  };

  return (
    <main className="min-h-screen flex flex-col  bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goals={goals}
        setGoals={setGoals}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}

export default App;
