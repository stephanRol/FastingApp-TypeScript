import React, { useEffect } from 'react';
import { FetchFasting } from './helper/FetchFasting';

const Borrar = () => {
    console.log("hola mundo!");

    useEffect(() => {
        FetchFasting({ url: 'http://localhost:3004/comida?id=beta', method: "GET" })
            .then(
                res => {
                    console.log(res);

                    if (res !== undefined) {
                        console.log(res);
                    }
                })

        FetchFasting({
            url: "http://localhost:3004/comida/1", method: "POST", fastObj: {
                date: new Date(),
                lipolysis: true,
                autophagy: true,
                startTime: new Date(),
                timeOn: false,
            }
        })
    }, [])

    return <div></div>
};

export default Borrar;
