export const formatTime = (secondsTime: number) => {
    const minutes = Math.floor(secondsTime / 60).toString().padStart(2, '0');
    const seconds = (secondsTime % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};