// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VCardActions = genericComponent()({
  name: 'VCardActions',

  props: makeComponentProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    provideDefaults({
      VBtn: {
        variant: 'text',
      },
    })

    useRender(() => (
      <div
        class={[
          'v-card-actions',
          props.class,
        ]}
        style={ props.style }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VCardActions = InstanceType<typeof VCardActions>
