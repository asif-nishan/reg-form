// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/test': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/test').default>>>>
    }
    '/api/user': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user/index').default>>>>
    }
    '/api/user/post': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user/post').default>>>>
    }
    '/api/user/update': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user/update').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}