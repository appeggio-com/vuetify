// Utilities
import { getCurrentInstance, onMounted, onUnmounted, unref } from 'vue'
import { propsFactory } from '@/util/propsFactory'

// Types
import type { PropType, StyleValue } from 'vue'
import type { MaybeRef } from '@/util'

export type ClassValue = any

export interface ComponentProps {
  class?: ClassValue
  style: StyleValue | undefined
  hook?: Function | boolean
}

// Composables
export const makeComponentProps = propsFactory({
  class: [String, Array] as PropType<ClassValue>,
  style: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: null,
  },
  hook: [Function, Boolean],
}, 'component')

export function useComponentBase (props: MaybeRef<ComponentProps>) {
  onMounted(() => {
    const { hook } = unref(props)
    if (typeof hook === 'function') {
      hook('mounted', getCurrentInstance())
    }
  })

  onUnmounted(() => {
    const { hook } = unref(props)
    if (typeof hook === 'function') {
      hook('unmount', getCurrentInstance())
    }
  })
}
