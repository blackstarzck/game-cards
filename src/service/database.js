import { firebaseApp } from "./firebase"
import { getFirestore, collection, doc, getDoc , getDocs, setDoc } from 'firebase/firestore';

class Database {
    constructor(){ this.db = getFirestore(firebaseApp); }

    async getDatas(tableName){
        const docRef = collection(this.db, tableName);
        const docSnapshot = await getDocs(docRef);
        const result = docSnapshot.docs.map(doc => doc.data());
        return result;
    }

    async getSingleData(tableName, docName){
        const docRef = doc(this.db, tableName, docName);
        const result = await getDoc(docRef);
        return result.data();
    }
}


export default Database