export function randomName(){
    // 조사
    var _f = [
        function (string) { //을/를 구분
            return _hasJong(string) ? '을' : '를';
        },
        function (string) { //은/는 구분
            return _hasJong(string) ? '은' : '는';
        },
        function (string) { //이/가 구분
            return _hasJong(string) ? '이' : '가';
        },
        function (string) { //와/과 구분
            return _hasJong(string) ? '과' : '와';
        }
    ],
    _formats = {
        '을/를': _f[0],
        '을': _f[0],
        '를': _f[0],
        '을를': _f[0],
        '은/는': _f[1],
        '은': _f[1],
        '는': _f[1],
        '은는': _f[1],
        '이/가': _f[2],
        '이': _f[2],
        '가': _f[2],
        '이가': _f[2],
        '와/과': _f[3],
        '와': _f[3],
        '과': _f[3],
        '와과': _f[3]
    };

    function _hasJong(string) { //string의 마지막 글자가 받침을 가지는지 확인
        string = string.charCodeAt(string.length - 1);
        return (string - 0xac00) % 28 > 0;
    }

    var josa = {
        c: function (word, format) {
            if (typeof _formats[format] === 'undefined') throw 'Invalid format!';
            return _formats[format](word);
        },
        r: function (word, format) {
            return word + josa.c(word, format);
        }
    };

    var jobs = [
        [' 도둑', ' 연쇄절도범', ' 수호자', ' 담당일진', ' 약탈자', ' 방문판매원', ' 파괴자', ' 테러범', ' 관찰자', ' 밑장빼기9단', ' 추종자',
            ' 셔틀', ' 지배자', ' 사재기빌런', ' 갈취왕', ' 단속반', '스틸러'
        ],
        [' 카사노바', ' 소리없는방귀빌런', ' 절대강자', ' 노숙자', ' 진상손님', ' 술고래', ' 터줏대감', ' 트월킹머신', ' 관짝춤머신', ' 화장실문지기', ' 탈모인협회장', ' 지박령',
             '푸드파이터', ' 잔반처리반', ' 청소부장', ' 축구대회태클마스터', ' 개미핥기조련사', ' 공문서위조마스터', ' 층간소음마스터'
        ]
    ]

    var locations = [
        ['노인정', '사우나', '성인용품점', '러브호텔', '피시방', '국어학원', '수학학원', '영어학원', '과학학원', '기숙학원', '기숙사', '독서실', '대형마트',
            '스터디카페', '노약자석', '임산부석', '장애인석', '대형마트시식코너', '경찰서', '대중목욕탕', '무료급식소', '초등학교', '중학교', '고등학교', '편의점',
            '학원가', '세탁소', '풋살장', '미용실', '찜질방', '동사무소', '전통시장', '태권도장', '놀이터', '헬스장', '할매순댓국밥', '버스정류장', '삼성프라자',
            '국회의사당', '흡연실', '아파트관리사무소', '생활관', '서점', '도서관', '급식실', '휴대폰대리점', '주유소', '공원', '에버랜드', '롯데월드', '지하철',
            '지하철역', '시내버스', '고속버스', '중화반점', '동대문시장', '맘스터치', '맥도날드', '롯데리아', '우정사업본부', '산채비빔밥먹는스님앞에서',
            '길고양이급식소', '휴지통속', '반찬가게', '동물원', '왁싱샵', '노인복지관', '공중화장실', '설빙', '배스킨라빈스', '피자스쿨'
        ],
        ['포식자', 'AD', '수능시험장', '결국사람', '펩시', '유모차레이스', '냉탕에오줌싸서', '스키장상급자코스', '고구려대학교', '수능갤러리', '공사장', '군부대',
            '훈련소', '롯데마트', '시공의폭풍', '웹툰미리보기사이트', '파인애플피자', '주식', '비트코인', '도박', '토토', '대학원연구실', '온라인클래스', '시대에',
            'ISIS', '머리카락못내밀면서', '다이어트하는친구', '지구평면설', '붕어빵에', '자택에서', '교회에서', '절에서', '연애경험이', '친구에어팟', '택시타고',
            '게임의폭력성을이해하기위해', '배고파서', '배고프면', '벽돌집벽돌', '고깃집공깃밥', '뻐꾸기훔쳐가려고', '최종학력', '고시원냉장고김치통'
        ]
    ]

    var exampleNames = [""];
    var exampleLocations = [""];
    var totalJob = [];

    for (let i = 0; i < jobs.length; i++) {
        totalJob = totalJob.concat(jobs[i]);
    }

    function generate(varName, varLocation) {
        return generateResult(varName, varLocation);
    }

    function generateResult(varName, varLocation) {
        var result = '';


        /* 일반 장소 처리 */
        var randomDetailLocation = locations[0][Math.floor(Math.random() * locations[0].length)];
        var randomDetailJob = totalJob[Math.floor(Math.random() * totalJob.length)];
        // debug: console.log(randomDetailLocation, randomDetailJob)

        // 특별한 문장 정의
        if (randomDetailLocation === '시내버스') {
            if (Math.random() > 0.3) {
                randomDetailLocation = (Math.floor(Math.random() * 999) + 1) + '번' + randomDetailLocation
            }
        } else if (randomDetailLocation.indexOf('학교') >= 0) {
            if (Math.random() > 0.5) {
                randomDetailLocation = randomDetailLocation + (Math.floor(Math.random() * 2) + 1) + '학년' + (Math
                    .floor(Math.random() * 9) + 1) + '반'
            }
        }
        if ((randomDetailLocation === '지하철' || randomDetailLocation === '지하철역') && randomDetailJob ===
            '앞에서절두번하는') {
            // debug: console.log('지하철', '절두번하는')
            while (randomDetailJob === '앞에서절두번하는') {
                // debug: console.log('지하철', '절두번하는', '루프')
                randomDetailJob = totalJob[Math.floor(Math.random() * totalJob.length)]
            }
            // debug: console.log('지하철', '절두번하는', randomDetailJob)
        }
        // 특별한 문장 정의 완료

        if (jobs[0].indexOf(randomDetailJob) >= 0) {
            result = generateSpecificCase(1, [varLocation, randomDetailLocation, randomDetailJob, varName])
        } else if (jobs[1].indexOf(randomDetailJob) >= 0) {
            result = generateSpecificCase(2, [varLocation, randomDetailLocation, randomDetailJob, varName])
        }

        //debug: console.log(randomDetailLocation, randomDetailJob, result)

        return result
    }

    function generateSpecificCase(caseCode, params) {
        if (caseCode === 1 || caseCode === 2 ) {
            // 특별한 문장 정의
            if (params[1] === '납골당') {
                params[2] = ['유골항아리도둑', '유골항아리파괴자'][Math.floor(Math.random() * 2)]
            }
            // 특별한 문장 정의 완료

            return params[0] + params[1] + params[2] + params[3]
        } else if (caseCode === 3) {

            // 특별한 문장 정의
            if (params[1] === '틀니') {
                params[1] = (Math.floor(Math.random() * 11) + 1) + '주' + params[1]
            }
            // 특별한 문장 정의 완료

            if (params[0] === '' || Math.floor(Math.random() * 2) === 0) {
                return params[1] + params[2] + params[3]
            } else {
                if (Math.floor(Math.random() * 2) === 0) {
                    return params[1] + params[2] + params[0] + '의아들' + params[3]
                } else {
                    return params[1] + params[2] + params[0] + '의딸' + params[3]
                }
            }
        } else {
            return undefined
        }
    }

    var exampleName = exampleNames[Math.floor(Math.random() * exampleNames.length)];
    var exampleLocation = exampleLocations[Math.floor(Math.random() * exampleLocations.length)];
    return generate(exampleName, exampleLocation);
}

export function setInitDatas(name, listObj){
    let DATA;
    switch(name){
        case "USER_CARDS" :
            DATA = {
                UID: "", USER_ID: "", USER_NAME: "", DAILY_CNT: 5,
                CARDS: [
                    { KEY: 1, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 2, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 3, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 4, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 5, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 6, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 7, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 },
                    { KEY: 8, CODE: "", QUOTE: "", DESCR: "", GROUP_NO: 0, GROUP_ORDER: 0, NICK: "", JOB: "", JOB_KR: "", JOB_EN: "", PREF_RANK: 0, REMAIN: 0, LEVEL: 0, STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 }, POWER: 0 }
                ],
                GROUPS: {
                    NO1 : { GROUP_POWER: 0, GROUP_RANK: 0, MEMBERS: [] },
                    NO2 : { GROUP_POWER: 0, GROUP_RANK: 0, MEMBERS: [] },
                    NO3 : { GROUP_POWER: 0, GROUP_RANK: 0, MEMBERS: [] }
                  }
            }
        break;
        case "MAIN_CARD" :
            DATA = {
                NICK: "",
                JOB_KR: "",
                JOB_EN: "",
                LEVEL: 1,
                EXP: 0,
                GROUP_NO: 0,
                STATS: { STR: 0, AGI: 0, DEX: 0, VIT: 0, INT: 0, LUCK: 0 },
                REMAIN: 0,
                CODE: "",
                DESCR: "",
                QUOTE: "",
                SELECTED: 0,
                IMG_URL: "",
            }
        break;
        case "EXPRESSION" :
            DATA = {
                age: 0,
                gender: "",
                expression: {
                    name: "",
                    value: 0
                }
            }
        break;
        case "JOBS" :
            DATA = [
                { KR: '소프트웨어 엔지니어', key: 1, EN: 'Software Engineer' },
                { key: 2, EN: 'Frontend Developer', KR: '프론트엔드 개발자' },
                { key: 3, EN: 'Backend Developer', KR: '백엔드 개발자' },
                { KR: 'CTO', EN: 'Chief Technology Officer', key: 4 },
                { KR: 'QA', EN: 'Test Engineer', key: 5 },
                { EN: 'Web Publisher', key: 6, KR: '웹 퍼블리셔' },
                { EN: 'UI/UX Designer', key: 7, KR: 'UI/UX 디자이너' },
                { key: 8, EN: 'Data Engineer', KR: '데이터 엔지니어' },
                { key: 9, EN: 'Project Manager', KR: '기획자' }
            ]
        break;
        case "BTL_DT" :
            if(listObj){
                DATA = {
                    KEY: "",
                    BET_DESCR : "",
                    CONTENDER_GROUP_NO : 0,
                    CONTENDER_GROUP_POWER : 0,
                    CONTENDER_GROUP_MEMBERS : [],
                    CONTENDER_MSG: "",

                    DEFENDER_GROUP_NO : 0,
                    DEFENDER_GROUP_POWER : 0,
                    DEFENDER_GROUP_MEMBERS : [],
                    DEFENDER_ID : "",
                    DEFENDER_NAME : "",
                    DEFFENDER_MSG : "",

                    RESULT : "",
                    TIME_STAMP : ""
                }
            }else{
                DATA = { UID: "", USER_ID: "", USER_NAME: "",DETAIL: [] }
            }
        break;
        case "USER_FRDS" :
            DATA = {
                USER_NAME: "", USER_ID: "", UID: "",
                FRDS_INFO: []
            }
            // DATA = {FRD_ID: "", FRD_NAME: "", FRD_UID: "", LOGIN: "", POWER: 0, RANK: 0 }
        break;
        case "ALARM_TABLE" :
            DATA = {
                UID: "", USER_ID: "", USER_EMAIL: "", USER_NAME: "",
                data: []
            }
        break;
    }

    return DATA
}