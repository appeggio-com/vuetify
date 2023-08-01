// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],

  ...makeComponentProps(),
}, 'VBreadcrumbsDivider')

export const VBreadcrumbsDivider = genericComponent()({
  name: 'VBreadcrumbsDivider',

  props: makeVBreadcrumbsDividerProps(),

  setup (props, { slots }) {
    useComponentBase(props)
    useRender(() => (
      <li
        class={[
          'v-breadcrumbs-divider',
          props.class,
        ]}
        style={ props.style }
      >
        { slots?.default?.() ?? props.divider }
      </li>
    ))

    return {}
  },
})

export type VBreadcrumbsDivider = InstanceType<typeof VBreadcrumbsDivider>
