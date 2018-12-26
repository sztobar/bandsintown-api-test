export function renderDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${day}/${month}/${year}`
}

export function renderTime(date: Date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${hour}:${minute}`
}