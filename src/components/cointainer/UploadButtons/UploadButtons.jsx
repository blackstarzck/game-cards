import React, { useState, useEffect }from 'react'
import { ButtonUpload, ButtonRecruit, ButtonGetPrev } from '../../Button/Button'
import { Wrapper } from './UploadButtons.elements'
import * as faceapi from 'face-api.js';

const UploadButtons = ({...props}) => {
    const [ loading, setLoading ] = useState(false);
    const [ imgSrc, setImgSrc ] = useState("");
    const [ expression, setExpression ] = useState({ });
    const keyNames = [ "angry", "disgusted", "fearful", "happy", "neutral", "sad", "surprised"  ];

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
                .then( (result) => {
                    setExpression(result);
                    console.log(expression, result);
                });
            });
        }
        imgSrc && loadModels();
    }, [imgSrc]);

    const onChange = async evt => {
        let src = await URL.createObjectURL(evt.target.files[0]);
    
        // const reader = new FileReader();
        // reader.readAsDataURL(evt.target.files[0]);
        // reader.onload = function(event){
        //   src = event.target.result;
        //   console.log(1, src)
        // }

        setImgSrc(src);
     }

     const detect = async () => {
        const img = document.createElement("img");
        img.src = imgSrc;
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();
    
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
        console.log(detections);
        return obj;
    }

    return (
        <Wrapper className="outer-wrapper">
            <ButtonUpload onChange={onChange} />
            <Wrapper className="inner-wrapper">
                <ButtonRecruit activeState={ !props.newCard ? "active" : "inactive" } selectNewOrPrev={props.selectNewOrPrev} />
                <ButtonGetPrev activeState={ props.newCard ? "active" : "inactive" } selectNewOrPrev={props.selectNewOrPrev} />
            </Wrapper>
        </Wrapper>
    )
}

export default UploadButtons