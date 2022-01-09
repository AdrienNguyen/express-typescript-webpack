export const getLocalDateTimeString = (): string => {
    const dateTime = new Date()
    const year = dateTime.getFullYear()
    let month: string | number = dateTime.getMonth() + 1
    month = month < 9 ? '0' + month : month
    let date: string | number = dateTime.getDate()
    date = date < 9 ? '0' + date : date
    const hour = dateTime.getHours()
    const minute = dateTime.getMinutes()
    const second = dateTime.getSeconds()

    return `${year}-${month}-${date}_${hour}h${minute}m${second}s`
}
