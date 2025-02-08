import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref, useTemplateRef } from 'vue'

export type MutationObserverElementRef = Ref<Node> | ReturnType<typeof useTemplateRef<Node>>

/**
 *
 * @param element ref of HTML element
 * @param mutationCallback callback that will fire if mutation is detected
 * @param options options passed to `MutationObserver`
 * @returns observer ref
 */
export function useMutationObserver(element: MutationObserverElementRef, mutationCallback: MutationCallback, options?: MutationObserverInit): Ref<MutationObserver | null> {
  const observer = ref<MutationObserver | null>(null)

  onMounted(() => {
    if (!element.value)
      return

    observer.value = new MutationObserver(mutationCallback)

    observer.value.observe(element.value, options)
  })

  onBeforeUnmount(() => {
    observer.value?.disconnect()
  })

  return observer
}
