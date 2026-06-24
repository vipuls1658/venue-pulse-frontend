import { CURRENCY, LOCALE, TIME_ZONE } from './constants.js'
import { t } from './i18n/index.js'

// here we are formatting the currency and numbers according to the locale and currency defined in the constants.js file. 
// This will ensure that the currency and numbers are displayed in a consistent format across the application.
const money = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 0,
})

// same for moneyExact but with maximumFractionDigits set to 2
const moneyExact = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 2,
})

export const fmtMoney = (n) => money.format(n ?? 0)
export const fmtMoneyExact = (n) => moneyExact.format(n ?? 0)
export const fmtNumber = (n) => new Intl.NumberFormat(LOCALE).format(n ?? 0)

export const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  })

export const fmtHour = (iso) =>
  new Date(iso).toLocaleTimeString(LOCALE, {
    hour: 'numeric',
    timeZone: TIME_ZONE,
  })

export const kindLabel = (kind) => {
  const label = t(`venueKind.${kind}`)
  return label === `venueKind.${kind}` ? kind : label
}
