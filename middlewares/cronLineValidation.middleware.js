// const { checkCommaInChars, checkDefisInChars, checkEmptyChars, checkSlashInChars, checkStarInChars, checkUsuallyVals } = require('../src/lib/validation')

module.exports = (req, res, next) => {
    if (req.method == "OPTIONS") return next();

    const cronLines = req.body.cronLines;

    try {
        for (let i = 0; i < cronLines.length; i++) {
            const line = cronLines[i];

            const lineArr = line.replace(/ +/g, " ").trim().split(" ");

            if (
                lineArr.length !== 5 //||
                // !checkEmptyChars(lineArr) ||
                // !checkStarInChars(lineArr) ||
                // !checkDefisInChars(lineArr) ||
                // !checkCommaInChars(lineArr) ||
                // !checkSlashInChars(lineArr) ||
                // !checkUsuallyVals(lineArr)
            ) {
                return res.status(400).json({ messsage: "Invalid cron line" });
            }
        }
        next();
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ messsage: "Something was wrong in cron line validation" });
    }
};
