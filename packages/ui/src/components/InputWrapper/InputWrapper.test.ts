import { shallowMount } from '@vue/test-utils'

import InputWrapper from './InputWrapper.vue'

describe('inputWrapper', () => {
  it('should render correctly with labe', () => {
    const wrapper = shallowMount(InputWrapper, { props: { label: 'mockLabel' } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const wrapper = shallowMount(InputWrapper)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly when disabled', () => {
    const wrapper = shallowMount(InputWrapper, { props: { disabled: true } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly when hasError with errorMessage', () => {
    const wrapper = shallowMount(InputWrapper, { props: { hasError: true, errorMessage: 'mockErrorMessage' } })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
