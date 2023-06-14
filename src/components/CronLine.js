import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import scrollAnimation from "../lib/makeScrollAnimation";
import objToString from "../lib/objToString";
import { checkStarInChars, checkCommaInChars, checkDefisInChars, checkSlashInChars, checkUsuallyVals } from '../lib/validation';
import { setLocalLines, changeLine } from "../app/cronLocalLines";

const CronInput = ({ id, index, line, inputs }) => {
    const dispatch = useDispatch();
    const cronData = useSelector(state => state.cronLine.value);
    const localLines = useSelector(state => state.cronLocalLines.value);
    const [isValid, setValidity] = useState(true);

    const showInvalidity = useCallback(() => {
        document.getElementById("cron-input-" + id).classList.add("is-invalid");

        setTimeout(() => {
            setValidity(true);
            document
                .getElementById("cron-input-" + id)
                .classList.remove("is-invalid");
        }, 3000);
    }, [id, isValid]);

    useEffect(() => {
        dispatch(changeLine({ line: objToString(line, " "), index }));
    }, [cronData])

    useEffect(() => {
        setValidity(checkValidity(localLines[index]))
        !isValid && showInvalidity();
    }, [isValid])

    const checkValidity = (line) => {
        const lineArr = line.split(" ");

        if (lineArr.length !== 5) {
            console.log(1);
            return false;
        }
        else if (!checkStarInChars(lineArr)) {
            console.log(2);
            return false;
        }
        else if (!checkDefisInChars(lineArr)) {
            console.log(3);
            return false;
        }
        else if (!checkCommaInChars(lineArr)) {
            console.log(4);
            return false;
        }
        else if (!checkSlashInChars(lineArr)) {
            console.log(5);
            return false;
        }
        else if (!checkUsuallyVals(lineArr)) {
            console.log(6);
            return false;
        }

        return true;
    }

    const onChangeHandler = useCallback(
        (ev) => {
            const curLine = ev.target.value
                .replace(/[^0-9*\/,\-A-Z\s]/g, '')
                .replace(/ +/g, " ")
                // .trim()

            setValidity(checkValidity(curLine));

            if (isValid) {
                dispatch(changeLine({ line: curLine, index }));
            } else {
                return;
            }
        },
        [id, index]
    );

    const onScrollHandler = useCallback(() => {
        const scrollLeft = document.getElementById(
            "cron-input-" + id
        ).scrollLeft;
        inputs.forEach((input) => {
            input.scrollLeft = scrollLeft;
        });
    }, [id, inputs, isValid]);

    return (
        <input
            id={"cron-input-" + id}
            className="cron-input"
            type="text"
            autoComplete="off"
            value={localLines[index]}
            onChange={onChangeHandler}
            onScroll={onScrollHandler}
        />
    );
};

const CronLine = () => {
    const cronData = useSelector((state) => state.cronLine.value);
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        setInputs(document.querySelectorAll(".cron-input"));
    }, [cronData]);

    return (
        <div className="cron-wrapper">
            <div className="cron">
                {cronData.lines.map((line, index) => {
                    return (
                        <CronInput
                            key={index}
                            id={index + 1}
                            index={index}
                            line={line}
                            inputs={inputs}
                        />
                    );
                })}
            </div>
            <div
                onClick={scrollAnimation("right", 500, inputs)}
                className="scroll-button scroll-button-right"
            >
                {">"}
            </div>
            <div
                onClick={scrollAnimation("left", 500, inputs)}
                className="scroll-button scroll-button-left"
            >
                {"<"}
            </div>
        </div>
    );
};
export default CronLine;
