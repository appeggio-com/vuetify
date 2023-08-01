// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VBtnSlots } from '@/components/VBtn/VBtn'

export const makeVAppBarNavIconProps = propsFactory({
  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeVBtnProps({
    icon: '$menu',
    variant: 'text' as const,
  }),
}, 'VAppBarNavIcon')

export const VAppBarNavIcon = genericComponent<VBtnSlots>()({
  name: 'VAppBarNavIcon',

  props: makeVAppBarNavIconProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    useRender(() => (
      <VBtn
        { ...props }
        class={[
          'v-app-bar-nav-icon',
          colorClasses.value,
        ]}
        style={ colorStyles.value }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarNavIcon = InstanceType<typeof VAppBarNavIcon>
