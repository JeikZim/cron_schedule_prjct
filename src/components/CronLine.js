import React from "react";
import { useSelector } from "react-redux";

const CronLine = () => {
    const cronData = useSelector((state) => state.cronLine.value)

    const changeCronLineHandler = (ev) => {
        return 
    }

    return (
        <div className="cron">
            {cronData.lines.map((el, index) => {
                return <input key={index} type="text" maxLength={86} value={el} onChange={changeCronLineHandler} />
            })}
        </div>
    )
}
export default CronLine;