import { useEffect, useState, useContext } from 'react'
import FastRegister from './FastRegister'
import { TimeContext } from "../Context/timeContext"

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [timeOn, setTimeOn] = useState(false);
    const { setFastObj } = useContext(TimeContext)

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
                let response: boolean = window.confirm("Are you sure you want to reset the stopwatch?");
                if (response) {
                    setTime(0)
                    localStorage.removeItem('fastStart');
                    setFastObj({
                        date: new Date(),
                        lipolysis: false,
                        autophagy: false,
                    })
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

    return (
        <div>
            <h2>Fast Stopwatch</h2>
            <div><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></div>
            <button onClick={timeOn ? () => setTimeOn(false) : () => setTimeOn(true)}>{!timeOn ? "Start Fast NOW!" : "Reset"}</button>
            <FastRegister time={time} />
        </div>
    )
}

export default Stopwatch
