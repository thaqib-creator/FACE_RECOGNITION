import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { arrayUnion, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import { db } from '../FirbaseConfig';
import { Box, Container, useToast } from '@chakra-ui/react';
import { UseUserContext } from '../ContextApi/UseUserContext';
import  axios  from 'axios';

import { useNavigate } from 'react-router-dom';


function Face() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const navigate=useNavigate();
  
  const toast=useToast()
  const [display,setdisplay]=useState(true);
  const {dept,uname,Batch,rollno,user}=UseUserContext();
  
  useEffect(() => {
    const loadModelsAndStartCamera = async () => {
      try {
        
        if(uname)
        {
          await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
          ]).then(startCamera());     


        }
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
  
  loadModelsAndStartCamera();
  },[dept,Batch,uname]);

  const startCamera = async () => {
    try {
     
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
        
          startFaceDetection()
        }
        
      
     }
    } catch (error) {
      console.error('Error accessing the camera:', error);
     }
  };



  const startFaceDetection = async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  
    console.log('Video metadata loaded, starting face detection');
    const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
    faceapi.matchDimensions(canvasRef.current, displaySize);
  
    const detectionInterval = setInterval(async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions({ minConfidence: 0.6 }))
          .withFaceLandmarks()
          .withFaceDescriptors();
  
        console.log("Number of detections:", detections.length);
  
        if (detections.length > 0) {
          console.log("Face detected");
          const detection = detections[0]; // Assuming only one face is detected
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          console.log("Best match:", bestMatch.toString());
  
          if (bestMatch._label == uname) {
            console.log(uname + " is detected");
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            clearInterval(detectionInterval);
            updateUser();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, 100);
  };


  async function updateUser()
  {
    setdisplay(false)
    try {
      
    const token = window.localStorage.getItem('usertoken')
         try
         {
          console.log("from api")
          const response = await axios.post('http://localhost:5000/sendemail',null,
           {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                email:user?.email,
              
            },
            
          });
          console.log(response);
         }
      catch(err)
      {
        console.log(err);
      }
            
      const docRef = doc(db, dept, Batch); 
      const studentsCollection = collection(docRef, "STUDENTS"); 
      const studentDocRef = doc(studentsCollection, "MANAGER"); 
      await updateDoc(studentDocRef, {
        MARKEDSTUDENTS:arrayUnion(rollno),
      });
      toast({
        title: 'Attendance',
        description: "SuccesFully Marked! "+uname,
        status: 'success',
        duration: 9000,
        position:"top-right",
        isClosable: true,
      })
   
      navigate('/');
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }
  async function getLabeledFaceDescriptions() {
    try {
      
      const docRef = doc(db, dept, Batch); 
      const studentsCollection = collection(docRef, "STUDENTS"); 
      const studentDocRef = doc(studentsCollection, uname); 
      
      
      const docSnap = await getDoc(studentDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const label = uname;
      
  

        if (data && data.WEBENCODING&& data.WEBENCODING.length > 0) {
          const storedDescriptor = data.WEBENCODING;
  
    
          const storedDescriptorArray = new Float32Array(storedDescriptor);
  
      
          return new faceapi.LabeledFaceDescriptors(label, [storedDescriptorArray]);
        } else {
          console.log("Descriptor field is empty or not set.");
        }
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  
    
    return [];
  }

  
  return (
    <>
    {display&& <Container   width={"full"}
      height={"100vh"}
      maxW={'full'}
      ml={0}
      border={'solid 2px red'}
      >
      {/* <Button onClick={startCamera}  isDisabled={!u}>Click</Button>
      <Button onClick={updateUser}  >tess</Button> */}
     
      
      <video ref={videoRef} autoPlay playsInline 
      style={{ transform: 'scaleX(-1)', width: '100vw', height: '100vh' } 
      
    }
    width= '100vw' height= '100vh'
      />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    

     

    </Container>}
     
  


    </> 
  );
}




export default Face;
  