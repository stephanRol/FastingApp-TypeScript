import { useContext, useEffect } from 'react';
import { TimeContext } from '../Context/timeContext'

interface IRegister {
    time: number;
}

const FastRegister = ({ time }: IRegister) => {
    const { fastObj, setFastObj } = useContext(TimeContext)

    if (time > 12 * 60 * 60 * 1000) {
        fastObj.lipolysis = true;
    }
    if (time > 16 * 60 * 60 * 1000) {
        fastObj.autophagy = true;
    }

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



