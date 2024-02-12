import { useCallback, useEffect, useState } from "react";
import { Readable, UpdateOptions, Writable } from "./types";

export function useStore<T>(store: Writable<T> | Readable<T>) {
  const [value, setValue] = useState<T>(store.get());

  useEffect(() => {
    return store.subscribe((value) => setValue(value));
  }, []);

  const set = useCallback(
    (value: T) => {
      if ("set" in store) {
        store.set(value);
      } else {
        throw new Error("Can't update store, it's not writable");
      }
    },
    [store]
  );

  const update = useCallback(
    (fn: (value: T) => T, options?: UpdateOptions) => {
      if ("update" in store) {
        store.update(fn, options);
      } else {
        throw new Error("Can't update store, it's not writable");
      }
    },
    [store]
  );

  return { value, set, update };
}
