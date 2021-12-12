import { useEffect, useState } from "react";
import { dayType } from "../components/YearGrid"

type fetchMethod = "get" | "GET" | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE";

interface IOptions {
    method: fetchMethod;
    headers: {
        'content-type': string;
    }
}

interface IOptionsExt extends IOptions {
    body: string;
}

export const useFetch = (url: string, method: fetchMethod) => {
    const [data, setData] = useState();

    useEffect(() => {

        let options: IOptions | IOptionsExt = {
            method: method,
            headers: { 'content-type': 'application/json' },
        }

        if (method === "post" || method === "POST") {
            console.log("PASO POR ACA");
            options = { ...options, body: JSON.stringify({ date: "HOY", lipolysis: "SI", autophagy: "NO" }) }
        }

        try {
            const getData = async () => {
                let res = await fetch(url, options)
                console.log(res);

                if (!res.ok) {
                    let objError = {
                        err: true,
                        status: res.status,
                        statusText: res.statusText ? res.statusText : "Error occured",
                    };
                    throw objError;
                }
                let dataResponse = await res.json();
                setData(dataResponse);
            }

            getData();

        } catch (error) {

        }

    }, [])
    return { data };
}