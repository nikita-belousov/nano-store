export type SubscribeFn<T> = (value: T) => void;

export type UnsubscribeFn = () => void;

export type UpdateValueFn<T> = (value: T) => T;

export interface Readable<T> {
  subscribe: (fn: SubscribeFn<T>) => UnsubscribeFn;
  get: () => T;
}

export interface Writable<T> extends Readable<T> {
  set: (value: T, options?: UpdateOptions) => void;
  update: (fn: UpdateValueFn<T>, options?: UpdateOptions) => void;
}

export interface StoreOptions {
  name?: string;
  persistent?: boolean;
}

export interface UpdateOptions {
  message?: string;
}
