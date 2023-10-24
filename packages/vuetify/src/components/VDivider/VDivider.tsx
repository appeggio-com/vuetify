// Styles
import './VDivider.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'maxHeight' | 'maxWidth'
type DividerStyles = Partial<Record<DividerKey, string>>

export const makeVDividerProps = propsFactory({
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeColorsProps(),
}, 'VDivider')

export const VDivider = genericComponent()({
  name: 'VDivider',

  props: makeVDividerProps(),

  setup (props, { attrs }) {
    useComponentBase(props)
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles } = useColors(props)
    const dividerStyles = computed(() => {
      const styles: DividerStyles = {}

      if (props.length) {
        styles[props.vertical ? 'maxHeight' : 'maxWidth'] = convertToUnit(props.length)
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness)
      }

      return styles
    })

    useRender(() => (
      <hr
        class={[
          {
            'v-divider': true,
            'v-divider--inset': props.inset,
            'v-divider--vertical': props.vertical,
          },
          themeClasses.value,
          colorClasses.value,
          props.class,
        ]}
        style={[
          dividerStyles.value,
          colorStyles.value,
          props.style,
        ]}
        aria-orientation={
          !attrs.role || attrs.role === 'separator'
            ? props.vertical ? 'vertical' : 'horizontal'
            : undefined
        }
        role={ `${attrs.role || 'separator'}` }
      />
    ))

    return {}
  },
})

export type VDivider = InstanceType<typeof VDivider>
