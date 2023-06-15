import { daysOfWeekArr, monthsArr } from "../app/availableStates";

export const checkEmptyChars = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        if (el === "") {
            return false;
        }
    }
    return true;
};

export const checkStarInChars = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        if (el.includes("*") && !el.includes("/") && el.length !== 1) {
            return false;
        }
    }

    return true;
};

export const checkDefisInChars = (arr) => {
    const checkedFields = [false, false, false, false, false];

    checkedFields[0] = checkDefises(arr[0], 0, 59);
    checkedFields[1] = checkDefises(arr[1], 0, 23);
    checkedFields[2] = checkDefises(arr[2], 1, 31);
    checkedFields[3] = checkDefises(arr[3], 1, 12, monthsArr);
    checkedFields[4] = checkDefises(arr[4], 0, 6, daysOfWeekArr);

    for (let i = 0; i < checkedFields.length; i++) {
        const el = checkedFields[i];

        if (!el) {
            return false;
        }
    }

    return true;
};

const checkDefises = (el, minVal, maxVal, compareRules = null) => {
    if (el.includes("-")) {
        if (el.length > 7 || el.length < 3) {
            return false;
        } else {
            let tmp = el.split("-");

            if (tmp.length > 2 || tmp.length === 1) {
                return false;
            }

            let left = tmp[0];
            let right = tmp[1];

            if (!isNaN(left) && typeof !isNaN(right)) {
                if (left > right) {
                    return false;
                } else {
                    if (
                        left > maxVal ||
                        left < minVal ||
                        right > maxVal ||
                        right < minVal
                    ) {
                        return false;
                    }
                    return true;
                }
            } else if (typeof left === "string" && typeof right === "string") {
                let isInListLeft = false;
                let isInListRight = false;
                let leftNumber = null;
                let rightNumber = null;

                try {
                    for (let i = 0; i < compareRules.length; i++) {
                        const obj = compareRules[i];

                        if (left === obj.name) {
                            isInListLeft = true;
                            leftNumber = obj.id;
                        }
                        if (right === obj.name) {
                            isInListRight = true;
                            rightNumber = obj.id;
                        }
                    }
                } catch (err) {
                    console.error(err);
                }

                if (
                    !isInListLeft ||
                    !isInListRight ||
                    leftNumber > rightNumber
                ) {
                    return false;
                }

                return true;
            } else {
                return false;
            }
        }
    }

    return true;
};

export const checkCommaInChars = (arr) => {
    const checkedFields = [false, false, false, false, false];

    checkedFields[0] = checkComma(arr[0], 0, 59);
    checkedFields[1] = checkComma(arr[1], 0, 23);
    checkedFields[2] = checkComma(arr[2], 1, 31);
    checkedFields[3] = checkComma(arr[3], 1, 12, monthsArr);
    checkedFields[4] = checkComma(arr[4], 0, 6, daysOfWeekArr);

    for (let i = 0; i < checkedFields.length; i++) {
        const el = checkedFields[i];

        if (!el) {
            return false;
        }
    }

    return true;
};

const checkComma = (el, minVal, maxVal, compareRules = null) => {
    if (el.includes(",")) {
        let tmp = el.split(",");

        if (tmp.filter((el) => el === "").length !== 0) {
            return false;
        }

        for (let i = 0; i < tmp.length; i++) {
            if (!isNaN(tmp[0])) {
                if (tmp[0] > maxVal || tmp[0] < minVal) {
                    return false;
                }
                return true;
            } else if (typeof tmp[0] === "string") {
                let isInList = false;
                // let number = null;

                try {
                    for (let i = 0; i < compareRules.length; i++) {
                        const obj = compareRules[i];

                        if (tmp[0] === obj.name) {
                            isInList = true;
                            // number = obj.id;
                        }
                    }
                } catch (err) {
                    console.error(err);
                }

                if (!isInList) {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        }
    }

    return true;
};

export const checkSlashInChars = (arr) => {
    const checkedFields = [false, false, false, false, false];

    checkedFields[0] = checkSlashes(arr[0], 0, 59);
    checkedFields[1] = checkSlashes(arr[1], 0, 23);
    checkedFields[2] = checkSlashes(arr[2], 1, 31);
    checkedFields[3] = checkSlashes(arr[3], 1, 12);
    checkedFields[4] = checkSlashes(arr[4], 0, 6);

    for (let i = 0; i < checkedFields.length; i++) {
        const el = checkedFields[i];

        if (!el) {
            return false;
        }
    }

    return true;
};

const checkSlashes = (el, minVal, maxVal) => {
    if (el.includes("/")) {
        let tmp = el.split("/");

        if (tmp.length > 2 || tmp[0] === "" || tmp[1] === "") {
            return false;
        }

        let left = tmp[0];
        let right = tmp[1];

        if (!isNaN(left) && !isNaN(right)) {
            if (
                left > maxVal ||
                left < minVal ||
                right > maxVal ||
                right < minVal
            ) {
                return false;
            }
            return true;
        } else if (typeof left === "string" && !isNaN(right)) {
            if (left === "*") {
                if (right > maxVal || right < minVal) {
                    return false;
                }
                return true;
            }

            return false;
        } else {
            return false;
        }
    }
    return true;
};

export const checkUsuallyVals = (arr) => {
    const checkedFields = [false, false, false, false, false];

    checkedFields[0] = checkUsually(arr[0], 0, 59);
    checkedFields[1] = checkUsually(arr[1], 0, 23);
    checkedFields[2] = checkUsually(arr[2], 1, 31);
    checkedFields[3] = checkUsually(arr[3], 1, 12, monthsArr);
    checkedFields[4] = checkUsually(arr[4], 0, 6, daysOfWeekArr);

    for (let i = 0; i < checkedFields.length; i++) {
        const el = checkedFields[i];

        if (!el) {
            return false;
        }
    }

    return true;
};

const checkUsually = (el, minVal, maxVal, compareRules = []) => {
    if (
        !el.includes("*") &&
        !el.includes("/") &&
        !el.includes(",") &&
        !el.includes("-")
    ) {
        if (!isNaN(el)) {
            if (el > maxVal || el < minVal) {
                return false;
            }
            return true;
        } else if (typeof el === "string") {
            let isInList = false;
            // let number = null;

            try {
                for (let i = 0; i < compareRules.length; i++) {
                    const obj = compareRules[i];

                    if (el === obj.name) {
                        isInList = true;
                        // number = obj.id;
                    }
                }
            } catch (err) {
                console.error(err);
            }

            if (!isInList) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
    return true;
};
