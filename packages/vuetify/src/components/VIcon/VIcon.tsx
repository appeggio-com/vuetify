// Styles
import './VIcon.sass'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { IconValue, useIcon } from '@/composables/icons'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { computed, ref, Text } from 'vue'
import { convertToUnit, flattenFragments, genericComponent, propsFactory, useRender } from '@/util'

export const makeVIconProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,

  ...makeColorsProps(),
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'i' }),
  ...makeThemeProps(),
}, 'VIcon')

export const VIcon = genericComponent()({
  name: 'VIcon',

  props: makeVIconProps(),

  setup (props, { attrs, slots }) {
    useComponentBase(props)
    const slotIcon = ref<string>()

    const { themeClasses } = provideTheme(props)
    const { iconData } = useIcon(computed(() => slotIcon.value || props.icon))
    const { sizeClasses } = useSize(props)
    const { colorClasses, colorStyles } = useColors(props)

    useRender(() => {
      const slotValue = slots.default?.()
      if (slotValue) {
        slotIcon.value = flattenFragments(slotValue).filter(node =>
          node.type === Text && node.children && typeof node.children === 'string'
        )[0]?.children as string
      }

      return (
        <iconData.value.component
          tag={ props.tag }
          icon={ iconData.value.icon }
          class={[
            'v-icon',
            'notranslate',
            themeClasses.value,
            sizeClasses.value,
            colorClasses.value,
            {
              'v-icon--clickable': !!attrs.onClick,
              'v-icon--start': props.start,
              'v-icon--end': props.end,
            },
            props.class,
          ]}
          style={[
            !sizeClasses.value ? ({
              fontSize: convertToUnit(props.size),
              height: convertToUnit(props.size),
              width: convertToUnit(props.size),
            }) : undefined,
            colorStyles.value,
            props.style,
          ]}
          role={ attrs.onClick ? 'button' : undefined }
          aria-hidden={ !attrs.onClick }
        >
          { slotValue }
        </iconData.value.component>
      )
    })

    return {}
  },
})

export type VIcon = InstanceType<typeof VIcon>
