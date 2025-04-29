import { Box, Button, Container, Input, useToast ,Flex,Text} from "@chakra-ui/react"
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../FirbaseConfig";
import { UseUserContext } from "../ContextApi/UseUserContext";
import Face from "../Components/Face";

function StudentAttendancepage() {

    
  const {user,dept,Batch}=UseUserContext();
  const [lat,setlat]=useState(0);
  const [long,setlong]=useState(0);
  useEffect(()=>
  {
    if(user)
    {
     

   
   if ("geolocation" in navigator) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        setlat(latitude);
        setlong(longitude);
       
      },
      (error) => {
        
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    // Geolocation is not supported
    console.log("Geolocation is not supported by this browser.");
  }

    }

  },[user])
     


    const [codepass,setcodepass]=useState(false);

    const [verifyloader,setverifyloader]=useState();


    const toast=useToast();

    
      const verify=async()=>
      {
        if (!otp) {
          toast({
            title: 'Input Error',
            description: 'Please enter verification code.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:"top-right"
          });
          return;
        }
        setverifyloader(true);
        try {
          const docRef = doc(db, dept, Batch); 
          
        const studentsCollection = collection(docRef, "STUDENTS"); 
         
        const studentDocRef = doc(studentsCollection, "MANAGER");

            console.log(dept);
            const docSnap = await getDoc(studentDocRef);
            console.log(docSnap.data())
            if (docSnap.exists()) {
           
              
              if(docSnap.data().CODE===otp.join('')) 
              {
                if(lat==docSnap.data().LATITUDE&&long==docSnap.data().LONGIDUDE )
                {
                  setcodepass(true);
                  toast({
                    title: 'Location',
                    description: "Location Verified! ",
                    status: 'success',
                    duration: 9000,
                    position:"top-right",
                    isClosable: true,
                  })
                }
                else
                {
                  toast({
                    title: 'Location',
                    description: "You are not in right place! ",
                    status: "warning",
                    duration: 9000,
                    position:"top-right",
                    isClosable: true,
                  })

                }
                
                // console.log("codepass tick");
                toast({
                    title: 'Code Verification',
                    description: "SuccesFully Verified! ",
                    status: 'success',
                    duration: 9000,
                    position:"top-right",
                    isClosable: true,
                  })
              }
              else
              {

                toast({
                    title: 'Code Verification',
                    description: "Verification code failed! ",
                    status: "warning",
                    duration: 9000,
                    position:"top-right",
                    isClosable: true,
                  })

              }


            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching document:", error);
          }
        setverifyloader(false);

      }

      const [otp, setOTP] = useState(new Array(5).fill(''));
  const inputRefs = useRef([]);

  const handleInput = (event, index) => {
    const { value } = event.target;

    if (isNaN(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

 
  };

  return (
    <Container height="100vh" display="flex" alignItems="center" justifyContent="center">
      {!codepass &&
        <Box
        p={4}
        // bg="rgba(255, 255, 255, 0.8)" // Semi-transparent white background
        borderRadius="md"
        boxShadow="md"
        // bg="gray.100"

        // backdropFilter="blur(8px)" // Blurred background effect
      >
        <Box mb={4} textAlign="center">
          <Text>Enter Code</Text>
        </Box>
        <Flex justify="center" gap={4}>
          {otp.map((value, index) => (
            <Input
              key={index}
              type="text"
              width={12}
              maxLength={1}
              value={value}
              onChange={(e) => handleInput(e, index)}
              ref={(input) => (inputRefs.current[index] = input)}
            />
          ))}
        </Flex>
        <Button
          color="teal"
          mt={4}
          isLoading={verifyloader} // Set to true when loading
          onClick={verify}
          ml={110}
          isDisabled={otp.join('').length !== otp.length} // Disable button if OTP is incompleteml
        >
          Verify
        </Button>

       
      </Box>
      }

{
          codepass && <Box>
            <Face/>
            </Box>
        }
    </Container>
  );
}

export default StudentAttendancepage;