// Styles
import './VBanner.sass'

// Components
import { VBannerActions } from './VBannerActions'
import { VBannerText } from './VBannerText'
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useDisplay } from '@/composables/display'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VBannerSlots = {
  default: never
  prepend: never
  text: never
  actions: never
}

export const makeVBannerProps = propsFactory({
  avatar: String,
  icon: IconValue,
  lines: String as PropType<'one' | 'two' | 'three'>,
  stacked: Boolean,
  sticky: Boolean,
  text: String,

  ...makeColorsProps(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VBanner')

export const VBanner = genericComponent<VBannerSlots>()({
  name: 'VBanner',

  props: makeVBannerProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { mobile } = useDisplay()
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const { colorClasses, colorStyles } = useColors(props)

    const { themeClasses } = provideTheme(props)

    const bgColor = toRef(props, 'bgColor')
    const color = toRef(props, 'color')
    const fgColor = toRef(props, 'fgColor')
    const density = toRef(props, 'density')

    provideDefaults({ VBannerActions: { bgColor, color, fgColor, density } })

    useRender(() => {
      const hasText = !!(props.text || slots.text)
      const hasPrependMedia = !!(props.avatar || props.icon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)

      return (
        <props.tag
          class={[
            'v-banner',
            {
              'v-banner--stacked': props.stacked || mobile.value,
              'v-banner--sticky': props.sticky,
              [`v-banner--${props.lines}-line`]: !!props.lines,
            },
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            themeClasses.value,
            colorClasses.value,
            props.class,
          ]}
          style={[
            dimensionStyles.value,
            locationStyles.value,
            colorStyles.value,
            props.style,
          ]}
          role="banner"
        >
          { hasPrepend && (
            <div key="prepend" class="v-banner__prepend">
              { !slots.prepend ? (
                <VAvatar
                  key="prepend-avatar"
                  color={ color.value }
                  density={ density.value }
                  icon={ props.icon }
                  image={ props.avatar }
                />
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !hasPrependMedia }
                  defaults={{
                    VAvatar: {
                      bgColor: bgColor.value,
                      color: color.value,
                      fgColor: fgColor.value,
                      density: density.value,
                      icon: props.icon,
                      image: props.avatar,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </div>
          )}

          <div class="v-banner__content">
            { hasText && (
              <VBannerText key="text">
                { slots.text?.() ?? props.text }
              </VBannerText>
            )}

            { slots.default?.() }
          </div>

          { slots.actions && (
            <VBannerActions key="actions" v-slots:default={ slots.actions } />
          )}
        </props.tag>
      )
    })
  },
})

export type VBanner = InstanceType<typeof VBanner>
