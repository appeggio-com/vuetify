// Styles
import './VMain.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { useLayout } from '@/composables/layout'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVMainProps = propsFactory({
  scrollable: Boolean,

  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeTagProps({ tag: 'main' }),
}, 'VMain')

export const VMain = genericComponent()({
  name: 'VMain',

  props: makeVMainProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    const { mainStyles } = useLayout()
    const { ssrBootStyles } = useSsrBoot()

    useRender(() => (
      <props.tag
        class={[
          'v-main',
          { 'v-main--scrollable': props.scrollable },
          colorClasses.value,
          props.class,
        ]}
        style={[
          mainStyles.value,
          ssrBootStyles.value,
          colorStyles.value,
          props.style,
        ]}
      >
        { props.scrollable
          ? (
            <div class="v-main__scroller">
              { slots.default?.() }
            </div>
          )
          : slots.default?.()
        }
      </props.tag>
    ))

    return {}
  },
})

export type VMain = InstanceType<typeof VMain>
