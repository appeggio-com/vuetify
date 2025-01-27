// Styles
import './VExpansionPanel.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

const allowedVariants = ['default', 'accordion', 'inset', 'popout'] as const

type Variant = typeof allowedVariants[number]

export const makeVExpansionPanelsProps = propsFactory({
  variant: {
    type: String as PropType<Variant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
  readonly: Boolean,

  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeGroupProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VExpansionPanels')

export const VExpansionPanels = genericComponent()({
  name: 'VExpansionPanels',

  props: makeVExpansionPanelsProps(),

  emits: {
    'update:modelValue': (val: unknown) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    useGroup(props, VExpansionPanelSymbol)
    const { colorClasses, colorStyles } = useColors(props)

    const { themeClasses } = provideTheme(props)

    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`)

    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(props, 'bgColor'),
        color: toRef(props, 'color'),
        fgColor: toRef(props, 'fgColor'),
      },
      VExpansionPanelTitle: {
        readonly: toRef(props, 'readonly'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-expansion-panels',
          themeClasses.value,
          variantClass.value,
          colorClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VExpansionPanels = InstanceType<typeof VExpansionPanels>
