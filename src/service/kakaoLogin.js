import Database from "./database";

const { Kakao } = window;
const db = new Database;

export function kakaoLoginCheck(){
    return new Promise((resolve) => {
        const token = Kakao.Auth.getAccessToken();
        if(token){
            console.log("[O] 카카오로 로그인하였습니다.");
            Kakao.API.request({
                url: '/v2/user/me',
                success: function(result) {
                    const data = {
                        name: result.kakao_account.profile.nickname,
                        id: result.id,
                    };
                    resolve({ ...result, REGI_TYPE: "KAKAO" });
                }
            });
        }else{
            console.log("[X] 카카오로그인이 아닙니다.");
            resolve(null);
        }
    });
}

export function kakaoLogin(redirectFunc){
    return new Promise((resolve) => {
        // step1
        Kakao.Auth.login({
            success: function(authObj) {
                // step2
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function(result) {
                        const data = {
                            regi_type: "KAKAO",
                            name: result.kakao_account.profile.nickname,
                            id: `K-${result.id}`,
                            inOut: "IN",
                            email: result.kakao_account.email
                        };

                        console.log("카카오 유저 정보: ", result);
                        // step3
                        db.writeNewData("USER_LOG", result.kakao_account.email, data);
                        db.writeNewData("USERS", result.kakao_account.email, data, redirectFunc);
                        resolve({ ...result, REGI_TYPE: "KAKAO" });
                    }
                });
            },
            fail: function(err) {
                console.log(`[kakaoLogin함수 오작동] err:${err}`);
            },
        });
        
    });
}

export function kakaoLogOut (data){
    return new Promise((resolve)=> {
        Kakao.Auth.logout(function() {
            console.log("로그아웃 데이터: ", data)
            db.writeNewData("USER_LOG", data.id, data);
            resolve(true);
        });
    });
}