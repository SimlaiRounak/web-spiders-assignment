/**
 * Middleware function to log all incoming requests
 * 
 * @param {Object} req - Express request object containing restaurant ID in query
 * @param {Object} res - Express response object used to return reservations
 * @param {Object} next - Express next object used to continue on the request flow
 */
const requestLogger = () => {
    return (req, res, next) => {
        const startTime = process.hrtime();

        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(startTime);
            const durationMs = Math.round((seconds * 1e9 + nanoseconds) / 1e6);

            console.log(`${req.method} ${req.originalUrl || req.url} - ${durationMs}ms`);
        });

        next();
    };
};

module.exports = { requestLogger };