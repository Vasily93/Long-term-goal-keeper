import moment from "moment";

const getMinutesLeft = (deadline) => {
    return Math.floor(
        (Date.parse(`${deadline}T23:59:59`) 
        -
        Date.parse(moment().format()))
         / 1000 / 60
        )
}

export { getMinutesLeft }