import { useContext, useEffect } from 'react';
import { TimeContext } from '../Context/timeContext'

interface IRegister {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}

const FastRegister = ({ time, setTime }: IRegister) => {
    const { fastObj, setFastObj } = useContext(TimeContext)



    // if (time > 12 * 60 * 60 * 1000) {
    if (time > 3 * 1000) {
        fastObj.lipolysis = true;
    }
    if (time > 6 * 1000) {
        fastObj.autophagy = true;
    }
    if (time > 6 * 1000) {
        fastObj.autophagy = true;
    }
    if (time > 9 * 1000) {
        console.log("Soy mayor que 9");
        setTime(0);
        localStorage.removeItem('fastStart');
        // setFastObj({
        //     date: new Date(),
        //     lipolysis: false,
        //     autophagy: false,
        // })
    }


    // useEffect(() => {
    //     if (time !== 0) return;
    //     setFastObj({
    //         date: new Date(),
    //         lipolysis: false,
    //         autophagy: false,
    //     })
    // }, [time])

    useEffect(() => {
        setFastObj({ ...fastObj })
    }, [fastObj.lipolysis, fastObj.autophagy])

    return (
        <div>
            <h2>Fasting Register</h2>
        </div>
    )
}

export default FastRegister;



