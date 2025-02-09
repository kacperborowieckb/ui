import { shallowMount } from '@vue/test-utils'

import Spinner from './Spinner.vue'

describe('spinner', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Spinner)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
