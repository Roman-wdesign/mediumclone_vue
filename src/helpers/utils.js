export const range = (start, end) => {
    return [...Array(end).keys()].map(el => el + start)
    // return [...Array(50).keys()].map(el => el + 10)
}