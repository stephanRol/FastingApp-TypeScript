import { useContext, useEffect, useState } from "react"
import { FetchFasting } from "../helper/FetchFasting";
import { dayType, TimeContext } from "../Context/timeContext"

const YearGrid = () => {
    const { fastObj } = useContext(TimeContext)
    const [getData, setGetData] = useState<dayType[]>({} as dayType[])
    const [addNewPost, setAddNewPost] = useState<dayType[] | undefined>();

    useEffect(() => {
        let data = FetchFasting({ url: 'http://localhost:3004/posts', method: "GET" })
        data.then(
            res => { if (res !== undefined) setGetData(res) })
    }, [fastObj])

    useEffect(() => {
        if (fastObj.autophagy || fastObj.lipolysis) {

            const condition1 = getData[getData.length - 1].lipolysis;
            const condition2 = getData[getData.length - 1].autophagy;
            const condition3 = new Date(getData[getData.length - 1].date).toLocaleDateString() === new Date().toLocaleDateString();

            if (condition1 && condition2 && condition3) return;

            if (condition3) {
                let deleteFinished = FetchFasting({ url: `http://localhost:3004/posts/${getData[getData.length - 1].id}`, method: "DELETE" })
                deleteFinished.then(res => setAddNewPost(res))
            } else {
                FetchFasting({
                    url: 'http://localhost:3004/posts', method: "POST", fastObj: {
                        date: fastObj.date,
                        lipolysis: fastObj.lipolysis,
                        autophagy: fastObj.autophagy,
                    }
                });
            }
        }
    }, [getData])

    useEffect(() => {
        if (addNewPost === undefined) return;
        FetchFasting({
            url: 'http://localhost:3004/posts', method: "POST", fastObj: {
                date: fastObj.date,
                lipolysis: fastObj.lipolysis,
                autophagy: fastObj.autophagy,
            }
        });
    }, [addNewPost])















    // let allDaysOfYear: dayType[] = [];
    // let shifted: dayType;

    // for (let i = 365; i > -1; i--) {
    //     allDaysOfYear.push({
    //         date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
    //         lipolysis: false,
    //         autophagy: false,
    //     })
    // }

    // let alfa =[...allDaysOfYear, {
    //     date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
    //     lipolysis: false,
    //     autophagy: false,
    // }]

    // //List start on Monday.
    // do {
    //     shifted = allDaysOfYear.shift()!;
    // } while (shifted.date.getDay() !== 0)

    // //When starts week 53, the whole week 1 will be shifted in order to have always just 52 weeks.
    // if (allDaysOfYear.length > 364) {
    //     for (let i = 0; i < 7; i++) {
    //         allDaysOfYear.shift()!;
    //     }
    // }

    // if (fastObj.date.toLocaleDateString() === new Date().toLocaleDateString()) {
    //     if (fastObj.lipolysis) allDaysOfYear[allDaysOfYear.length - 1].lipolysis = true;
    //     if (fastObj.autophagy) allDaysOfYear[allDaysOfYear.length - 1].autophagy = true;
    //     ;
    // }

































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
                {/* <div className="grid-register">
                    {allDaysOfYear.map((day, index) => {
                        return <div key={index} className={handleClass(day)} title={day.date.toString().split(" ", 4).join(" ")}></div>
                    })}
                </div> */}
            </div>
        </div>
    )
}

export default YearGrid
