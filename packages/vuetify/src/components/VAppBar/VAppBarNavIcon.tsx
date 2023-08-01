// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VBtnSlots } from '@/components/VBtn/VBtn'

export const makeVAppBarNavIconProps = propsFactory({
  ...makeComponentProps(),
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
    useRender(() => (
      <VBtn
        { ...props }
        class={[
          'v-app-bar-nav-icon',
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarNavIcon = InstanceType<typeof VAppBarNavIcon>
