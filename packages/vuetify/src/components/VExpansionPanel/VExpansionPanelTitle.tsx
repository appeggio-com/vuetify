// Components
import { VExpansionPanelSymbol } from './VExpansionPanels'
import { VIcon } from '@/components/VIcon'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { IconValue } from '@/composables/icons'
import { makeColorsProps, useColors } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

interface ExpansionPanelTitleSlot {
  collapseIcon: IconValue
  disabled: boolean | undefined
  expanded: boolean
  expandIcon: IconValue
  readonly: boolean
}

export type VExpansionPanelTitleSlots = {
  default: ExpansionPanelTitleSlot
  actions: ExpansionPanelTitleSlot
}

export const makeVExpansionPanelTitleProps = propsFactory({
  expandIcon: {
    type: IconValue,
    default: '$expand',
  },
  collapseIcon: {
    type: IconValue,
    default: '$collapse',
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: false,
  },
  readonly: Boolean,

  ...makeComponentProps(),
  ...makeColorsProps(),
}, 'VExpansionPanelTitle')

export const VExpansionPanelTitle = genericComponent<VExpansionPanelTitleSlots>()({
  name: 'VExpansionPanelTitle',

  directives: { Ripple },

  props: makeVExpansionPanelTitleProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel')

    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly,
    }))

    useRender(() => (
      <button
        class={[
          'v-expansion-panel-title',
          {
            'v-expansion-panel-title--active': expansionPanel.isSelected.value,
          },
          colorClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          props.style,
        ]}
        type="button"
        tabindex={ expansionPanel.disabled.value ? -1 : undefined }
        disabled={ expansionPanel.disabled.value }
        aria-expanded={ expansionPanel.isSelected.value }
        onClick={ !props.readonly ? expansionPanel.toggle : undefined }
        v-ripple={ props.ripple }
      >
        <span class="v-expansion-panel-title__overlay" />

        { slots.default?.(slotProps.value) }

        { !props.hideActions && (
          <span class="v-expansion-panel-title__icon">
            {
              slots.actions ? slots.actions(slotProps.value)
              : <VIcon icon={ expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon } />
            }
          </span>
        )}
      </button>
    ))

    return {}
  },
})

export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>
