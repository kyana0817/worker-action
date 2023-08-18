export type ActionFunc = (...args: never[]) => unknown
export type ActionParams<T extends ActionFunc> = T extends (...args: infer I) => unknown? I: never

export type WorkerActions = Record<string, ActionFunc>

export type GlobalScope = typeof globalThis | WorkerGlobalScope

export type ExposeFn = <T extends WorkerActions>(actions: T, worker: GlobalScope) => T

export type ClientMessage<T extends WorkerActions, K extends keyof T = keyof T> = {
  id: string;
  type: K,
  args: ActionParams<T[K]>
}

// export type WorkerMessage<T extends WorkerActions, >

export type WrapFn = <T extends WorkerActions = WorkerActions>(worker: Worker) => {
  exec<K extends keyof T>(type: K, ...args: ActionParams<T[K]>): Promise<ReturnType<T[K]>>,
  terminate(): void
}

// type-guard
export const isDedicatedWorkerScope = (obj: GlobalScope): obj is DedicatedWorkerGlobalScope => {
  return obj instanceof DedicatedWorkerGlobalScope
}