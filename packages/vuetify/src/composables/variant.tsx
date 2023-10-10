// Composables
import { useColor } from '@/composables/color'

// Utilities
import { computed, unref } from 'vue'
import { isCssColor } from '@/util'
import { getCurrentInstanceName } from '@/util/getCurrentInstance'
import { propsFactory } from '@/util/propsFactory'

// Types
import type { CSSProperties, PropType, Ref } from 'vue'
import type { MaybeRef } from '@/util'

export function genOverlays (isClickable: boolean, name: string) {
  return (
    <>
      { isClickable && <span key="overlay" class={ `${name}__overlay` } /> }

      <span key="underlay" class={ `${name}__underlay` } />
    </>
  )
}

function makeSharedStyles (
  props: MaybeRef<ColorsProps>,
  colorStyles: Ref<CSSProperties>
) {
  const injectedStyles = computed(() => {
    const { zIndex, borderColor, borderStyle, borderWidth, opacity } = unref(props)
    const styles = unref(colorStyles)

    if (zIndex || zIndex === 0) {
      styles.zIndex = zIndex
      return styles
    }

    if (borderColor && borderWidth) {
      styles.borderWidth = !isNaN(Number(borderWidth)) ? `${borderWidth}px` : borderWidth
      styles.borderStyle = borderStyle
      styles.borderColor = isCssColor(borderColor) ? borderColor : `rgb(var(--v-theme-${borderColor}))`
    }

    if (opacity) {
      styles.opacity = opacity
    }

    return styles
  })

  return { injectedStyles }
}

export const allowedVariants = [
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text',
  'plain',
] as const

export type Variant = typeof allowedVariants[number]

export interface VariantProps {
  bgColor?: string
  color?: string
  fgColor?: string
  variant: Variant
  zIndex?: number | string
  borderWidth?: number | string
  borderStyle: string
  borderColor?: string
  opacity?: number
}

export const makeVariantProps = propsFactory({
  bgColor: String,
  color: String,
  fgColor: String,
  variant: {
    type: String as PropType<Variant>,
    default: 'elevated',
    validator: (v: any) => allowedVariants.includes(v),
  },
  zIndex: [Number, String],
  borderWidth: {
    type: [Number, String],
  },
  borderStyle: {
    type: String,
    default: 'solid',
  },
  borderColor: {
    type: String,
  },
  opacity: {
    type: Number,
  },
}, 'variant')

export interface ColorsProps {
  bgColor?: string
  color?: string
  fgColor?: string
  zIndex?: number | string
  borderWidth?: number | string
  borderStyle: string
  borderColor?: string
  opacity?: number
}

export const makeColorsProps = propsFactory({
  bgColor: String,
  color: String,
  fgColor: String,
  zIndex: [Number, String],
  borderWidth: {
    type: [Number, String],
  },
  borderStyle: {
    type: String,
    default: 'solid',
  },
  borderColor: {
    type: String,
  },
  opacity: {
    type: Number,
  },
}, 'colors')

export function useVariant (
  props: MaybeRef<VariantProps>,
  name = getCurrentInstanceName(),
) {
  const variantClasses = computed(() => {
    const { variant } = unref(props)
    return `${name}--variant-${variant}`
  })

  const { colorClasses, colorStyles } = useColor(computed(() => {
    const { bgColor, fgColor, variant } = unref(props)
    const obj: { background?: string, text?: string } = {}
    if (variant === 'text' || variant === 'plain') {
      if (fgColor) {
        obj.text = fgColor
        if (bgColor) {
          obj.background = bgColor
        }
      } else if (bgColor) {
        obj.text = bgColor
      }
    } else {
      if (bgColor) {
        obj.background = bgColor
      }
      if (fgColor) {
        obj.text = fgColor
      }
    }
    return obj
  }))

  const { injectedStyles } = makeSharedStyles(props, colorStyles)

  return { colorClasses, colorStyles: injectedStyles, variantClasses }
}

export function useColors (
  props: MaybeRef<ColorsProps>,
  name = getCurrentInstanceName(),
) {
  const { colorClasses, colorStyles } = useColor(computed(() => {
    const { bgColor, fgColor } = unref(props)
    const obj: { background?: string, text?: string } = {}
    if (bgColor) {
      obj.background = bgColor
    }
    if (fgColor) {
      obj.text = fgColor
    }
    return obj
  }))

  const { injectedStyles } = makeSharedStyles(props, colorStyles)

  return { colorClasses, colorStyles: injectedStyles }
}
