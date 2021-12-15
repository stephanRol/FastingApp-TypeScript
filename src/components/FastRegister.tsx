import { useContext, useEffect } from 'react';
import { TimeContext } from '../Context/timeContext'

interface IRegister {
    time: number;
}

const FastRegister = ({ time }: IRegister) => {
    const { fastObj, setFastObj } = useContext(TimeContext)

    // console.log("render time");
    // console.log(fastObj);



    if (time > 5000) {
        fastObj.lipolysis = true;
    }
    if (time > 10000) {
        fastObj.autophagy = true;
    }

    useEffect(() => {
        setFastObj({ ...fastObj })
    }, [fastObj.lipolysis, fastObj.autophagy])

    return (
        <div>
            <h2>Fast Register</h2>
        </div>
    )
}

export default FastRegister;



