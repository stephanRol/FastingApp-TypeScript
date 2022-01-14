import { useEffect, useState, useContext, useRef } from 'react'
import FastRegister from '../FastRegister'
import { TimeContext } from "../../Context/timeContext"
import { FetchFasting } from '../../helper/FetchFasting';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [timeOn, setTimeOn] = useState(false);
    const { fastObj, setFastObj } = useContext(TimeContext)
    const refFastStart = useRef(0)

    //restart the stopwatch after 24 hours
    useEffect(() => {
        if (time > 9 * 1000) {
            console.log("Soy mayor que 9");
            if (timeOn) {
                setTimeOn(false);
                setTime(0)
            }
        }
    }, [time])

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let fastStart: number;

        if (timeOn) {
            if (time === 0) {
                if (new Date(fastObj.date).toLocaleDateString() === new Date().toLocaleDateString()) {
                    //DELETE y luego POST
                    console.log("DELETE y luego POST", fastObj);
                    //DELETE
                    FetchFasting({ url: `http://localhost:3004/posts/${fastObj.id}`, method: "DELETE" })
                        .then(res => console.log(res))

                    //POST
                    FetchFasting({
                        url: 'http://localhost:3004/posts', method: "POST", fastObj: {
                            date: fastObj.date,
                            lipolysis: fastObj.lipolysis,
                            autophagy: fastObj.autophagy,
                            startTime: fastObj.startTime
                        }
                    }).then(res => {
                        console.log(res);
                        // setFastObj({
                        //     date: new Date(),
                        //     lipolysis: false,
                        //     autophagy: false,
                        //     startTime: new Date()
                        // })
                    })

                    fastStart = new Date().getTime();

                } else {
                    console.log("NUEVO POST!", fastObj);
                    FetchFasting({
                        url: 'http://localhost:3004/posts', method: "POST", fastObj: {
                            date: new Date(),
                            lipolysis: false,
                            autophagy: false,
                            startTime: new Date()
                        }
                    }).then(res => {
                        console.log(res);
                        setFastObj({
                            id: fastObj.id! + 1, // OJO AQUI
                            date: new Date(),
                            lipolysis: false,
                            autophagy: false,
                            startTime: new Date()
                        })
                    })
                    // fastStart = new Date().getTime(); // usar un useRef?
                    refFastStart.current = new Date().getTime(); // usar un useRef?

                }
            } else {
                refFastStart.current = fastObj.startTime.getTime();
            }

            interval = setInterval(() => {
                setTime(new Date().getTime() - refFastStart.current)
            }, 1000)

        } else {
            if (time !== 0) {
                let response: boolean = window.confirm("Are you sure you want to reset the stopwatch?");
                if (response) {
                    setTime(0)
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
