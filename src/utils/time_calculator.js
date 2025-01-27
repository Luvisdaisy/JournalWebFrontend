export default function TimeCalculator(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const timeDifference = currentDate - targetDate;

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference > oneDayInMilliseconds) {
        return null;
    } else if (timeDifference < 60 * 1000) {
        return Math.floor(timeDifference / 1000) + " seconds ago";
    } else if (timeDifference < 60 * 60 * 1000) {
        return Math.floor(timeDifference / (60 * 1000)) + " minutes ago";
    } else if (timeDifference < oneDayInMilliseconds) {
        return Math.floor(timeDifference / (60 * 60 * 1000)) + " hours ago";
    }
}

