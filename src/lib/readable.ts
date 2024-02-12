import { nanoid } from "nanoid";
import { Readable } from "./types";

export function readable<T>(initialValue: T): Readable<T> {
  const currentValue = initialValue;
  const subscribers: Record<string, ((value: T) => void) | undefined> = {};

  const get = () => currentValue;

  const subscribe = (cb: (value: T) => void) => {
    const subId = nanoid();
    subscribers[subId] = cb;

    return () => {
      subscribers[subId] = undefined;
    };
  };

  // const _notifySubscribers = () => {
  //   Object.values(subscribers).forEach((cb) => cb?.(currentValue));
  // };

  return { get, subscribe };
}