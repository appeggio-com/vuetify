// Styles
import './VLayout.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { createLayout, makeLayoutProps } from '@/composables/layout'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeLayoutProps(),
}, 'VLayout')

export const VLayout = genericComponent()({
  name: 'VLayout',

  props: makeVLayoutProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(props)

    useRender(() => (
      <div
        ref={ layoutRef }
        class={[
          layoutClasses.value,
          colorClasses.value,
          props.class,
        ]}
        style={[
          layoutStyles.value,
          colorStyles.value,
          props.style,
        ]}
      >
        { slots.default?.() }
      </div>
    ))

    return {
      getLayoutItem,
      items,
    }
  },
})

export type VLayout = InstanceType<typeof VLayout>
