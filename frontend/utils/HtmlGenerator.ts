export const templateToElement = (template: string): Element | undefined => {
  const parser = new DOMParser()

  const $element = parser.parseFromString(template, 'text/html').body
    .firstElementChild
  if ($element) return $element

  return undefined
}
