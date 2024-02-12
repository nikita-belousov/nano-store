import { derived } from "./lib/derived";
import { writable } from "./lib/writable";

export const counters = writable(
  { counter1: 0, counter2: 0 },
  { name: "counters", persistent: true }
);

export const incrementCounter1 = () => {
  counters.update((state) => ({
    ...state,
    counter1: state.counter1 + 1,
  }))
}

export const incrementCounter2 = () => {
  counters.update((state) => ({
    ...state,
    counter2: state.counter2 + 1,
  }))
}

export const multiplier = derived(
  [counters],
  (val) => val.counter1 * val.counter2,
  0
);