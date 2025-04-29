import { Avatar, Box, Button,  Text, Flex, Input, Stack, } from '@chakra-ui/react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../FirbaseConfig';
import { UseUserContext } from '../ContextApi/UseUserContext';

function Profile() {
  const { Batch, dept, uname, Profileurl, rollno, user } = UseUserContext();
  const [editing, setEditing] = useState(false);
  const [blood, setBlood] = useState('');
  const [dob, setDob] = useState('');
  const [username, setUsername] = useState('');
  const [fatherno, setFatherno] = useState('');
  const [motherno, setMotherno] = useState('');
  const [gardianno, setGardianno] = useState('');
  const [paddr, setPaddr] = useState('');
  const [raddr, setRaddr] = useState('');
  const [studentno, setStudentno] = useState('');
  const [imgurl, setImgurl] = useState('');

  useEffect(() => {
    async function Fetchuserdata() {
      try {
        if (uname) {
          const docRef = doc(db, dept, Batch);
          const studentsCollection = collection(docRef, "DETAILS");
          const studentDocRef = doc(studentsCollection, uname);
          const docSnap = await getDoc(studentDocRef);
          if (docSnap.exists()) {
            setBlood(docSnap.data().BLOOD_GROUP);
            setDob(docSnap.data().DOB);
            setFatherno(docSnap.data().FATHER_NUMBER);
            setGardianno(docSnap.data().GARDIAN_NUMBER);
            setMotherno(docSnap.data().MOTHER_NUMBER);
            setUsername(docSnap.data().NAME);
            setPaddr(docSnap.data().PERMANENT_ADDRESS);
            setImgurl(docSnap.data().PROFILE_URL);
            setRaddr(docSnap.data().RESIDENTAL_ADDRESS);
            setStudentno(docSnap.data().STUDENT_NUMBER);
          } else {
            console.log("No such document");
            alert("no such document");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    Fetchuserdata();
  }, [dept, Batch, uname]);


const update_Profile=async()=>
{
  const docRef = doc(db, dept, Batch);
  const studentsCollection = collection(docRef, "DETAILS");
  const studentDocRef = doc(studentsCollection, uname);
  
  await updateDoc(studentDocRef,
  {
    BLOOD_GROUP:blood,
    DOB:dob,
    FATHER_NUMBER:fatherno,
    GARDIAN_NUMBER:gardianno,
    MOTHER_NUMBER:motherno,
    PERMANENT_ADDRESS:paddr,
    RESIDENTAL_ADDRESS:raddr,
    STUDENT_NUMBER:studentno,
  })
  window.location.reload();
}





  const userDetails = [
    { label: 'Email', value: user?.email },
    { label: 'Blood Group', value: blood },
    { label: 'DOB', value: dob },
    { label: 'Student Number', value: studentno },
    { label: 'Mother Number', value: motherno },
    { label: 'Father Number', value: fatherno },
    { label: 'Guardian Number', value: gardianno },
    { label: 'Permanent Address', value: paddr },
    { label: 'Residential Address', value: raddr },
  ];

  return (
    <Flex
      ml={0}
      width="full"
      maxW="full"
      height="100vh"
      flexDirection={{ base: 'column', md: 'row' }}  
    >
      {/* User Details Section */}
      <Flex
        width={{ base: 'full', md: '50%' }}
        height={'fit-content'}
        flexDirection="column"
        alignItems="center"
        // bg="gray.100"
        p={8}
        borderRadius="md"
      >
        <Avatar size="2xl" name={username} src={imgurl} />
        <Text mt={4} fontSize="xl" fontWeight="bold" color="gray.600">
          {username}
        </Text>
        <Text fontSize="lg" color="gray.600">
          Roll No:{rollno}
        </Text>

        {/* Details Section */}
        <Stack mt={8} width="100%" spacing={4} >
          {userDetails.map(({ label, value }) => (
            <Box key={label}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                {label}
              </Text>
              <Input
  value={editing ? value : (value || '')}
  onChange={(e) => {
    if (editing) {
      switch (label) {
        case 'Blood Group':
          setBlood(e.target.value);
          break;
        case 'DOB':
          setDob(e.target.value);
          break;
        case 'Student Number':
          setStudentno(e.target.value);
          break;
        case 'Mother Number':
          setMotherno(e.target.value);
          break;
        case 'Father Number':
          setFatherno(e.target.value);
          break;
        case 'Guardian Number':
          setGardianno(e.target.value);
          break;
        case 'Permanent Address':
          setPaddr(e.target.value);
          break;
        case 'Residential Address':
          setRaddr(e.target.value);
          break;
        default:
          break;
      }
    }
  }}
  border="none"
  userSelect="text"
  color={editing ? 'gray.800' : 'gray.600'}
  _focus={{ boxShadow: 'none' }}
  size="sm"
  p={2}
  borderRadius="md"
  bg={editing ? 'white' : 'gray.200'}
/>
            </Box>
          ))}
          <Button
  onClick={() => setEditing(!editing)}
  size="sm"
  variant="outline"
  colorScheme="blue"
>
  {editing ? 'Cancel' : 'Edit'}
</Button>
<Button
  onClick={update_Profile}
  size="sm"
  variant="outline"
  colorScheme="blue"
>
  update
</Button>
        </Stack>
      </Flex>

      {/* Placeholder for Academic Section */}
      <Flex
        width={{ base: 'full', md: '50%' }}
        height="100vh"
        alignItems="center"
        justifyContent="center"
        color="gray.600"
        fontSize="xl"
      >
        Academic Details
      </Flex>
    </Flex>
  );
}

export default Profile;