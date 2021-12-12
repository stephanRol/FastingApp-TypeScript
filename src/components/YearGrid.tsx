import { useState } from "react"

export type dayType = {
    date: Date;
    lipolysis: boolean;
    autophagy: boolean;
}
interface YearGridProps {
    fastObj: dayType
}

const YearGrid = ({ fastObj }: YearGridProps) => {
    const [yearData, setYearData] = useState([])

    let allDaysOfYear: dayType[] = [];
    // let date = new Date(2021, 11, 27)
    let date = new Date()
    let shifted: dayType;

    for (let i = 365; i > -1; i--) {
        allDaysOfYear.push({
            date: new Date(date.getTime() - 24 * 60 * 60 * 1000 * i),
            lipolysis: false,
            autophagy: false,
        })
    }

    //List start on Monday.
    do {
        shifted = allDaysOfYear.shift()!;
    } while (shifted.date.getDay() !== 0)

    //When starts week 53, the whole week 1 will be shifted in order to have always just 52 weeks.
    if (allDaysOfYear.length > 364) {
        for (let i = 0; i < 7; i++) {
            allDaysOfYear.shift()!;
        }
    }

    if (fastObj.date.toLocaleDateString() === new Date().toLocaleDateString()) {
        if (fastObj.lipolysis) allDaysOfYear[363].lipolysis = true;
        if (fastObj.autophagy) allDaysOfYear[363].autophagy = true;
    }

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
                <div className="grid-register">
                    {allDaysOfYear.map((day, index) => {
                        return <div key={index} className={handleClass(day)} title={day.date.toString().split(" ", 4).join(" ")}></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default YearGrid
