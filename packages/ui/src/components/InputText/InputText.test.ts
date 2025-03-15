import { shallowMount } from '@vue/test-utils'

import { InputBase } from '../InputBase'
import InputText from './InputText.vue'
import type { InputTextProps } from './InputText.vue'

describe('inputText', () => {
  function getWrapper(props?: InputTextProps) {
    return shallowMount(InputText, {
      props,
      global: {
        stubs: {
          InputWrapper: {
            template: '<input-wrapper-stub><slot /></input-wrapper-stub>',
          },
        },
      },
    })
  }

  it('should render correctly', () => {
    const wrapper = getWrapper({
      label: 'mockLabel',
      placeholder: 'mockPlaceholder',
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly in disabled state', () => {
    const wrapper = getWrapper({
      label: 'mockLabel',
      placeholder: 'mockPlaceholder',
      disabled: true,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly in error state', () => {
    const wrapper = getWrapper({
      label: 'mockLabel',
      placeholder: 'mockPlaceholder',
      hasError: true,
      errorMessage: 'mockErrorMessage',
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should correctly define value model', async () => {
    const wrapper = getWrapper()

    await wrapper.findComponent(InputBase).setValue('mockValue')

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([['mockValue']])
  })

  it('should correctly define error model respecting the validator function', async () => {
    const wrapper = getWrapper({
      validator: val => val.length > 4,
    })

    await wrapper.findComponent(InputBase).setValue('moc')

    expect(wrapper.emitted('update:error')).toStrictEqual([[true]])
  })

  it('should correctly define error model respecting the validator regexp', async () => {
    const wrapper = getWrapper({
      validator: /^\d*$/,
    })

    await wrapper.findComponent(InputBase).setValue('24d')

    expect(wrapper.emitted('update:error')).toStrictEqual([[true]])
  })
})
