import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut  } from "firebase/auth";
import { resolvePath } from "react-router-dom";
import Database from "./database";

const auth = getAuth();
const db = new Database;

export function firebaseLoginCheck(){
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("[O] 파이어베이스 로그인입니다.", user);
                resolve({ ...user, REGI_TYPE: "GOOGLE" });
            } else {
                console.log("[X] 파이어베이스 로그인이 아닙니다.", user);
            }
        });
    });
}

export function firebaseLogin (){
    const provider = new GoogleAuthProvider();

    return new Promise((resolve) => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const data = {
                name: result.user.displayName,
                id: `F-${result.user.email}`,
                inOut: "IN"
            };
  
            console.log("파이어베이스 유저정보: ", result);
            db.writeNewData("USER_LOG", result.user.email, data);
            db.writeNewData("USERS", result.user.email, data);
            resolve({ ...result, REGI_TYPE: "GOOGLE" });

        }).catch((error) => {
            console.log("파이어베이스 로그인 에러: ", error);
        });
    });
}

export function firebaseLogOut(data){
    return new Promise((resolve)=> {
        signOut(auth).then(() => {
                // Sign-out successful.
                console.log("파이어베이스 로그아웃 data: ", data);
                db.writeNewData("USER_LOG", data.id, data);
                resolve(true);
            }).catch((error) => {
                // An error happened.
                console.log("파이어베이스 로그아웃 에러: ", error);
            });
    });
}