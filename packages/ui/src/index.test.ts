import { components } from '@/components'
import * as ui from '@/index'
import { expect, it } from 'vitest'

it('should expose the correct components', () => {
  expect(Object.keys(ui)).toEqual(Object.values(components))
})
