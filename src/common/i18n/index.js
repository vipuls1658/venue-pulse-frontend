import en from './en.js'

const resolve = (key) =>
  key
    .split('.')
    .reduce((node, part) => (node == null ? undefined : node[part]), en)

export function t(key, vars) {
  const value = resolve(key)
  if (typeof value !== 'string') return key
  if (!vars) return value
  return value.replace(/\{(\w+)\}/g, (_, name) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  )
}
