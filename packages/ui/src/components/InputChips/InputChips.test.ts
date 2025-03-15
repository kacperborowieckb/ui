import { shallowMount } from '@vue/test-utils'

import { Chip } from '../Chip'
import { InputBase } from '../InputBase'
import InputChips from './InputChips.vue'
import type { InputChipsProps } from './InputChips.vue'

describe('inputChips', () => {
  const getWrapper = (props?: InputChipsProps & { modelValue?: string[] }) => {
    return shallowMount(InputChips, {
      props,
      global: {
        stubs: {
          InputWrapper: {
            template: '<div data-testid="input-wrapper"><slot /></div>',
          },
        },
      },
    })
  }

  it('should render correctly', async () => {
    const wrapper = getWrapper({ chipSeparators: [','], modelValue: ['chip1', 'chip2'] })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with error chips', async () => {
    const wrapper = getWrapper({
      chipSeparators: [','],
      modelValue: ['mo', 'mockChip2'],
      validator: val => val.length < 4,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should create a new chips correctly', async () => {
    const wrapper = getWrapper({
      chipSeparators: [',', 'Enter'],
    })

    const input = wrapper.findComponent(InputBase)

    await input.setValue('some')
    await input.trigger('keydown', { key: '.' })

    await input.trigger('keydown', { key: ',' })

    await input.setValue('some2')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue'))
      .toStrictEqual([[['some']], [['some', 'some2']]])
  })

  it('should create error chips correctly', async () => {
    const wrapper = getWrapper({
      chipSeparators: [',', 'Enter'],
      validator: val => val !== 'some',
    })

    const input = wrapper.findComponent(InputBase)

    await input.setValue('some')
    await input.trigger('keydown', { key: ',' })

    await input.setValue('some')
    await input.trigger('keydown', { key: ',' })

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[['some']], [['some', 'some']]])
    expect(wrapper.emitted('update:error')).toStrictEqual([[true]])
    expect((wrapper.vm as any).chipsWithErrors).toStrictEqual(new Map([['some', 2]]))
  })

  it('should correctly handle regexp as validator', async () => {
    const wrapper = getWrapper({
      chipSeparators: [',', 'Enter'],
      validator: /^\d*$/,
    })

    const input = wrapper.findComponent(InputBase)

    await input.setValue('some')
    await input.trigger('keydown', { key: ',' })

    expect(wrapper.emitted('update:error')).toStrictEqual([[true]])
    expect((wrapper.vm as any).chipsWithErrors).toStrictEqual(new Map([['some', 1]]))
  })

  it('should correctly delete chip', () => {
    const wrapper = getWrapper({
      chipSeparators: [','],
      modelValue: ['mockChip', 'mockChip2'],
    })

    const lastChip = wrapper.findAllComponents(Chip).at(-1)

    lastChip?.vm.$emit('chipRemoval')

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[['mockChip']]])
  })

  it('should correctly delete error chip', async () => {
    const wrapper = getWrapper({
      chipSeparators: [','],
      modelValue: ['mockChip', 'mockChip2'],
      validator: val => val.includes('2'),
    })

    await wrapper.vm.$nextTick()

    const errorChip = wrapper.findAllComponents(Chip).find((chip) => {
      return chip.props().variant === 'error'
    })

    errorChip?.vm.$emit('chipRemoval')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:error')).toStrictEqual([[true], [false]])
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[['mockChip2']]])
    expect((wrapper.vm as any).chipsWithErrors).toStrictEqual(new Map())
  })

  it('should correctly delete error chip while duplicate error', async () => {
    const wrapper = getWrapper({
      chipSeparators: [','],
      modelValue: ['mockChip', 'mockChip2', 'mockChip'],
      validator: val => val.includes('2'),
    })

    await wrapper.vm.$nextTick()

    const errorChip = wrapper.findAllComponents(Chip).find((chip) => {
      return chip.props().variant === 'error'
    })

    errorChip?.vm.$emit('chipRemoval')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:error')).toStrictEqual([[true]])
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[['mockChip2', 'mockChip']]])
    expect((wrapper.vm as any).chipsWithErrors).toStrictEqual(new Map([['mockChip', 1]]))
  })
})
