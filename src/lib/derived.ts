import { nanoid } from "nanoid";
import { Readable, SubscribeFn, UnsubscribeFn } from "./types";

export function derived<T>(
  stores: Readable<any> | Readable<any>[],
  fn: (values: any | any[]) => T,
  initialValue?: T
): Readable<T> {
  let currentValue: T;
  if (initialValue !== undefined) {
    currentValue = initialValue;
  }

  const subscribers: Record<string, ((value: T) => void) | undefined> = {};
  const storesArr = ([] as Readable<any>[]).concat(stores);
  const unsubscribeFns: UnsubscribeFn[] = [];

  const currentStoreValues = storesArr.reduce<any[]>((values, store, i) => {
    values[i] = store.get();
    return values;
  }, []);

  storesArr.forEach((store, i) => {
    const unsubscribe = store.subscribe((value) => {
      currentStoreValues[i] = value;

      _recalculateValue();
      _notifySubscribers();
    });
    unsubscribeFns.push(unsubscribe);
  });

  const get = () => currentValue;

  const subscribe = (fn: SubscribeFn<T>) => {
    const subId = nanoid();
    subscribers[subId] = fn;

    return () => {
      delete subscribers[subId];
    };
  };

  const _recalculateValue = () => {
    currentValue = fn(
      currentStoreValues.length === 1
        ? currentStoreValues[0]
        : currentStoreValues
    );
  };

  const _notifySubscribers = () => {
    Object.values(subscribers).forEach((cb) => cb?.(currentValue));
  };

  _recalculateValue();

  return { get, subscribe };
}
