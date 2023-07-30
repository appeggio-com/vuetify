// Composables
import { useColor } from '@/composables/color'

// Utilities
import { computed, unref } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { MaybeRef } from '@/util'

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
}

export function genOverlays (isClickable: boolean, name: string) {
  return (
    <>
      { isClickable && <span key="overlay" class={ `${name}__overlay` } /> }

      <span key="underlay" class={ `${name}__underlay` } />
    </>
  )
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
}, 'variant')

export interface ColorsProps {
  bgColor?: string
  color?: string
  fgColor?: string
}

export const makeColorsProps = propsFactory({
  bgColor: String,
  color: String,
  fgColor: String,
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

  return { colorClasses, colorStyles, variantClasses }
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

  return { colorClasses, colorStyles }
}
