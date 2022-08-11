import { firebaseApp } from "./firebase"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

class Database {
    constructor(){ this.db = getFirestore(firebaseApp); }

    async getData(tableName){
        const jobRef = collection(this.db, tableName);
        const jobSnapshot = await getDocs(jobRef);
        const jobList = jobSnapshot.docs.map(doc => doc.data());
        return jobList;
    }
}


export default Database