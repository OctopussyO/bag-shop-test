import { values } from 'lodash'

export const SortTypeEnum = {
  ByPrice: 'ByPrice',
  ByRating: 'ByRating',
}

export const SortTypeValuesEnum = {
  [SortTypeEnum.ByPrice]: 'цене',
  [SortTypeEnum.ByRating]: 'рейтингу',
}

export const SortTypes = values(SortTypeEnum)

export const BaseUrl = 'https://front-test.idalite.com'
