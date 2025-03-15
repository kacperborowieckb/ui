import { shallowMount } from '@vue/test-utils'

import Chip from './Chip.vue'

describe('chip', () => {
  it('should render correctly without button', () => {
    const wrapper = shallowMount(Chip, {
      props: {
        content: 'mockContent',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with button', () => {
    const wrapper = shallowMount(Chip, {
      props: {
        withButton: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with error state', () => {
    const wrapper = shallowMount(Chip, {
      props: {
        withButton: true,
        content: 'mockContent',
        variant: 'error',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have tabindex set to 0 if focusable', () => {
    const wrapper = shallowMount(Chip, { props: { focusable: true } })

    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it('should not have tabindex if disabled', () => {
    const wrapper = shallowMount(Chip, { props: { focusable: true, disabled: true } })

    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('should not have tabindex by default', () => {
    const wrapper = shallowMount(Chip)

    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('should not emit chipRemoval on not backspace click', () => {
    const wrapper = shallowMount(Chip)

    wrapper.trigger('keydown.alt')

    expect(wrapper.emitted('chipRemoval')).toBeUndefined()
  })

  it('should emit chipRemoval event on backspace', () => {
    const wrapper = shallowMount(Chip)

    wrapper.trigger('keydown.backspace')

    expect(wrapper.emitted('chipRemoval')).toBeDefined()
  })

  it('should emit chipRemoval event on button click', () => {
    const wrapper = shallowMount(Chip, { props: { withButton: true } })

    const button = wrapper.find('button')

    button.trigger('click')

    expect(wrapper.emitted('chipRemoval')).toBeDefined()
  })
})
