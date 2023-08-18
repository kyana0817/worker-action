import { isDedicatedWorkerScope } from './types'
import { generateID } from './utils'
import type {
  ClientMessage,
  ExposeFn,
  WrapFn,
} from './types'


export const expose: ExposeFn = (actions, worker = globalThis) => {
  if (!(worker instanceof WorkerGlobalScope)) throw new Error('Warning: outside in worker scope')

  if (isDedicatedWorkerScope(worker)) {
    worker.onmessage = async ({ data }: MessageEvent<string>) => {
      const {
        id, type, args 
      }: ClientMessage<typeof actions> = JSON.parse(data)
      const payload = await actions[type](...args)

      worker.postMessage(JSON.stringify({ id, payload }))
    }
  } else {
    throw new Error('Warning: not support Worker!')
  }

  return actions
}

export const wrap: WrapFn = (worker) => {
  return {
    exec(type, ...args) {
      const id = generateID()
      worker.postMessage(JSON.stringify({
        id, type, args
      }))

      return new Promise(resolve => {
        worker.addEventListener('message', function callback({ data }: MessageEvent<string>) {
          const {
            id: reciveId, payload 
          } = JSON.parse(data)
          if (id !== reciveId) return
  
          worker.removeEventListener('message', callback)
          resolve(payload)
        })
      })
    },
    terminate() {
      worker.terminate()
    }
  }
}
