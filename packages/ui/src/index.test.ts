import { components } from '@/components'
import * as ui from '@/index'

it('should expose the correct components', () => {
  expect(Object.keys(ui)).toEqual(Object.values(components))
})
