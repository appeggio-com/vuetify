// Styles
import './VBtnToggle.sass'

// Components
import { makeVBtnGroupProps, VBtnGroup } from '@/components/VBtnGroup/VBtnGroup'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { GroupProvide } from '@/composables/group'

export type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev'
export interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {}

export const VBtnToggleSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-btn-toggle')

type VBtnToggleSlots = {
  default: DefaultBtnToggleSlot
}

export const makeVBtnToggleProps = propsFactory({
  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeVBtnGroupProps(),
  ...makeGroupProps(),
}, 'VBtnToggle')

export const VBtnToggle = genericComponent<VBtnToggleSlots>()({
  name: 'VBtnToggle',

  props: makeVBtnToggleProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const { isSelected, next, prev, select, selected } = useGroup(props, VBtnToggleSymbol)
    const { colorClasses, colorStyles } = useColors(props)

    useRender(() => {
      const [btnGroupProps] = VBtnGroup.filterProps(props)

      return (
        <VBtnGroup
          class={[
            'v-btn-toggle',
            colorClasses.value,
            props.class,
          ]}
          { ...btnGroupProps }
          style={[
            colorStyles.value,
            props.style,
          ]}
        >
          { slots.default?.({
            isSelected,
            next,
            prev,
            select,
            selected,
          } as DefaultBtnToggleSlot)}
        </VBtnGroup>
      )
    })

    return {
      next,
      prev,
      select,
    }
  },
})

export type VBtnToggle = InstanceType<typeof VBtnToggle>
