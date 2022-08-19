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
        console.log(`[get] tableName: ${tableName}, docName: ${docName}`, result.data());
        return result.data();
    }

    writeNewData(tableName, docum, input){
        const docName = String(docum);
        this.getSingleData(tableName, docName)
        .then((result) => {
            let doubleCheck = false;

            switch(tableName){
                case "ALARM_TABLE" :
                    for(let i = 0; i < result.data.length; i++){
                        if(result.data[i].TRG_ID == input.frdId && result.data[i].TRG_NAME == input.frdName){
                            doubleCheck = true;
                            break;
                        }
                    }
                    if(!doubleCheck){
                        setDoc(doc(this.db, "ALARM_TABLE", docName), {
                            UID: "나",
                            USER_ID: "나",
                            USER_NAME: "나",
                            data: [
                                ...result?.data,
                                { ALARM_TYPE : "FRD_REQ_SENT",
                                READ_STATE : "N",
                                RESULT : "N",
                                TIME_STAMP : new Date(),
                                TRG_ID : input.frdId,
                                TRG_NAME : input.frdName,
                                TRG_UID : "" }
                            ]
                        });
                        console.log("친구신청 완료");
                        return { state: "success", msg: "친구신청이 완료되었습니다." }
                    }else{
                        console.log("친구신청 중복");
                        return { state: "error", msg: "이미 친구신청하였습니다." }
                    }
                break;
                case "USER_LOG" :
                    setDoc(doc(this.db, "USER_LOG", docName), {
                        UID: "",
                        USER_ID: input.id,
                        USER_NAME: input.name,
                        LOG: [
                            ...result?.LOG,
                            { STATUS: "IN", TIME_STAMP: new Date() }
                        ]
                    });
                break;
            }
            console.log(`[write] tableName: ${tableName}, docName: ${docName} input: `, input);
        });
    }
}


export default Database