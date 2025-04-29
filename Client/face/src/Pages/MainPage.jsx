import { Box, Button, Center, Container, FormControl, FormErrorMessage, Input} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { emailValidate,  rollno, usernameValidate } from "../Components/FormValidation"
import { UseUserContext } from "../ContextApi/UseUserContext"
import {  useRef, useState } from "react"
import Face_encoder from "../Hooks/Face_encoder"




function MainPage() {



  // const [token,settoken]=useState();

  







  const {register,handleSubmit,formState: { errors, isSubmitting }}=useForm()
  const toast=useToast()
   
  const [file,setfile]=useState()
  const [nfile,setnfile]=useState("Image")
  const [mark,setmark]=useState("")
  const [batch,setbatch]=useState("")

  const [Encodings, setEncodings] = useState();

  const inputref=useRef()
    // --------------------------firebase setup-----------------------------------
   
    const {update_fs_st,Logout}=UseUserContext()
    // const navigate=useNavigate()
    const handelfile = (e) => {
      setfile(e.target.files[0]);
      setnfile(e.target.files[0].name);
      
      Face_encoder(e.target.files[0])
        .then(descriptor => {
          const descriptorArray = Array.from(descriptor);
          console.log("From handleFile: ", descriptorArray);
          setEncodings(descriptorArray);
        })
        .catch(error => {
          console.error('Error occurred during face encoding:', error);
          // Handle the error
        });
    }
  
    const onsubmit = async (data) => {
      try {
        if (Encodings) {
          // Convert Float32Array to regular array
          // const regularArray = Array.from(Encodings);
          console.log("From onSubmit: ", Encodings);
  
          await update_fs_st(data.email, data.username, data.rollno.toUpperCase(), file, data.destination.toUpperCase(), Encodings,batch,mark);
        }
      } catch(err) {
        console.log(err);
        toast({
          title: err.name,
          description: err.code,
          status: 'error',
          duration: 9000, 
          position: "top-right",
          isClosable: true,
        });
      }
    }

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

            <h1>Attendance System</h1>

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
                  {/* ---------------------------Username----------------- */}
                  <Box mt={"10px"}>
                  <FormControl isInvalid={errors.username}>

                  {/* <FormLabel>Password</FormLabel> */}

                  <Input autoComplete="on"
                  type="text"
                  borderRadius={'10px'}
                  placeholder={"Username"}
                  padding={"10px"}
                  {...register('username',usernameValidate)}
                  
                  />

                  <FormErrorMessage>
                  { errors.username && errors.username.message}

                  </FormErrorMessage>

                  </FormControl>

                  </Box>
                  {/* ----------------Roll No -----------------*/}
                  <Box mt={"10px"}>
                    <FormControl isInvalid={errors.rollno}>

                    {/* <FormLabel htmlFor='Email'>Email</FormLabel> */}

                    <Input autoComplete="on"
                    type="text" 
                    borderRadius={'10px'}
                    placeholder={"Roll No"}
                    padding={"10px"}
                    {...register('rollno',rollno)}
                    />

                    <FormErrorMessage>
                    { errors.rollno && errors.rollno.message}
                    </FormErrorMessage>

                    </FormControl>
                  </Box>
                 {/* -------YEAR---------- */}
                 <Box  mt={"10px"}>
                 <Input autoComplete="on"
                    type="Year" 
                    borderRadius={'10px'}
                    placeholder={"Year"}
                    padding={"10px"}
                    onChange={(e)=>setbatch(e.target.value)}
                    />
                    </Box>
                  {/* ----------------image input---------------- */}
                  <Box mt={"10px"} onClick={()=>{inputref.current.click()}}>
                    

                    {/* <FormLabel htmlFor='Email'>Email</FormLabel> */}

                    <Input autoComplete="on"
                    type="file" 
                    borderRadius={'10px'}
                    placeholder={"Image"}
                    padding={"10px"}
                    onChange={handelfile}
                    display={"none"}
                    ref={inputref}
                    />  
                    <Input placeholder={nfile} readOnly={true}/>
                   
                   
                  </Box>

                  {/* -----------destination--------- */}
                  <Box mt={"10px"}>
                    

                    {/* <FormLabel htmlFor='Email'>Email</FormLabel> */}

                    <Input autoComplete="on"
                    type="text" 
                    borderRadius={'10px'}
                    placeholder={"Department"}
                    padding={"10px"}
                    {...register('destination',)}
                    />

                   
                   
                  </Box>
                  <Box mt={"10px"}>
                    


                    <Input autoComplete="on"
                    type="text" 
                    borderRadius={'10px'}
                    placeholder={"mark"}
                    padding={"10px"}
                    onChange={(e)=>setmark(e.target.value)}
                    />

                   
                   
                  </Box>

                  <Box w={"full"} mt={"10px"}>
                  <Button 
                  colorScheme='teal' 
                  bg={" #9F7AEA"} 
                  width={"full"}
                  type="Submit"
                  isLoading={isSubmitting}
                  loadingText={"Logging In"}
                  isDisabled={!Encodings}
                  
                  >Update</Button>
                  </Box>
                  <Button onClick={Logout}>logout</Button>
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

export default MainPage


