// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVToolbarItemsProps = propsFactory({
  ...makeComponentProps(),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VToolbarItems')

export const VToolbarItems = genericComponent()({
  name: 'VToolbarItems',

  props: makeVToolbarItemsProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useVariant(props)
    provideDefaults({
      VBtn: {
        bgColor: toRef(props, 'bgColor'),
        color: toRef(props, 'color'),
        fgColor: toRef(props, 'fgColor'),
        height: 'inherit',
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => (
      <div
        class={[
          'v-toolbar-items',
          colorClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          props.style,
        ]}
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VToolbarItems = InstanceType<typeof VToolbarItems>
