import { useContext, useEffect } from 'react';
import { TimeContext } from '../Context/timeContext'

interface IRegister {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}

const FastRegister = ({ time, setTime }: IRegister) => {
    const { fastObj, setFastObj } = useContext(TimeContext)

    //BORRAR
    // console.log(fastObj.startTime);
    // console.log(new Date(0, 0, 0).getFullYear());
    // console.log(fastObj.startTime.getFullYear() == new Date(0, 0, 0).getFullYear());


    useEffect(() => {
        setFastObj({ ...fastObj })
    }, [fastObj.lipolysis, fastObj.autophagy])

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

    //ESTA ARRIBA, periodo de test a ver si funciona bien..
    // useEffect(() => {
    //     setFastObj({ ...fastObj })
    // }, [fastObj.lipolysis, fastObj.autophagy])


    return (
        <div>
            <h2>Fasting Register</h2>
        </div>
    )
}

export default FastRegister;


