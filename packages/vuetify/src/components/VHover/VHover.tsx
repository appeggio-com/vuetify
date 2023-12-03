// Composables
import { makeDelayProps, useDelay } from '@/composables/delay'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory } from '@/util'

type VHoverSlots = {
  default: {
    isHovering: boolean | undefined
    props: Record<string, unknown>
  }
}

export const makeVHoverProps = propsFactory({
  disabled: Boolean,
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  tag: {
    type: String,
    default: 'div',
  },

  ...makeDelayProps(),
}, 'VHover')

export const VHover = genericComponent<VHoverSlots>()({
  name: 'VHover',

  props: makeVHoverProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isHovering = useProxiedModel(props, 'modelValue')
    const { runOpenDelay, runCloseDelay } = useDelay(props, value => !props.disabled && (isHovering.value = value))

    return () => (
      <props.tag>
        {
          slots.default?.({
            isHovering: isHovering.value,
            props: {
              onMouseenter: runOpenDelay,
              onMouseleave: runCloseDelay,
            },
          })
        }
      </props.tag>
    )
  },
})

export type VHover = InstanceType<typeof VHover>
