import { useEffect, useState } from "react";
import { dayType } from "../Context/timeContext"
// import dayType from "../components/YearGrid"

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

interface IFetchPropsGetPutDel {
    url: string
    method: Exclude<fetchMethod, "post" | "POST">;
    fastObj?: never
}

interface IFetchPropsPost {
    url: string
    method: "post" | "POST";
    fastObj: dayType
}
type FetchProps = IFetchPropsGetPutDel | IFetchPropsPost;

export const useFetch = ({ url, method, fastObj }: FetchProps) => {
    const [data, setData] = useState();
    let date = new Date();
    let lipolysis = false;
    let autophagy = false;

    if (fastObj !== undefined) {
        date = fastObj.date;
        lipolysis = fastObj.lipolysis;
        autophagy = fastObj.autophagy;
    }

    useEffect(() => {

        let options: IOptions | IOptionsExt = {
            method: method,
            headers: { 'content-type': 'application/json' },
        }

        if (method === "post" || method === "POST") {
            options = { ...options, body: JSON.stringify({ date: date, lipolysis: lipolysis, autophagy: autophagy }) }
        }

        try {
            const getData = async () => {
                let res = await fetch(url, options)

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