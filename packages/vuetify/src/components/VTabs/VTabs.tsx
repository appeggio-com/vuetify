// Styles
import './VTabs.sass'

// Components
import { VTab } from './VTab'
import { makeVSlideGroupProps, VSlideGroup } from '@/components/VSlideGroup/VSlideGroup'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTagProps } from '@/composables/tag'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTabsSymbol } from './shared'

export type TabItem = string | number | Record<string, any>

function parseItems (items: readonly TabItem[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (!isObject(item)) return { text: item, value: item }

    return item
  })
}

export const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String as PropType<'start' | 'title' | 'center' | 'end'>,
    default: 'start',
  },
  fixedTabs: Boolean,
  items: {
    type: Array as PropType<readonly TabItem[]>,
    default: () => ([]),
  },
  stacked: Boolean,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: undefined,
  },
  hideSlider: Boolean,
  sliderColor: String,

  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeVSlideGroupProps({ mandatory: 'force' as const }),
  ...makeDensityProps(),
  ...makeTagProps(),
}, 'VTabs')

export const VTabs = genericComponent()({
  name: 'VTabs',

  props: makeVTabsProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const model = useProxiedModel(props, 'modelValue')
    const parsedItems = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)
    const { colorClasses, colorStyles } = useColors(props)

    provideDefaults({
      VTab: {
        bgColor: toRef(props, 'bgColor'),
        color: toRef(props, 'color'),
        fgColor: toRef(props, 'fgColor'),
        direction: toRef(props, 'direction'),
        stacked: toRef(props, 'stacked'),
        fixed: toRef(props, 'fixedTabs'),
        sliderColor: toRef(props, 'sliderColor'),
        hideSlider: toRef(props, 'hideSlider'),
      },
    })

    useRender(() => {
      const [slideGroupProps] = VSlideGroup.filterProps(props)

      return (
        <VSlideGroup
          { ...slideGroupProps }
          v-model={ model.value }
          class={[
            'v-tabs',
            `v-tabs--${props.direction}`,
            `v-tabs--align-tabs-${props.alignTabs}`,
            {
              'v-tabs--fixed-tabs': props.fixedTabs,
              'v-tabs--grow': props.grow,
              'v-tabs--stacked': props.stacked,
            },
            densityClasses.value,
            colorClasses.value,
            props.class,
          ]}
          style={[
            { '--v-tabs-height': convertToUnit(props.height) },
            colorStyles.value,
            props.style,
          ]}
          role="tablist"
          symbol={ VTabsSymbol }
        >
          { slots.default ? slots.default() : parsedItems.value.map(item => (
            <VTab { ...item } key={ item.text } />
          ))}
        </VSlideGroup>
      )
    })

    return {}
  },
})

export type VTabs = InstanceType<typeof VTabs>
