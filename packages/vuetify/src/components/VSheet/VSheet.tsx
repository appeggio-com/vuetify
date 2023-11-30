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
    type: [String, Number],
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
        res.opacity = String(props.bgOpacity)
      }

      return res
    })

    useRender(() => (
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
        ]}
        style={[
          colorStyles.value,
          dimensionStyles.value,
          locationStyles.value,
          {
            position: 'relative',
          },
        ]}
      >
        { !props.bgImage ? null : (
          <div
            key="sheet-bg"
            style={[
              styles.value,
              {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 0,
              },
            ]}
          />
        )}
        <div class={ props.class } style={[{ zIndex: 1 }, props.style]}>
          { slots.default?.() }
        </div>
      </props.tag>
    ))

    return {}
  },
})

export type VSheet = InstanceType<typeof VSheet>
