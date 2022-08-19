import { useEffect, useState } from 'react';
import Database from '../service/database';

const db = new Database();

export const useData = (table, input) => {
    const [ data, setData ] = useState();

    useEffect(() => {
        console.log("??");
        db.getSingleData(table, input)
        .then((result) => {
            setData(result);

            console.log("useData: ", result);
        });
    }, [table]);

    return data;
}
