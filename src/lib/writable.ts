import { nanoid } from "nanoid";
import { StoreOptions, UpdateOptions, Writable } from "./types";
import { devTools, assignStore, stores, getState } from "./devTools";

export function writable<T>(
  initialValue: T,
  storeOptions: StoreOptions = {}
): Writable<T> {
  let currentValue = initialValue;

  if (storeOptions.persistent && storeOptions.name) {
    let lsStorage = localStorage.getItem(storeOptions.name);
    if (lsStorage) {
      lsStorage = JSON.parse(lsStorage);
      currentValue = lsStorage as T;
    }
  } else {
    currentValue = initialValue;
  }

  const subscribers: Record<string, ((value: T) => void) | undefined> = {};

  const get = () => currentValue;

  const subscribe = (cb: (value: T) => void) => {
    const subId = nanoid();
    subscribers[subId] = cb;

    return () => {
      delete subscribers[subId];
    };
  };

  const set = (value: T, options: UpdateOptions = {}) => {
    _updateValue(value, options);
  };

  const update = (fn: (value: T) => T, options: UpdateOptions = {}) => {
    _updateValue(fn(currentValue), options);
  };

  const _updateValue = (value: T, options: UpdateOptions = {}) => {
    currentValue = value;
    _notifySubscribers();

    if (storeOptions.persistent && storeOptions.name) {
      const serializedState = JSON.stringify(currentValue);
      localStorage.setItem(storeOptions.name, serializedState);
    }

    if (devTools && storeOptions.name && stores[storeOptions.name]) {
      const msg = options.message || `${storeOptions.name} updated`;
      devTools.send(msg, { ...getState() });
    }
  };

  const _notifySubscribers = () => {
    Object.values(subscribers).forEach((cb) => cb?.(currentValue));
  };

  const store = { get, subscribe, set, update };

  if (storeOptions.name) {
    assignStore(storeOptions.name, store);
  }

  return store;
}
