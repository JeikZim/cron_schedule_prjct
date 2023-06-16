export function fillingNamedData(
    dispatch,
    timeStr,
    minVal,
    maxVal,
    availableNames,
    ...actions
) {
    const basicNames = {};
    const firstFunc = actions[0];
    const secondFunc = actions[1];

    for (let i = 0; i < availableNames.length; i++) {
        const name = availableNames[i].name;
        basicNames[name] = false;
    }

    if (timeStr.includes("/")) {
        const tmp = timeStr.split("/");
        let firstVal = tmp[0];
        let secondVal = tmp[1];

        if (isNaN(firstVal)) {
            for (let i = 0; i < availableNames.length; i++) {
                const el = availableNames[i];

                if (el.name === secondVal) {
                    firstVal = el.id;
                    break;
                }
            }
        }  
        if (isNaN(secondVal)) {
            for (let i = 0; i < availableNames.length; i++) {
                const el = availableNames[i];

                if (el.name === secondVal) {
                    secondVal = el.id;
                    break;
                }
            }
        }
        if ((!isNaN(secondVal) && secondVal > maxVal) || (!isNaN(secondVal) && firstVal > maxVal)) {
            dispatch(
                firstFunc({
                    ...basicNames,
                    [availableNames[availableNames.length - 1]
                        .name]: true,
                })
            );
            return;
        }

        const obj = {};
        const step = Number(secondVal);
        const localMinVal = firstVal === '*' ? 1 : firstVal;
        let count = firstVal === '*' ? 1 : firstVal;

        for (let i = 0; i <= Math.floor((maxVal - localMinVal) / secondVal); i++) {
            for (let j = 0; j < availableNames.length; j++) {
                const el = availableNames[j];

                if (el.id === Number(count)) {
                    obj[el.name] = true;
                    break;
                }
            }
            count = Number(count) + step;
        }

        dispatch(firstFunc({ ...basicNames, ...obj }));
    } else if (timeStr.includes("*")) {
        dispatch(
            secondFunc ? secondFunc() : firstFunc({ ...basicNames })
        );
    } else if (timeStr.includes("-")) {
        const tmp = timeStr.split("-");
        let firstVal = tmp[0];
        let secondVal = tmp[1];

        if (
            (isNaN(firstVal) && isNaN(secondVal)) ||
            isNaN(firstVal) ||
            isNaN(secondVal)
        ) {
            let startNumber = firstVal;
            let lastNumber = secondVal;

            for (let i = 0; i < availableNames.length; i++) {
                const el = availableNames[i];

                if (el.name === firstVal) startNumber = el.id;
                if (el.name === secondVal) lastNumber = el.id;
            }

            for (let i = startNumber; i < lastNumber + 1; i++) {
                const el = availableNames[i - 1];

                dispatch(firstFunc({ ...basicNames, [el.name]: true }));
                basicNames[el.name] = true;
            }
        } else {
            firstVal = Number(firstVal);
            secondVal = Number(secondVal);

            if (firstVal > secondVal) {
                dispatch(
                    secondFunc
                        ? secondFunc()
                        : firstFunc({ ...basicNames })
                );
                return;
            } else {
                for (let i = firstVal; i < secondVal + 1; i++) {
                    const el = availableNames[i - 1];

                    dispatch(
                        firstFunc({ ...basicNames, [el.name]: true })
                    );
                    basicNames[el.name] = true;
                }
            }
        }
    } else if (timeStr.includes(",")) {
        const arr = timeStr.split(",");

        for (let i = 0; i < arr.length; i++) {
            let el = arr[i];
            if (isNaN(el)) {
                for (let j = 0; j < availableNames.length; j++) {
                    if (availableNames[j].name === el) {
                        dispatch(
                            firstFunc({ ...basicNames, [el]: true })
                        );
                        basicNames[el] = true;
                    }
                }
            } else {
                if (Number(el) > maxVal || Number(el) < minVal) {
                    continue;
                } else {
                    el = Number(el);
                    for (let j = 0; j < availableNames.length; j++) {
                        if (availableNames[j].id === el) {
                            dispatch(
                                firstFunc({
                                    ...basicNames,
                                    [availableNames[j].name]: true,
                                })
                            );
                            basicNames[availableNames[j].name] = true;
                        }
                    }
                }
            }
        }
    } else {
        if (isNaN(timeStr)) {
            for (let i = 0; i < availableNames.length; i++) {
                if (availableNames[i].name === timeStr) {
                    dispatch(
                        firstFunc({ ...basicNames, [timeStr]: true })
                    );
                    return;
                }
            }
        } else {
            if (Number(timeStr) > maxVal) {
                dispatch(secondFunc ? secondFunc : firstFunc);
            } else if (Number(timeStr) < minVal) {
                dispatch(secondFunc ? secondFunc : firstFunc);
            } else {
                timeStr = Number(timeStr);
                for (let i = 0; i < availableNames.length; i++) {
                    if (availableNames[i].id === timeStr) {
                        dispatch(
                            firstFunc({
                                ...basicNames,
                                [availableNames[i].name]: true,
                            })
                        );
                        return;
                    }
                }
            }
        }
    }
}

export function fillingListData(dispatch, timeStr, minVal, maxVal, ...actions) {
    const firstFunc = actions[0];
    const secondFunc = actions[1];

    if (timeStr.includes("/")) {
        const tmp = timeStr.split("/");

        if (tmp[1] > maxVal) {
            dispatch(firstFunc([0]));
        } else {
            const arr = [];
            const step = Number(tmp[1]);
            const localMinVal = tmp[0] === '*' ? 0 : tmp[0];
            let count = tmp[0] === '*' ? '00' : tmp[0];

            for (let i = 0; i <= Math.floor((maxVal - localMinVal) / tmp[1]); i++) {
                arr[i] = count;
                count = Number(count) + step;
            }

            dispatch(firstFunc(arr));
        }
    } else if (timeStr.includes("*")) {
        dispatch(secondFunc ? secondFunc(1) : firstFunc(["*"]));
    } else if (timeStr.includes("-")) {
        const tmp = timeStr.split("-");
        const arr = [];

        for (let i = Number(tmp[0]); i < Number(tmp[1]) + 1; i++) {
            arr.push(i);
        }

        dispatch(firstFunc(arr));
    } else if (timeStr.includes(",")) {
        const arr = timeStr.split(",");

        dispatch(firstFunc(arr));
    } else {
        dispatch(firstFunc([timeStr]));
    }
}