// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
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
    },

    setup (props, { slots }) {
      useComponentBase(props)
      const { colorClasses, colorStyles } = useColors(props)
      return () => {
        return h(props.tag, {
          class: [klass, colorClasses.value, props.class],
          style: [colorStyles.value, props.style],
        }, slots.default?.())
      }
    },
  })
}
