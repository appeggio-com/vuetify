// Components
import { VExpansionPanelSymbol } from './VExpansionPanels'
import { VExpandTransition } from '@/components/transitions'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeLazyProps, useLazy } from '@/composables/lazy'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeLazyProps(),
}, 'VExpansionPanelText')

export const VExpansionPanelText = genericComponent()({
  name: 'VExpansionPanelText',

  props: makeVExpansionPanelTextProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel')

    const { hasContent, onAfterLeave } = useLazy(props, expansionPanel.isSelected)

    useRender(() => (
      <VExpandTransition onAfterLeave={ onAfterLeave }>
        <div
          class={[
            'v-expansion-panel-text',
            colorClasses.value,
            props.class,
          ]}
          style={[
            colorStyles.value,
            props.style,
          ]}
          v-show={ expansionPanel.isSelected.value }
        >
          { slots.default && hasContent.value && (
            <div class="v-expansion-panel-text__wrapper">
              { slots.default?.() }
            </div>
          )}
        </div>
      </VExpandTransition>
    ))

    return {}
  },
})

export type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>
