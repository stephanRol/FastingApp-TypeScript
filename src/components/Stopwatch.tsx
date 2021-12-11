// import { useEffect, useState } from 'react'

// const Stopwatch = () => {
//     const [time, setTime] = useState(0);
//     const [timeOn, setTimeOn] = useState(false);

//     useEffect(() => {
//         let interval: NodeJS.Timeout;

//         if (timeOn) {
//             interval = setInterval(() => {
//                 setTime(s => s + 1)
//             }, 1000)
//         } else {
//             if (time !== 0) {
//                 let response: boolean = window.confirm("Are you sure you want to reset the counter?");
//                 if (response) setTime(0)
//             }
//         }
//         return () => clearInterval(interval)

//     }, [timeOn])

//     let stopwatchObj = {
//         seconds: (Math.floor(time) % 60).toString().padStart(2, "0"),
//         minutes: (Math.floor(time / 60) % 60).toString().padStart(2, "0"),
//         hours: (Math.floor(time / 60 / 60) % 24).toString().padStart(2, "0"),
//     }

//     let { seconds, minutes, hours } = stopwatchObj

//     return (
//         <div>
//             <h2>Fast Stopwatch</h2>
//             <div>{new Date().toLocaleTimeString()}</div>
//             <div>{new Date().toLocaleDateString()}</div>
//             <div><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></div>
//             <button onClick={timeOn ? () => setTimeOn(false) : () => setTimeOn(true)}>{!timeOn ? "Start Fast NOW!" : "Stop"}</button>
//         </div>
//     )
// }

// export default Stopwatch

import { useEffect, useState } from 'react'

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [timeOn, setTimeOn] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (localStorage.getItem("fastStart") && time === 0) {
            setTimeOn(true);
        }

        if (timeOn) {
            let fastStart: number;

            if (!localStorage.getItem("fastStart")) {
                localStorage.setItem("fastStart", new Date().getTime().toString())
            }

            let timeStart = localStorage.getItem("fastStart");
            if (timeStart) fastStart = parseInt(timeStart);

            interval = setInterval(() => {
                setTime(new Date().getTime() - fastStart)
            }, 1000)

        } else {
            if (time !== 0) {
                let response: boolean = window.confirm("Are you sure you want to reset the counter?");
                if (response) {
                    setTime(0)
                    localStorage.removeItem('fastStart');
                } else {
                    setTimeOn(true);
                }
            }
        }
        return () => clearInterval(interval)

    }, [timeOn])

    let stopwatchObj = {
        seconds: (Math.floor(time / 1000) % 60).toString().padStart(2, "0"),
        minutes: (Math.floor(time / 1000 / 60) % 60).toString().padStart(2, "0"),
        hours: (Math.floor(time / 1000 / 60 / 60) % 24).toString().padStart(2, "0"),
    }

    let { seconds, minutes, hours } = stopwatchObj

    const handleStart = () => setTimeOn(true)
    const handleReset = () => setTimeOn(false);


    return (
        <div>
            <h2>Fast Stopwatch</h2>
            <div>{new Date().toLocaleTimeString()}</div>
            <div>{new Date().toLocaleDateString()}</div>
            <div><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></div>
            <button onClick={timeOn ? handleReset : handleStart}>{!timeOn ? "Start Fast NOW!" : "Reset"}</button>
        </div>
    )
}

export default Stopwatch
