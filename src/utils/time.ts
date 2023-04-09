import moment from 'moment';
export function formatDuration(seconds: number | undefined) {
    if(!seconds) {
        return '00:00';
    }
    const duration = moment.duration(seconds, 'seconds');
    const minutes = duration.minutes();
    const secondsFormatted = duration.seconds().toFixed(0).toString().padStart(2, '0');
    return `${minutes.toString().padStart(2, '0')}:${secondsFormatted}`;
}