import bubbleSort from "./bubbleSort";

export const eachMinutesTranslator = (lines, eachMinutes) => {
    const minutes = `*/${eachMinutes}`;
    lines[0] = { ...lines[0], minutes }

    for (let i = 0; i < lines.length; i++) {
        lines[i] = { ...lines[i], minutes }
    }

    return lines;
}

export const atTimeTranslator = (lines, times) => {

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const hours = time.hours;
        const minutes = time.minutes;

        lines[i] = { ...lines[i], minutes, hours };
    }
    
    return lines;
}

export const eachDaysTranslator = (lines, eachDays) => {
    const daysOfMonth = `*/${eachDays}`;

    for (let i = 0; i < lines.length; i++) {
        lines[i] = { ...lines[i], daysOfMonth };
    }

    return lines;
}

export const byDaysOfMonthTranslator = (lines, daysOfMonthArr) => {
    let arr = [...daysOfMonthArr];
    daysOfMonthArr = bubbleSort(arr);
    const daysOfMonth = daysOfMonthArr.join(',');

    for (let i = 0; i < lines.length; i++) {
        lines[i] = { ...lines[i], daysOfMonth };
    }

    return lines;
}

export const daysOfWeekTranslator = (lines, daysOfWeek) => {
    let activeDaysOfWeek = [];
    
    for (const dayName in daysOfWeek) {
        if (Object.hasOwnProperty.call(daysOfWeek, dayName)) {
            const dayValue = daysOfWeek[dayName];

            if (dayValue) {
                activeDaysOfWeek.push(dayName);
            }
        }
    }

    if (activeDaysOfWeek.length === 7 || activeDaysOfWeek.length === 0) {
        activeDaysOfWeek = "*";
    } 
    else {
        activeDaysOfWeek = activeDaysOfWeek.join(',')
    }

    let i = 0
    do {
        lines[i] = { ...lines[i], daysOfWeek: activeDaysOfWeek };
        i++
    } while (i < lines.length);

    return lines;
}
export const monthsTranslator = (lines, months) => {
    let activeMonths = [];
    
    for (const monthName in months) {
        if (Object.hasOwnProperty.call(months, monthName)) {
            months[monthName] && activeMonths.push(monthName);
        }
    }

    if (activeMonths.length === 12 || activeMonths.length === 0) {
        activeMonths = "*";
    } 
    else {
        activeMonths = activeMonths.join(',')
    }

    let i = 0
    do {
        lines[i] = { ...lines[i], months: activeMonths };
        i++
    } while (i < lines.length);

    return lines;
}