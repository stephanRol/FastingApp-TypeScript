import { useEffect, useState, useContext } from 'react'
import FastRegister from '../FastRegister'
import { TimeContext } from "../../Context/timeContext"

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [timeOn, setTimeOn] = useState(false);
    const { fastObj, setFastObj } = useContext(TimeContext)

    //restart the stopwatch after 24 hours
    useEffect(() => {
        if (time > 9 * 1000) {
            console.log("Soy mayor que 9");
            if (timeOn) {
                setTimeOn(false);
                setTime(0)
                localStorage.removeItem('fastStart');
                setFastObj({
                    date: new Date(),
                    lipolysis: false,
                    autophagy: false,
                    startTime: new Date(0, 0, 0)
                })
            }
        }
    }, [time])

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (localStorage.getItem("fastStart") && time === 0) {
            setTimeOn(true);
        }

        if (timeOn) {
            let fastStart: number;

            // if (!localStorage.getItem("fastStart")) {
            //     localStorage.setItem("fastStart", new Date().getTime().toString())
            // }

            if (fastObj.startTime.getFullYear() === new Date(0, 0, 0).getFullYear()) {
                setFastObj({ ...fastObj, startTime: new Date() })
                fastStart = new Date().getTime()
            }

            // let timeStart = localStorage.getItem("fastStart");
            // if (timeStart) fastStart = parseInt(timeStart);

            // fastStart = fastObj.startTime.getTime()
            // if (timeStart) fastStart = parseInt(timeStart);

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
                        startTime: new Date(0, 0, 0)
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

    let totalTime = 20 * 60 * 60 * 1000; //72000000
    let percentage = (time / totalTime) * 100
    let grados = percentage * 360 / 100;
    let styleObj = { backgroundImage: `conic-gradient( transparent 0deg, transparent ${grados}deg, #444644 ${grados}deg, #444644 360deg)` }

    return (
        <div>
            <div className='stopwatchContainer'>
                <div className="circleContainer">
                    <div className="circleOutside-layer1">
                        <div className="circleOutside-layer2">
                            <div className="circleOutside-layer3" style={styleObj}>
                                <div className="circleInside">
                                    <div className='stopwatch'><span className='timeUnits'>{hours}</span><span className='colon'>:</span><span className='timeUnits'>{minutes}</span><span className='colon'>:</span><span className='timeUnits'>{seconds}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='btnContainer'>
                <button className="stopwatchButton" onClick={timeOn ? () => setTimeOn(false) : () => setTimeOn(true)}>{!timeOn ? "Start Fast NOW!" : "Reset"}</button>
            </div>
            <FastRegister time={time} setTime={setTime} />
        </div>
    )
}

export default Stopwatch
