export const convertFirebaseTimeStampToJS = (time) => {
    if(time !== null && time !== undefined) {
        const fireBaseTime = new Date(
            time.seconds * 1000 + time.nanoseconds / 1000000,
        );
        return fireBaseTime.getDate() + '.' +
        (fireBaseTime.getMonth() + 1) + '.' +
        fireBaseTime.getFullYear() + ' ' +
        fireBaseTime.getHours() + '.' +
        String(fireBaseTime.getMinutes()).padStart(2,'0') + '.' +
        String(fireBaseTime.getSeconds()).padStart(2,'0');
    }
}