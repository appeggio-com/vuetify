// Components
import { makeVToolbarTitleProps, VToolbarTitle } from '@/components/VToolbar/VToolbarTitle'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { VToolbarTitleSlots } from '@/components/VToolbar/VToolbarTitle'

export const VAppBarTitle = genericComponent<VToolbarTitleSlots>()({
  name: 'VAppBarTitle',

  props: {
    ...makeComponentProps(),
    ...makeVToolbarTitleProps(),
  },

  setup (props, { slots }) {
    useComponentBase(props)
    useRender(() => (
      <VToolbarTitle
        { ...props }
        class="v-app-bar-title"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarTitle = InstanceType<typeof VAppBarTitle>
