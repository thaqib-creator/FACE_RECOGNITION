

import { db } from '../FirbaseConfig';
import {  collection, doc, setDoc } from 'firebase/firestore';
function Createbatch()
{
    const createCollection = async () => {
      try {

        const val=doc(db,"IOT","2022");
        const Attendancecollection=collection(val,"ATTENDANCE");
        const Detailscollection=collection(val,"DETAILS");
        const Studentscollection=collection(val,"STUDENTS");
        
        await  setDoc(doc(Attendancecollection,"FIRST_SEM"),{});
        await setDoc(doc(Attendancecollection,"SECOND_SEM"),{});
        await  setDoc(doc(Attendancecollection,"THIRD_SEM"),{});
        await setDoc(doc(Attendancecollection,"FOURTH_SEM"),{});
        await setDoc(doc(Attendancecollection,"FIVITH_SEM"),{});
        await setDoc(doc(Attendancecollection,"SIXTH_SEM"),{});
        await  setDoc(doc(Attendancecollection,"SEVENTH_SEM"),{});
        await  setDoc(doc(Attendancecollection,"EIGHTH_SEM"),{});
        await setDoc(doc(Detailscollection,"test"),{});
        await setDoc(doc(Studentscollection,"MANAGER"),{
          CODE:'',
          LATITUDE:'',
          LONGIDUDE:'',
          MARKEDSTUDENTS:[],
          STUDENTS:[],
          PERIOD:[]
        });
        // creation of attendance sub collecton
        // const firstval=
        // collection(doc(db,Attendancecollection,"FIRST_SEM"),"STUDENTS");
        // setDoc(doc(firstval,"test"),{})

        const firstSemAttendanceRef = collection(
            doc(Attendancecollection, 'FIRST_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(firstSemAttendanceRef, 'test'), {}); 

          const secondSemAttendanceRef = collection(
            doc(Attendancecollection, 'SECOND_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(secondSemAttendanceRef, 'test'), {}); 

          const thirdSemAttendanceRef = collection(
            doc(Attendancecollection, 'THIRD_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(thirdSemAttendanceRef, 'test'), {}); 

          const fourSemAttendanceRef = collection(
            doc(Attendancecollection, 'FOURTH_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(fourSemAttendanceRef, 'test'), {}); 

          const fiveSemAttendanceRef = collection(
            doc(Attendancecollection, 'FIVITH_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(fiveSemAttendanceRef, 'test'), {}); 

          const sixSemAttendanceRef = collection(
            doc(Attendancecollection, 'SIXTH_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(sixSemAttendanceRef, 'test'), {}); 

          const sevenSemAttendanceRef = collection(
            doc(Attendancecollection, 'SEVENTH_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(sevenSemAttendanceRef, 'test'), {}); 

          const eightSemAttendanceRef = collection(
            doc(Attendancecollection, 'EIGHTH_SEM'),
            'STUDENTS'
          );
          await setDoc(doc(eightSemAttendanceRef, 'test'), {});     

          
        

       
  
        console.log('Nested collection and document created successfully!');
      } catch (error) {
        console.error('Error creating nested collection and document: ', error);
      }
    };


  
    
      return (
        <div>
          <button onClick={createCollection}>Create Nested Collection</button>
        </div>
      );
    }
  
  
  export default Createbatch
  