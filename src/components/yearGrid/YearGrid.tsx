import { useEffect, useState } from "react"
import { dayType } from "../../Context/timeContext"

type yearGridProps = {
    data: dayType[];
}

const YearGrid = (props: yearGridProps) => {
    const [all, setAll] = useState<dayType[] | undefined>();
    const [monthsRegister, setMonthsRegister] = useState<string[]>();

    const { data } = props;

    //Creates a grid of the last 365 days and add the data from the database.
    useEffect(() => {
        let allDaysOfYear: dayType[] = [];
        let shifted: dayType;

        if (data.length === undefined) return;
        let counter = 0;

        for (let i = 365; i > -1; i--) {
            let condition1 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i).toLocaleDateString()
            let condition2 = new Date(data[counter].date).toLocaleDateString();

            if (condition1 === condition2) {
                allDaysOfYear.push({
                    date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
                    lipolysis: data[counter].lipolysis,
                    autophagy: data[counter].autophagy,
                    startTime: data[counter].startTime,
                    timeOn: true //BORRAR QUIZAS
                })
                if (counter < data.length - 1) counter++;
            } else {
                allDaysOfYear.push({
                    date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
                    lipolysis: false,
                    autophagy: false,
                    startTime: data[counter].startTime,
                    timeOn: true //BORRAR QUIZAS
                })
            }
        }

        //List start on Monday.
        do {
            shifted = allDaysOfYear.shift()!;
        } while (shifted.date.getDay() !== 0)

        // //When starts week 53, the whole week 1 will be shifted in order to always have just 52 weeks.
        if (allDaysOfYear.length > 364) {
            for (let i = 0; i < 7; i++) {
                allDaysOfYear.shift()!;
            }
        }

        //Function that allows to assign the corresponding months to specific grid squares.
        let months: string[] = [];
        let month = "";
        for (let i = 0; i < allDaysOfYear.length; i++) {
            let monthRepeated = false;

            if (allDaysOfYear[i].date.getDay() === 1) {
                switch (allDaysOfYear[i].date.getMonth()) {
                    case 0:
                        if (month === "Jan") monthRepeated = true;
                        month = "Jan";
                        break;
                    case 1:
                        if (month === "Feb") monthRepeated = true;
                        month = "Feb";
                        break;
                    case 2:
                        if (month === "Mar") monthRepeated = true;
                        month = "Mar";
                        break;
                    case 3:
                        if (month === "Apr") monthRepeated = true;
                        month = "Apr";
                        break;
                    case 4:
                        if (month === "May") monthRepeated = true;
                        month = "May";
                        break;
                    case 5:
                        if (month === "Jun") monthRepeated = true;
                        month = "Jun";
                        break;
                    case 6:
                        if (month === "Jul") monthRepeated = true;
                        month = "Jul";
                        break;
                    case 7:
                        if (month === "Aug") monthRepeated = true;
                        month = "Aug";
                        break;
                    case 8:
                        if (month === "Sep") monthRepeated = true;
                        month = "Sep";
                        break;
                    case 9:
                        if (month === "Oct") monthRepeated = true;
                        month = "Oct";
                        break;
                    case 10:
                        if (month === "Nov") monthRepeated = true;
                        month = "Nov";
                        break;
                    case 11:
                        if (month === "Dec") monthRepeated = true;
                        month = "Dec";
                        break;
                    default:
                        break;
                }
                if (monthRepeated) {
                    months.push("");
                } else {
                    months.push(month);
                }
            }
        }
        setMonthsRegister(months);
        setAll(allDaysOfYear);
    }, [data])

    //Handle the color to be shown in every square
    const handleClass = (day: dayType) => {
        let classType: string = "daySquare";
        if (day.lipolysis) {
            classType = "daySquare-lipolysis";
        }
        if (day.autophagy) {
            classType = "daySquare-autophagy";
        }
        return classType
    }

    return (
        <div>
            <div className="container-register">
                <div className="daysAndMonths">

                    <div className="daysWeek">
                        <span>Mon</span>
                        <span></span>
                        <span>Wed</span>
                        <span></span>
                        <span>Fri</span>
                        <span></span>
                        <span>Sun</span>
                    </div>
                    <div className="months">
                        {monthsRegister?.map((month, index) => {
                            return <span key={index}>{month}</span>
                        })}
                    </div>
                    <div className="grid-register">
                        {all === undefined ? <p>Loading...</p> : all.map((day, index) => {
                            return <div key={index} className={handleClass(day)} title={day.date.toString().split(" ", 4).join(" ")}></div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YearGrid

