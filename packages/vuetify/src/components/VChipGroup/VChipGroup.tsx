// Styles
import './VChipGroup.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { deepEqual, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group')

export const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeComponentProps(),
  ...makeGroupProps({ selectedClass: 'v-chip--selected' }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'tonal' } as const),
}, 'VChipGroup')

type VChipGroupSlots = {
  default: {
    isSelected: (id: number) => boolean
    select: (id: number, value: boolean) => void
    next: () => void
    prev: () => void
    selected: readonly number[]
  }
}

export const VChipGroup = genericComponent<VChipGroupSlots>()({
  name: 'VChipGroup',

  props: makeVChipGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useVariant(props)
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VChipGroupSymbol)

    provideDefaults({
      VChip: {
        bgColor: toRef(props, 'bgColor'),
        color: toRef(props, 'color'),
        fgColor: toRef(props, 'fgColor'),
        disabled: toRef(props, 'disabled'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-chip-group',
          {
            'v-chip-group--column': props.column,
          },
          themeClasses.value,
          colorClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          props.style,
        ]}
      >
        { slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value,
        })}
      </props.tag>
    ))

    return {}
  },
})

export type VChipGroup = InstanceType<typeof VChipGroup>
