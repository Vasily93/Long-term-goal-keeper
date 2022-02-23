import moment from "moment";

const getMinutesLeft = (deadline) => {
    return Math.floor(
        (Date.parse(`${deadline}T22:00:00`) 
        -
        Date.parse(moment().format()))
         / 1000 / 60 
        )
}

export { getMinutesLeft }