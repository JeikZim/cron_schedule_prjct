import React from "react";
import { useSelector } from "react-redux";
import Daily from "./Daily";
import Weekly from "./Weekly";
import Monthly from "./Monthly";
import Custom from "./Custom";

const ScheduleRouter = () => {
    const scheduleType =  useSelector((state) => state.scheduleType.value);

    return (
        // <Provider store={store}>
            <div className="content">
                {
                    scheduleType.type === "Daily" ? (
                        <Daily />
                    ) : scheduleType.type === "Weekly" ? (
                        <Weekly />
                    ) : scheduleType.type === "Monthly" ? (
                        <Monthly />
                    ) : scheduleType.type === "Custom" ? (
                        <Custom />
                    ) : (
                        "Error"
                    )
                }
            </div>
        // </Provider>
    );
};

export default ScheduleRouter;
