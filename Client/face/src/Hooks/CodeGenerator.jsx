import {  collection, doc,  updateDoc } from 'firebase/firestore';
import { useState} from 'react';
import { db } from '../FirbaseConfig';
import PropType from "prop-types";


function CodeGenerator({dept,batch}) {
  const [generatedCode, setGeneratedCode] = useState('');

  
  
  
  const generateUniqueCode = async() => {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    
    setGeneratedCode(code);
    updateCodeDocument(code);
    
  };




  
  const updateCodeDocument = async (code) => {
    try {
      console.log("dep"+dept)
      console.log("bat"+batch)
      const docRef = doc(db, dept, batch); 
      const studentsCollection = collection(docRef, "STUDENTS"); 
      const studentDocRef = doc(studentsCollection, "MANAGER"); 
      await updateDoc(studentDocRef, {
        CODE:code
      });
      console.log("document is updated!")
       
        
        
             
           

      
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  
  
  


  return (
    <div>
        
      <h2>Generated Code: {generatedCode}</h2>
      <button onClick={generateUniqueCode}>Generate Code</button>
    </div>
  );
}

export default CodeGenerator;
CodeGenerator.propTypes=
{
  dept:PropType.string,
  batch:PropType.string
}
