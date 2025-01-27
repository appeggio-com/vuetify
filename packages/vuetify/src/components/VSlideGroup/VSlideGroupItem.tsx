// Composables
import { useComponentBase } from '@/composables/component'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utilities
import { VSlideGroupSymbol } from './VSlideGroup'
import { genericComponent } from '@/util'

// Types
import type { UnwrapRef } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

type VSlideGroupItemSlots = {
  default: {
    isSelected: UnwrapRef<GroupItemProvide['isSelected']>
    select: GroupItemProvide['select']
    toggle: GroupItemProvide['toggle']
    selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>
  }
}

export const VSlideGroupItem = genericComponent<VSlideGroupItemSlots>()({
  name: 'VSlideGroupItem',

  props: makeGroupItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol)

    return () => (
      <div class={['slide-group-item', props.class]}>
        {
          slots.default?.({
            isSelected: slideGroupItem.isSelected.value,
            select: slideGroupItem.select,
            toggle: slideGroupItem.toggle,
            selectedClass: slideGroupItem.selectedClass.value,
          })
        }
      </div>
    )
  },
})

export type VSlideGroupItem = InstanceType<typeof VSlideGroupItem>
