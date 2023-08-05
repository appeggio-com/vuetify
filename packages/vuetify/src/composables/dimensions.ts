// Utilities
import { computed } from 'vue'
import { useDisplay } from './display'
import { convertToUnit } from '@/util/helpers'
import { propsFactory } from '@/util/propsFactory'

// Types
export interface DimensionProps {
  height?: number | string
  heightSm?: number | string
  heightMd?: number | string
  heightLg?: number | string
  heightXl?: number | string
  heightXxl?: number | string
  maxHeight?: number | string
  maxHeightSm?: number | string
  maxHeightMd?: number | string
  maxHeightLg?: number | string
  maxHeightXl?: number | string
  maxHeightXxl?: number | string
  maxWidth?: number | string
  maxWidthSm?: number | string
  maxWidthMd?: number | string
  maxWidthLg?: number | string
  maxWidthXl?: number | string
  maxWidthXxl?: number | string
  minHeight?: number | string
  minHeightSm?: number | string
  minHeightMd?: number | string
  minHeightLg?: number | string
  minHeightXl?: number | string
  minHeightXxl?: number | string
  minWidth?: number | string
  minWidthSm?: number | string
  minWidthMd?: number | string
  minWidthLg?: number | string
  minWidthXl?: number | string
  minWidthXxl?: number | string
  width?: number | string
  widthSm?: number | string
  widthMd?: number | string
  widthLg?: number | string
  widthXl?: number | string
  widthXxl?: number | string
}

// Composables
export const makeDimensionProps = propsFactory({
  height: [Number, String],
  heightSm: [Number, String],
  heightMd: [Number, String],
  heightLg: [Number, String],
  heightXl: [Number, String],
  heightXxl: [Number, String],
  maxHeight: [Number, String],
  maxHeightSm: [Number, String],
  maxHeightMd: [Number, String],
  maxHeightLg: [Number, String],
  maxHeightXl: [Number, String],
  maxHeightXxl: [Number, String],
  maxWidth: [Number, String],
  maxWidthSm: [Number, String],
  maxWidthMd: [Number, String],
  maxWidthLg: [Number, String],
  maxWidthXl: [Number, String],
  maxWidthXxl: [Number, String],
  minHeight: [Number, String],
  minHeightSm: [Number, String],
  minHeightMd: [Number, String],
  minHeightLg: [Number, String],
  minHeightXl: [Number, String],
  minHeightXxl: [Number, String],
  minWidth: [Number, String],
  minWidthSm: [Number, String],
  minWidthMd: [Number, String],
  minWidthLg: [Number, String],
  minWidthXl: [Number, String],
  minWidthXxl: [Number, String],
  width: [Number, String],
  widthSm: [Number, String],
  widthMd: [Number, String],
  widthLg: [Number, String],
  widthXl: [Number, String],
  widthXxl: [Number, String],
}, 'dimension')

export function useDimension (props: DimensionProps) {
  const display = useDisplay()

  const dimensionStyles = computed(() => ({
    height: convertToUnit(getBreakpointedValue(props, 'height', display.name.value)),
    maxHeight: convertToUnit(getBreakpointedValue(props, 'maxHeight', display.name.value)),
    maxWidth: convertToUnit(getBreakpointedValue(props, 'maxWidth', display.name.value)),
    minHeight: convertToUnit(getBreakpointedValue(props, 'minHeight', display.name.value)),
    minWidth: convertToUnit(getBreakpointedValue(props, 'minWidth', display.name.value)),
    width: convertToUnit(getBreakpointedValue(props, 'width', display.name.value)),
  }))

  return { dimensionStyles }
}

function getBreakpointedValue (props: DimensionProps, key: keyof DimensionProps, breakpoint: string): string | number | undefined {
  if (breakpoint === 'xs') {
    return props[key]
  } else if (breakpoint === 'sm') {
    return props[(key + 'Sm') as keyof DimensionProps] ??
           props[key]
  } else if (breakpoint === 'md') {
    return props[(key + 'Md') as keyof DimensionProps] ??
           props[(key + 'Sm') as keyof DimensionProps] ??
           props[key]
  } else if (breakpoint === 'lg') {
    return props[(key + 'Lg') as keyof DimensionProps] ??
           props[(key + 'Md') as keyof DimensionProps] ??
           props[(key + 'Sm') as keyof DimensionProps] ??
           props[key]
  } else if (breakpoint === 'xl') {
    return props[(key + 'Xl') as keyof DimensionProps] ??
           props[(key + 'Lg') as keyof DimensionProps] ??
           props[(key + 'Md') as keyof DimensionProps] ??
           props[(key + 'Sm') as keyof DimensionProps] ??
           props[key]
  } else if (breakpoint === 'xxl') {
    return props[(key + 'Xxl') as keyof DimensionProps] ??
           props[(key + 'Xl') as keyof DimensionProps] ??
           props[(key + 'Lg') as keyof DimensionProps] ??
           props[(key + 'Md') as keyof DimensionProps] ??
           props[(key + 'Sm') as keyof DimensionProps] ??
           props[key]
  }
  return undefined
}
