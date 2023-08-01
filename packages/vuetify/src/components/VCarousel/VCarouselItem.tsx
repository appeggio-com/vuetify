// Components
import { makeVImgProps, VImg } from '@/components/VImg/VImg'
import { makeVWindowItemProps, VWindowItem } from '@/components/VWindow/VWindowItem'

// Composables
import { makeComponentProps, useComponentBase } from '@/composables/component'
import { makeColorsProps, useColors } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VImgSlots } from '@/components/VImg/VImg'

export const makeVCarouselItemProps = propsFactory({
  ...makeComponentProps(),
  ...makeColorsProps(),
  ...makeVImgProps(),
  ...makeVWindowItemProps(),
}, 'VCarouselItem')

export const VCarouselItem = genericComponent<VImgSlots>()({
  name: 'VCarouselItem',

  inheritAttrs: false,

  props: makeVCarouselItemProps(),

  setup (props, { slots, attrs }) {
    useComponentBase(props)
    const { colorClasses, colorStyles } = useColors(props)
    useRender(() => {
      const [imgProps] = VImg.filterProps(props)
      const [windowItemProps] = VWindowItem.filterProps(props)

      return (
        <VWindowItem
          class={[
            'v-carousel-item',
            colorClasses.value,
          ]}
          style={ colorStyles.value }
          { ...windowItemProps }
        >
          <VImg
            { ...attrs }
            { ...imgProps }
            v-slots={ slots }
          />
        </VWindowItem>
      )
    })
  },
})

export type VCarouselItem = InstanceType<typeof VCarouselItem>
