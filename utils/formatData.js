const dayjs = require('dayjs')
module.exports = (date) => {
    const newData = dayjs(date).format("MM/D/YYYY HH:mm:ss a")
    return newData
}