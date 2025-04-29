import * as faceapi from 'face-api.js';

async function Face_encoder(file) {
    try {
        console.log(file);
        
        // Load both the SSD MobileNet V1 model and FaceLandmark68Net model
        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);

       
        const imgUrl = URL.createObjectURL(file);
        
        const img = await faceapi.fetchImage(imgUrl);
        
       
        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        
        if (!detection) {
            throw new Error('No face detected in the image.');
        }
        
        
        // const descriptions = [detection.descriptor];
        // console.log(descriptions);
        // const descriptorArray = Array.from(detection.descriptor);
        // console.log(descriptorArray)
        return detection.descriptor;
        
    } catch (error) {
        console.error('Error occurred:', error);
        throw error; 
    }
}

export default Face_encoder;
