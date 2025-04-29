import { Box, Button, Input, Text } from "@chakra-ui/react"
import CodeGenerator from "../Hooks/CodeGenerator"
import { arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../FirbaseConfig";
import {  useEffect, useState } from "react";
import  axios  from "axios";


function ProfPage() {
    const [Students, setStudents] = useState([]);
    const [unmarkedstudent,setunmarkedstudent]=useState([]);
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const [display, setDisplay] = useState(false);
    const [filteredUnmarkedStudent, setFilteredUnmarkedStudent] = useState([]);




    const [period,setperiod]=useState("");
    const [profmark,setprofmark]=useState("");

    



    const cleardata=async()=>
    {
        console.log("det"+department)
        console.log("det"+batch)
       try
       {const token = window.localStorage.getItem('usertoken');
        try
         {
            const response = await axios.post("http://localhost:5000/scheduleCodeDeletion",null, 
               {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                  dept: department,
                  batch: batch,
                },
                
            });

           console.log(response);
         }
      catch(err)
      {
        console.log(err);
      }

        if ("geolocation" in navigator) {
        
            navigator.geolocation.getCurrentPosition(
              async (position) => {           
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                
                const docRef = doc(db, department,batch ); 
          
                const studentsCollection = collection(docRef, "STUDENTS"); 
                const studentDocRef = doc(studentsCollection, "MANAGER"); 
                await updateDoc(studentDocRef, {
                    PERIOD:period,
                    MARKEDSTUDENTS: []
                    ,
                    LATITUDE:latitude,
                    LONGIDUDE:longitude
                });
              },
              (error) => {
          
                console.error("Error getting location:", error.message);
              }
            );
          } else {
           
            console.log("Geolocation is not supported by this browser.");
          }




        



        }
        catch(err)
        {
            alert(err);
        }

    }
  async  function  fetchData() {
        const docRef = doc(db, department,batch ); 
          
    const studentsCollection = collection(docRef, "STUDENTS"); 
    const studentDocRef = doc(studentsCollection, "MANAGER"); 
    const document= await getDoc(studentDocRef);

    if (document.exists()) {
      console.log("Document data:", document.data());
      setunmarkedstudent(document.data().STUDENTS);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
        const unsubscribe = onSnapshot(
            studentDocRef,
            {
                includeMetadataChanges: true,
                source: 'cache'
            },
            (documentSnapshot) => {
                console.log("Document data:", documentSnapshot.data().MARKEDSTUDENTS);
                setStudents(documentSnapshot.data().MARKEDSTUDENTS);
            }
        );

        return unsubscribe;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplay(true);
    };

   useEffect(()=>
   {
    const filterUnmarkedStudents = () => {
        const filteredStudents = unmarkedstudent.filter(student => !Students.includes(student));
        setFilteredUnmarkedStudent(filteredStudents);
    };
    filterUnmarkedStudents();
   },[Students,unmarkedstudent])

   const markedbyprof=async()=>
   {
    console.log("ippbkd")
    const docRef = doc(db, department,batch ); 
          
    const studentsCollection = collection(docRef, "Students"); 
    const studentDocRef = doc(studentsCollection, "MANAGER"); 
    await updateDoc(studentDocRef, {
        
        MARKEDSTUDENTS: arrayUnion(profmark),
    });


   }
    return (
        <>
            {!display ? (
                <Box>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            placeholder="Enter The Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value.toUpperCase())}
                            required
                        />

                        <Input
                            type="text"
                            placeholder="Enter The Period"
                            value={period}
                            onChange={(e) => setperiod(e.target.value.toUpperCase())}
                            required
                        />

                        <Input
                            type="number"
                            placeholder="Enter The Batch"
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            required
                        />
                        <Button type="submit" color="teal"
                        onClick={cleardata}>
                            Submit
                        </Button>
                    </form>
                </Box>
            ) : (
                <Box>
                    <Box>
                        <CodeGenerator dept={department} batch={batch} />
                    </Box>
                    <Box>
                        <Input type="text" onChange={(e)=>setprofmark(e.target.value.toUpperCase())}/>
                        <Button color={"teal"} onClick={markedbyprof}>Submit for un marked students</Button>
                    </Box>

                    <Box>
                        <button onClick={fetchData}>Fetch</button>
                    </Box>

                    <Box>
                        {Students.length}
                        {Students.map((item, key) => (
                            <Text key={key}>{item}</Text>
                        ))}
                    </Box>
                    <Box>
                        <Text>Fetch Unmarked Students</Text>
                    </Box>
                    <Box>
                        {filteredUnmarkedStudent.length }
                        {
                            filteredUnmarkedStudent.map((item, key) => (
                                <Text key={key}>{item}</Text>
                            ))}
                    </Box>


                </Box>
            )}
        </>
    );
}

export default ProfPage;
