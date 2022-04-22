import { ComponentStory } from '@storybook/react'

import { StaticTable as Component } from '.'

export default {
  title: 'StaticTable',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const TableTest = Template.bind({})
TableTest.args = {
  horizontal: false,
  data: {
    "head": [
      "head col 1", "head col 2"
    ],
    "body": [
      [ "row1 col1",  "row1 col2" ],
      [ "row2 col1",  "row2 col2" ],
      [ "row3 col1",  "row3 col2" ],
      [ "row4 col1",  "row4 col2" ],
      [ "row5 col1",  "row5 col2" ],
      [ "row6 col1",  "row6 col2" ]
    ]
  }
}
