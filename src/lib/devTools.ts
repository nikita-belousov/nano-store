import { Readable } from "./types";

export const stores: Record<string, Readable<any>> = {};
export let devTools: any;

export function initDevTools() {
  if (!("__REDUX_DEVTOOLS_EXTENSION__" in window)) return;

  devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ as any).connect({});

  devTools.init({ value: null });
}

export function assignStore(name: string, store: Readable<any>) {
  stores[name] = store;
}

export function getState() {
  return Object.keys(stores).reduce<Record<string, any>>((state, name) => {
    const store = stores[name];
    state[name] = store.get();
    return state;
  }, {});
}
