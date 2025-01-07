export default function splitTimestamp(timestamptz: Date):
{ date: string, month: string, year: string, time: string } {
  const dateObj = new Date(timestamptz)
  const date = dateObj.getDate().toString().padStart(2, '0')

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames[dateObj.getMonth()]

  const year = dateObj.getFullYear().toString()
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`

  return {
    date, month, year, time,
  }
}