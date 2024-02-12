import "./App.css";
import { useStore } from "./lib/useStore";
import {
  counters,
  incrementCounter1,
  incrementCounter2,
  multiplier,
} from "./stores";

function App() {
  const { value: countersValue } = useStore(counters);
  const { value: multiplierValue } = useStore(multiplier);

  return (
    <div className="card">
      <p>
        <button onClick={incrementCounter1}>
          counter 1 is {countersValue.counter1}
        </button>
      </p>
      <p>
        <button onClick={incrementCounter2}>
          counter 2 is {countersValue.counter2}
        </button>
      </p>
      <p>result: {multiplierValue}</p>
    </div>
  );
}

export default App;
