// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVSheetProps = propsFactory({
  bgImage: String,
  bgPosition: {
    type: String,
    default: 'center center',
  },
  bgRepeat: {
    type: String,
    default: 'no-repeat',
  },
  bgSize: {
    type: String,
    default: 'contain',
  },
  bgOpacity: {
    type: [Number, String],
  },

  ...makeColorsProps(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VSheet')

export const VSheet = genericComponent()({
  name: 'VSheet',

  props: makeVSheetProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles } = useColors(props)
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    const styles = computed(() => {
      const res: Record<string, string> = {}

      if (props.bgImage) {
        res.backgroundImage = `url(${props.bgImage})`
        res.backgroundPosition = props.bgPosition
        res.backgroundRepeat = props.bgRepeat
        res.backgroundSize = props.bgSize
      }

      return res
    })

    useRender(() => {
      if (props.bgOpacity === undefined || props.bgOpacity === '') {
        return (
          <props.tag
            class={[
              'v-sheet',
              themeClasses.value,
              colorClasses.value,
              borderClasses.value,
              elevationClasses.value,
              positionClasses.value,
              roundedClasses.value,
              props.class,
            ]}
            style={[
              colorStyles.value,
              dimensionStyles.value,
              locationStyles.value,
              styles.value,
              props.style,
            ]}
            v-slots={ slots }
          />
        )
      }
      return (
        <props.tag
          class={[
            'v-sheet',
            'd-flex',
            themeClasses.value,
            colorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            locationStyles.value,
            props.style,
            {
              position: 'relative',
            },
          ]}
        >
          { !props.bgImage ? null : (
            <img
              key="bgimage"
              src={ props.bgImage }
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                opacity: props.bgOpacity,
                objectPosition: props.bgPosition || 'center',
                objectFit: (props.bgSize as any) || 'cover',
                zIndex: 0,
              }}
            />
          )}
          <div style={{ zIndex: 1, flexGrow: 1 }}>
            { slots.default?.() }
          </div>
        </props.tag>
      )
    })

    return {}
  },
})

export type VSheet = InstanceType<typeof VSheet>
