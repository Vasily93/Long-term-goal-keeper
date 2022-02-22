import { getMinutesLeft } from './dateHelpers';

const sortByDate = (arr) => {
    arr.sort((a, b) => getMinutesLeft(a.deadline) - getMinutesLeft(b.deadline))
    // sort((a, b) => a-b)
    return arr;
}


export { sortByDate }