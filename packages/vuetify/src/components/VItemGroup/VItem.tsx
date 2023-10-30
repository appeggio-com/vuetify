// Composables
import { VItemGroupSymbol } from './VItemGroup'
import { useComponentBase } from '@/composables/component'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utilities
import { genericComponent } from '@/util'

type VItemSlots = {
  default: {
    isSelected: boolean | undefined
    selectedClass: boolean | (string | undefined)[] | undefined
    select: ((value: boolean) => void) | undefined
    toggle: (() => void) | undefined
    value: unknown
    disabled: boolean | undefined
  }
}

export const VItem = genericComponent<VItemSlots>()({
  name: 'VItem',

  props: makeGroupItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const { isSelected, select, toggle, selectedClass, value, disabled } = useGroupItem(props, VItemGroupSymbol)
    return () => slots.default?.({
      isSelected: isSelected.value,
      selectedClass: selectedClass.value,
      select,
      toggle,
      value: value.value,
      disabled: disabled.value,
    })
  },
})

export type VItem = InstanceType<typeof VItem>
