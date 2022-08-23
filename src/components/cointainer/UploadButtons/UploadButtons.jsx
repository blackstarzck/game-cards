import React, { useEffect }from 'react'
import { ButtonUpload, ButtonRecruit, ButtonGetPrev } from '../../Button/Button'
import { Wrapper } from './UploadButtons.elements'
import * as faceapi from 'face-api.js';

const UploadButtons = ({...props}) => {
    useEffect(() => {
        const loadModels = async () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(process.env.PUBLIC_URL+'/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri(process.env.PUBLIC_URL+'/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri(process.env.PUBLIC_URL+'/models'),
                faceapi.nets.faceExpressionNet.loadFromUri(process.env.PUBLIC_URL+'/models'),
                faceapi.nets.ageGenderNet.loadFromUri(process.env.PUBLIC_URL+'/models')
            ])
            .then(() => {
                detect()
                .catch((error) => {
                    console.log("얼굴/표정 감지 실패", error);
                })
                .then((result) => {
                    console.log("얼굴/표정 감지 성공", result);
                    result || alert("다른 이미지를 업로드해주세요")
                    result && props.getFaceResult(result);
                });
            });
        }
        props.imgSrc && loadModels();
    }, [props.imgSrc]);

    const onChange = evt => {
        let src = URL.createObjectURL(evt.target.files[0]);
    
        // const reader = new FileReader();
        // reader.readAsDataURL(evt.target.files[0]);
        // reader.onload = function(event){
        //   src = event.target.result;
        //   console.log(1, src)
        // }

        props.setImgSrc(src);
     }

     const detect = async () => {
        const keyNames = [ "angry", "disgusted", "fearful", "happy", "neutral", "sad", "surprised"  ];
        const img = document.createElement("img");
        img.src = props.imgSrc;
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();
        if(detections.length > 0){
            const genderResult = detections[0].gender;
            const ageResult = Math.round(detections[0].age);
            const expResult = detections[0].expressions;
            const resultArray = [];
            let value;

            keyNames.map((key) => {
                value = Math.round(expResult[`${key}`] * 100);
                resultArray.push({ key, value });
            });
        
            resultArray.sort(function(a, b) { // 오름차순
                return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
            });
        
            let key = resultArray[0].key;
            let val = resultArray[0].value;
            let obj = { 
                age: ageResult,
                gender: genderResult,
                expression : { name: key, value: val }
            };
            // console.log(detections);
            return obj;
        }else{
            console.log("감지된 얼굴/표정이 없습니다.");
        }
    }

    return (
        <Wrapper className="outer-wrapper">
            <ButtonUpload onChange={onChange} />
            <Wrapper className="inner-wrapper">
                <ButtonRecruit  newCard={props.newCard} selectNewOrPrev={props.selectNewOrPrev} />
                <ButtonGetPrev newCard={props.newCard} selectNewOrPrev={props.selectNewOrPrev} />
            </Wrapper>
        </Wrapper>
    )
}

export default UploadButtons