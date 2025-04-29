import { useRef, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the default style
import { UseUserContext } from '../ContextApi/UseUserContext';
// import './custom-style.css'; // Import your custom style
import { Box, Button, Container, Input ,Flex,Text} from "@chakra-ui/react"
import {  useParams } from "react-router-dom";

import axios from 'axios';

function DevicePage() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [confrimotp, setconfrimotp] = useState();
  const {setuprecaptcha,Signin}=UseUserContext()
  // const navigate=useNavigate()
  const getotp=async(e)=>
  {
    e.preventDefault();
    if(phoneNumber)
    {
       const res=await setuprecaptcha(phoneNumber);
       console.log(res);
       setconfrimotp(res);
    }
  }


  const [otp, setOTP] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
 const {email,password}=useParams();
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
  const currentdeviceId = localStorage.getItem('deviceId');
  const verify = async () => {
    // if (otp && confrimotp && typeof confrimotp.confirm === 'function') {
      try {
      //   await confrimotp.confirm(otp.join('')).then(async()=>
      // {
        console.log(email,password)
        const token = window.localStorage.getItem('usertoken');
        console.log("this is chehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        const response = await axios.put('http://localhost:5000/updatedevice', {},{
          headers: {
            'Authorization': `Bearer ${token}`,
            'cdeviceid': currentdeviceId,
            'email': email,
          },
          
        });
        console.log(response);
        if (response.status === 200) {
          await Signin(email, password);
          console.log('User signed in successfully');
        }
      // })
      } catch (error) {
        console.error('Error confirming OTP:', error);
        // Handle error (e.g., display error message)
      }
    // } else {
    //   console.error('Invalid confrimotp object or missing confirm method');
    //   // Handle error (e.g., display error message)
    // }
  };
  

  return (
    <>
      <div>diklnin</div>
      <div id="recaptcha-container" />
      <PhoneInput
        international
        value={phoneNumber}
        onChange={setPhoneNumber}
        inputClass="custom-input" // Add your custom class
      />
      <button onClick={getotp}>sendotp</button>




      <Container height="100vh" display="flex" alignItems="center" justifyContent="center">
      
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
          // isLoading={verifyloader} // Set to true when loading
          onClick={verify}
          ml={110}
          isDisabled={otp.join('').length !== otp.length} // Disable button if OTP is incompleteml
        >
          Verify
        </Button>

       
      </Box>
      


    </Container>
    </>
  );
}

export default DevicePage;