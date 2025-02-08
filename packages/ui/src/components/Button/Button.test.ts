import { shallowMount } from '@vue/test-utils'

import Button from './Button.vue'

describe('button', () => {
  it('should emit a click event when clicked', async () => {
    const wrapper = shallowMount(Button)

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('should correctly render solid button', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Submit',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should correctly render gradient button', () => {
    const wrapper = shallowMount(Button, {
      props: {
        variant: 'gradient',
      },
      slots: {
        default: 'Submit',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should correctly render outline button', () => {
    const wrapper = shallowMount(Button, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Submit',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should correctly render animated button', () => {
    const wrapper = shallowMount(Button, {
      props: {
        animated: true,
      },
      slots: {
        default: 'Submit',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
