import { Box, Button, Center, Container, FormControl, FormErrorMessage, Input} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { emailValidate, passwordValidate } from "../Components/FormValidation"
import { UseUserContext } from "../ContextApi/UseUserContext"
// import { UseUserContext } from "../Service/Dbmethods/UseUserContext"

import axios from 'axios';
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const navigate=useNavigate();

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
 
  function setDeviceIdentifier() {
    console.log("current deviceid : "+currentdeviceId)
    const deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId);
    console.log("after deviceid : "+deviceId)

    return deviceId;
  }
  
  
  const currentdeviceId = localStorage.getItem('deviceId');
  
  

    const {register,handleSubmit,formState: { errors, isSubmitting }}=useForm()
    
    const toast=useToast()
    
    
    // --------------------------firebase setup-----------------------------------
   
    const {Signin}=UseUserContext()
   
    const onsubmit = async (data) => {
      try {
        // const identifier = setDeviceIdentifier();
        const token = window.localStorage.getItem('usertoken');
    
        const response = await axios.get('http://localhost:5000/verifydevice', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'cdeviceid': currentdeviceId,
            'udeviceid':setDeviceIdentifier(),
            'email': data.email,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 405; // Resolve only if status is within 2xx range
          },
        });
    
        if (response.status === 200) {
          await Signin(data.email, data.password);
          console.log('User signed in successfully');
        } else if (response.status === 401) {
          // Unauthorized: Navigate to '/device' page
          navigate(`/device/${data.email}/${data.password}`);
          console.log(`/device/:${data.email}/${data.password}`);
          toast({
            title: 'Unauthorized',
            description: 'Access token is missing or invalid',
            status: 'error',
            duration: 9000,
            position: "top-right",
            isClosable: true,
          });
        } else {
          // Handle unexpected response status
          console.log('Unexpected response status:', response.status);
          toast({
            title: 'Unexpected Error',
            description: `Unexpected response status: ${response.status}`,
            status: 'error',
            duration: 9000,
            position: "top-right",
            isClosable: true,
          });
        }
      } catch (err) {
        // Handle network errors or exceptions
        console.error('Error:', err);
        toast({
          title: 'Error',
          description: 'An error occurred while processing your request',
          status: 'error',
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      }
    };
    

  return (
 <>
    <Container>

    <Box maxWidth={"300px"} maxH={"fit-content"} mt={"200px"}
              border={"2px solid"} borderRadius={"20px"}
              padding={"30px"}
              ml={{base:'20px',md:"120px"}}
              > 

              <Box>
                <Center 
                // color={" #9F7AEA"}
                fontSize={"x-large"}
                fontWeight={"bolder"}
                
                >

                <h1>Log In</h1>

                </Center>

              </Box>
              <Box bgColor={" #9F7AEA"} 
              h={"10px"}
              w={"60px"}
              ml={"90px"}
              mt={"10px"}
              borderRadius={"20px"}
              
              >

              </Box>

                <Box>
                                      <form onSubmit={handleSubmit(onsubmit)}>
                          
                          {/* ---------------Email--------------- */}
                      <Box mt={"10px"}>
                        <FormControl isInvalid={errors.email}>

                        {/* <FormLabel htmlFor='Email'>Email</FormLabel> */}

                        <Input autoComplete="on"
                        type="email" 
                        borderRadius={'10px'}
                        placeholder={"Email"}
                        padding={"10px"}
                        {...register('email',emailValidate)}
                        />

                        <FormErrorMessage>
                        { errors.email && errors.email.message}
                        </FormErrorMessage>

                        </FormControl>
                      </Box>
                      {/* ---------------------------pasword----------------- */}
                      <Box mt={"10px"}>
                      <FormControl isInvalid={errors.password}>

                      {/* <FormLabel>Password</FormLabel> */}

                      <Input autoComplete="on"
                      type="password"
                      borderRadius={'10px'}
                      placeholder={"Password"}
                      padding={"10px"}
                      {...register('password',passwordValidate)}
                      
                      />

                      <FormErrorMessage>
                      { errors.password && errors.password.message}

                      </FormErrorMessage>

                      </FormControl>

                      </Box>

                      <Box w={"full"} mt={"10px"}>
                      <Button 
                      colorScheme='teal' 
                      bg={" #9F7AEA"} 
                      width={"full"}
                      type="Submit"
                      isLoading={isSubmitting}
                      loadingText={"Logging In"}
                      
                      >Log In</Button>
                      </Box>
                      
                      </form>
       
                </Box>
                
          </Box>

          {/* <Box maxWidth={"300px"} maxH={"fit-content"} mt={"10px"}
              border={"2px solid"} borderRadius={"10px"}
              padding={"10px"}
              ml={{base:'20px',md:"120px"}}
              >
              <Text>Do not have an account ? <Link to="/signup" color="#9F7AEA">SignUp</Link></Text>
                
                 </Box> */}
         
           
    </Container>
    </>

  )
}

export default LoginPage