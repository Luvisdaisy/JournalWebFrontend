export function TimeCalculator(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDifference = currentDate - targetDate;

    if (timeDifference < 60 * 1000) {
        return Math.floor(timeDifference / 1000) + " seconds ago";
    } else if (timeDifference < 60 * 60 * 1000) {
        return Math.floor(timeDifference / (60 * 1000)) + " minutes ago";
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
        return Math.floor(timeDifference / (60 * 60 * 1000)) + " hours ago";
    } else {
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + " days ago";
    }
}
