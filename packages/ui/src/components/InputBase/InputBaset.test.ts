import { shallowMount } from '@vue/test-utils'

import InputBase from './InputBase.vue'

describe('inputBase', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(InputBase, {
      props: {
        placeholder: 'mockPlaceholder',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should reflect disabled state', () => {
    const wrapper = shallowMount(InputBase, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('should correctly define model', () => {
    const wrapper = shallowMount(InputBase)

    wrapper.find('input').setValue('mockValue')

    expect(wrapper.emitted('update:modelValue')).toEqual([['mockValue']])
  })
})
