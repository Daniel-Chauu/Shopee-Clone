import { config } from '../constant/config'
import { HttpStatusCode } from './../constant/httpStatusCode.enum'
import axios, { AxiosError } from 'axios'
function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

function formatNumberToSocialStyle(number: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}

function rateSale(original: number, price: number) {
  return Math.round(((original - price) / original) * 100) + '%'
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

type NameId = {
  name: string
  id: string
}

const generateNameId = ({ name, id }: NameId) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

const getIdFromNameId = (nameId: string) => {
  const id = nameId.split('-i,')
  return id[1]
}

const generateAvatar = (url: string) => {
  return `${config.baseUrl}images/${url}`
}

export {
  isAxiosError,
  isAxiosUnprocessableEntityError,
  formatCurrency,
  formatNumberToSocialStyle,
  rateSale,
  removeSpecialCharacter,
  generateNameId,
  getIdFromNameId,
  generateAvatar
}
