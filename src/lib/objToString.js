const objToString = (obj, separator) => {
    const arr = [];

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            arr.push(obj[key]);
        };
    };

    return arr.join(separator);
};

export default objToString;