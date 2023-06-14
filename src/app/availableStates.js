export const scheduleTypes = [
    {
        type: "Daily",
        modes: { 
            time: "each-min" 
        },
        availableModes: { 
            time: ["each-min", "at-time"] 
        }
    },
    {
        type: "Weekly",
        modes: { 
            time: "each-min" 
        },
        availableModes: { 
            time: ["each-min", "at-time"] 
        }
    },
    {
        type: "Monthly",
        modes: { 
            time: "each-min", 
            day:  "by-days-of-months" 
        },
        availableModes: { 
            time: ["each-min", "at-time"], 
            day:  ["each-days-of-month", "by-days-of-months"] 
        },
    },
    {
        type: "Custom",
        modes: { 
            time: "each-min", 
            day:  "by-days-of-months" 
        },
        availableModes: { 
            time: ["each-min", "at-time"], 
            day:  ["each-days-of-month", "by-days-of-months"] 
        },
    },
];

export const daysOfWeekArr = [
    {
        id: 1,
        name: "MON"
    },
    {
        id: 2,
        name: "TUE"
    },
    {
        id: 3,
        name: "WED"
    },
    {
        id: 4,
        name: "THU"
    },
    {
        id: 5,
        name: "FRI"
    },
    {
        id: 6,
        name: "SUT"
    },
    {
        id: 7,
        name: "SUN"
    },
]

export const monthsArr = [
    {
        id: 1,
        name: "JAN",
        daysCount: 31
    },
    {
        id: 2,
        name: "FEB",
        daysCount: 29
    },
    {
        id: 3,
        name: "MAR",
        daysCount: 31
    },
    {
        id: 4,
        name: "APR",
        daysCount: 30
    },
    {
        id: 5,
        name: "MAY",
        daysCount: 31
    },
    {
        id: 6,
        name: "JUN",
        daysCount: 30
    },
    {
        id: 7,
        name: "JUL",
        daysCount: 31
    },
    {
        id: 8,
        name: "AUG",
        daysCount: 31
    },
    {
        id: 9,
        name: "SEP",
        daysCount: 30
    },
    {
        id: 10,
        name: "OCT",
        daysCount: 31
    },
    {
        id: 11,
        name: "NOV",
        daysCount: 30
    },
    {
        id: 12,
        name: "DEC",
        daysCount: 31
    }
];

export const monthDaysArr = (() => {
    let monthDays = []

    for (let i = 1; i <= 31; i++) {
        monthDays.push(i)
    };
    
    return monthDays;
})();
