// Components
import { makeVToolbarTitleProps, VToolbarTitle } from '@/components/VToolbar/VToolbarTitle'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { VToolbarTitleSlots } from '@/components/VToolbar/VToolbarTitle'

export const VAppBarTitle = genericComponent<VToolbarTitleSlots>()({
  name: 'VAppBarTitle',

  props: {
    ...makeComponentProps(),
    ...makeColorsProps(),
    ...makeVToolbarTitleProps(),
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    useRender(() => (
      <VToolbarTitle
        { ...props }
        class={[
          'v-app-bar-title',
          colorClasses.value,
        ]}
        style={ colorStyles.value }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarTitle = InstanceType<typeof VAppBarTitle>
