// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { camelize, capitalize, h } from 'vue'
import { genericComponent } from './defineComponent'

export function createSimpleFunctional (
  klass: string,
  tag = 'div',
  name?: string
) {
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, '-'))),

    props: {
      tag: {
        type: String,
        default: tag,
      },

      ...makeComponentProps(),
      ...makeColorsProps(),
      ...makeDimensionProps(),
    },

    setup (props, { slots }) {
      useComponentBase(props)
      const { colorClasses, colorStyles } = useColors(props)
      const { dimensionStyles } = useDimension(props)
      return () => {
        return h(props.tag, {
          class: [klass, colorClasses.value, props.class],
          style: [colorStyles.value, dimensionStyles.value, props.style],
        }, slots.default?.())
      }
    },
  })
}
