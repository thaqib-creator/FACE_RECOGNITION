import React from 'react';
import { db } from '../FirbaseConfig';
import {  collection, doc, setDoc } from 'firebase/firestore';
class Tes extends React.Component {
    createCollection = async () => {
      try {

        const val=doc(db,"IOT","2023");
        const Attendancecollection=collection(val,"ATTENDANCE");
        const Detailscollection=collection(val,"DETAILS");
        const Studentscollection=collection(val,"STUDENTS");
        
        setDoc(doc(Attendancecollection,"FIRST_SEM"),{});
        
        setDoc(doc(firstval,"Test"),{})

        setDoc(doc(Attendancecollection,"SECOND_SEM"),{});
        setDoc(doc(Attendancecollection,"THIRD_SEM"),{});
        setDoc(doc(Attendancecollection,"FOURTH_SEM"),{});
        setDoc(doc(Attendancecollection,"FIVITH_SEM"),{});
        setDoc(doc(Attendancecollection,"SIXTH_SEM"),{});
        setDoc(doc(Attendancecollection,"SEVENTH_SEM"),{});
        setDoc(doc(Attendancecollection,"EIGHTH_SEM"),{});
        setDoc(doc(Detailscollection,"test"),{});
        setDoc(doc(Studentscollection,"MANAGER"),{
          CODE:'',
          LATITUDE:'',
          LONGIDUDE:'',
          MARKEDSTUDENTS:[],
          STUDENTS:[],
          PERIOD:[]
        });
        

       
  
        console.log('Nested collection and document created successfully!');
      } catch (error) {
        console.error('Error creating nested collection and document: ', error);
      }
    };
  
    render() {
      return (
        <div>
          <button onClick={this.createCollection}>Create Nested Collection</button>
        </div>
      );
    }
  }
  
  export default Tes;
  