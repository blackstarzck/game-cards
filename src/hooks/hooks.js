import { useEffect, useRef, useState } from 'react';
import Database from '../service/database';

const db = new Database();

export const useData = (table, input) => {
    const [ data, setData ] = useState();

    useEffect(() => {
        db.getSingleData(table, input)
        .then((result) => {
            setData(result);

            console.log("useData: ", result);
        });
    }, [table]);

    return data;
}

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        if(delay !== null){
            const timerId = setInterval(tick, delay);
            return () => clearInterval(timerId);
        }
    }, [delay]);
}