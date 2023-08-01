// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVToolbarTitleProps = propsFactory({
  text: String,

  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeTagProps(),
}, 'VToolbarTitle')

export type VToolbarTitleSlots = {
  default: never
  text: never
}

export const VToolbarTitle = genericComponent<VToolbarTitleSlots>()({
  name: 'VToolbarTitle',

  props: makeVToolbarTitleProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text)

      return (
        <props.tag
          class={[
            'v-toolbar-title',
            colorClasses.value,
            props.class,
          ]}
          style={[
            colorStyles.value,
            props.style,
          ]}
        >
          { hasText && (
            <div class="v-toolbar-title__placeholder">
              { slots.text ? slots.text() : props.text }

              { slots.default?.() }
            </div>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VToolbarTitle = InstanceType<typeof VToolbarTitle>
