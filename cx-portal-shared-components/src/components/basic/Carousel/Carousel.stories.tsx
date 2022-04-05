import { ComponentStory } from '@storybook/react'

import { Carousel as Component } from '.'

export default {
  title: 'Carousel',
  component: Component,
  argTypes: {
    children: {},
    onClick: {
      action: 'onClick',
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Carousel = Template.bind({})
Carousel.args = {
  itemsCount: 4,
  carouselItems: ['one', 'two', 'three', 'four'],
}
