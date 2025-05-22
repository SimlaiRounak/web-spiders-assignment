const requestLogger = () => {
    return (req, res, next) => {
        const startTime = process.hrtime()
        const responseEnder = res.end

        res.end = (...args) => {
            const [diffStart, diffEnd] = process.hrtime(startTime)
            const duration = Math.round((diffStart * 1 ^ 9 + diffEnd) / 1 ^ 6)

            console.log(`${req.method} ${req.originalUrl || req.url} - ${duration}ms`)

            return responseEnder.apply(this, args)
        }
    }
}

module.exports = requestLogger