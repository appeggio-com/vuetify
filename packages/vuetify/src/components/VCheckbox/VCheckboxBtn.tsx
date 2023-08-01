// Components
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'

export const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate',
  },

  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeVSelectionControlProps({
    falseIcon: '$checkboxOff',
    trueIcon: '$checkboxOn',
  }),
}, 'VCheckboxBtn')

export const VCheckboxBtn = genericComponent<VSelectionControlSlots>()({
  name: 'VCheckboxBtn',

  props: makeVCheckboxBtnProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { slots }) {
    useComponentBase(props)
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const model = useProxiedModel(props, 'modelValue')
    const { colorClasses, colorStyles } = useColors(props)

    function onChange (v: any) {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    const falseIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.falseIcon
    })

    const trueIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.trueIcon
    })

    useRender(() => (
      <VSelectionControl
        { ...props }
        v-model={ model.value }
        class={[
          'v-checkbox-btn',
          colorClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          props.style,
        ]}
        type="checkbox"
        onUpdate:modelValue={ onChange }
        falseIcon={ falseIcon.value }
        trueIcon={ trueIcon.value }
        aria-checked={ indeterminate.value ? 'mixed' : undefined }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VCheckboxBtn = InstanceType<typeof VCheckboxBtn>
