/* eslint-disable import/prefer-default-export */
export const updateLocalStorage = (key, data) => {
  if (!key) { throw new Error('`key` parameter is required!') }
  localStorage.setItem(key, JSON.stringify(data))
}
