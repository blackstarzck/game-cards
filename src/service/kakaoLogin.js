import Database from "./database";
import { getCookie } from "../util/util";

const db = new Database;

export function kakaoLogin (){
    const { Kakao } = window;

    // step1
    Kakao.Auth.login({
        success: function(authObj) {
            // step2
            Kakao.API.request({
                url: '/v2/user/me',
                success: function(res) {
                    console.log("res: ", res);
                    const data = {
                        name: res.kakao_account.profile.nickname,
                        id: res.id,
                    };

                    // step3
                    db.writeNewData("USER_LOG", res.id, data);

                    // step4
                    setTimeout(() => {
                        Kakao.Auth.authorize({ redirectUri: 'http://localhost:3000' });
                    }, 600);
                }
            });
        },
        fail: function(err) {
            console.log(err);
        },
    });
}


export function displayToken (){
    const token = getCookie('authorize-access-token');

    console.log("displayToken: ", token);
    
    // if(token) {
    //     Kakao.Auth.setAccessToken(token)
    //     Kakao.Auth.getStatusInfo(({ status }) => {
    //         if(status === 'connected') {
    //             document.getElementById('token-result').innerText = 'login success. token: ' + Kakao.Auth.getAccessToken()
    //         } else {
    //             Kakao.Auth.setAccessToken(null)
    //         }
    //     })
    // }
}
