// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VCardActions = genericComponent()({
  name: 'VCardActions',

  props: {
    ...makeComponentProps(),
    ...makeColorsProps(),
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    provideDefaults({
      VBtn: {
        variant: 'text',
      },
    })

    useRender(() => (
      <div
        class={[
          'v-card-actions',
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

export type VCardActions = InstanceType<typeof VCardActions>
