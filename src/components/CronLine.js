import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import scrollAnimation from "../lib/makeScrollAnimation";
import objToString from "../lib/objToString";
import {
    checkEmptyChars,
    checkStarInChars,
    checkCommaInChars,
    checkDefisInChars,
    checkSlashInChars,
    checkUsuallyVals,
} from "../lib/validation";
import { changeLine, setValidityGlobal } from "../app/cronLocalLines";

const CronInput = ({ id, index, line, inputs }) => {
    line = objToString(line, " ");

    const [localLine, setLocalLine] = useState(line);
    const [isValid, setValidity] = useState(true);

    const dispatch = useDispatch();
    const cronData = useSelector((state) => state.cronLines.value);

    const showInvalidity = useCallback(() => {
        document.getElementById("cron-input-" + id).classList.add("is-invalid");
    }, [id]);

    useEffect(() => {
        !isValid && showInvalidity();
        isValid &&
            document
                .getElementById("cron-input-" + id)
                .classList.remove("is-invalid");
    });

    useEffect(() => {
        setValidity(true);
    }, [cronData]);

    useEffect(() => {
        dispatch(setValidityGlobal(isValid));
    }, [dispatch, isValid]);

    useEffect(() => {
        setLocalLine(line);
        dispatch(changeLine({ line, index }));
    }, [dispatch, index, line, cronData]);

    const checkValidity = (line) => {
        const lineArr = line.replace(/ +/g, " ").trim().split(" ");

        if (lineArr.length !== 5 || !checkEmptyChars(lineArr)) {
            // console.log(1);
            return false;
        } else if (!checkStarInChars(lineArr)) {
            // console.log(2);
            return false;
        } else if (!checkDefisInChars(lineArr)) {
            // console.log(3);
            return false;
        } else if (!checkCommaInChars(lineArr)) {
            // console.log(4);
            return false;
        } else if (!checkSlashInChars(lineArr)) {
            // console.log(5);
            return false;
        } else if (!checkUsuallyVals(lineArr)) {
            // console.log(6);
            return false;
        }

        return true;
    };

    const onChangeHandler = useCallback(
        (ev) => {
            let curLine = ev.target.value.replace(/[^0-9*/,\-A-Z\s]/g, "");

            let isValid = checkValidity(curLine);

            setValidity(isValid);

            if (isValid) {
                dispatch(
                    changeLine({
                        line: curLine.replace(/ +/g, " ").trim(),
                        index,
                    })
                );
            }
            setLocalLine(curLine);
        },
        [dispatch, index]
    );

    const onScrollHandler = useCallback(() => {
        const scrollLeft = document.getElementById(
            "cron-input-" + id
        ).scrollLeft;
        inputs.forEach((input) => {
            input.scrollLeft = scrollLeft;
        });
    }, [id, inputs]);

    return (
        <input
            id={"cron-input-" + id}
            className="cron-input"
            type="text"
            autoComplete="off"
            value={localLine}
            onChange={onChangeHandler}
            onScroll={onScrollHandler}
        />
    );
};

const CronLine = () => {
    const cronData = useSelector((state) => state.cronLines.value);
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
