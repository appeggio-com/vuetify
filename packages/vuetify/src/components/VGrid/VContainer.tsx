// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { useRtl } from '@/composables/locale'
import { makeTagProps } from '@/composables/tag'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false,
  },

  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeTagProps(),
}, 'VContainer')

export const VContainer = genericComponent()({
  name: 'VContainer',

  props: makeVContainerProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { rtlClasses } = useRtl()
    const { colorClasses, colorStyles } = useColors(props)

    useRender(() => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
          rtlClasses.value,
          colorClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VContainer = InstanceType<typeof VContainer>
