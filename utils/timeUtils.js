/**
 * Calculate the end time of a reservation (1 hour after start time)
 * @param {Date|string} startTime - Reservation start time
 * @returns {Date} End time (1 hour after start)
 */
const calculateEndTime = (startTime) => {
    const start = new Date(startTime);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    return end;
};

/**
 * Validate if a given time string is a valid ISO date
 * @param {string} timeString - Time string to validate
 * @returns {boolean} True if valid
 */
const isValidISODate = (timeString) => {
    if (!timeString) return false;

    try {
        const date = new Date(timeString);
        return date instanceof Date && !isNaN(date);
    } catch (e) {
        return false;
    }
};

module.exports = {
    calculateEndTime,
    isValidISODate
};