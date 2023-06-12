import React from "react";
import { useSelector } from "react-redux";

const CronLine = () => {
    const cronData = useSelector((state) => state.cronLine.value)

    return (
        <div className="cron">
            <input type="text" maxLength={86} value={cronData} />
        </div>
    )
}
export default CronLine;