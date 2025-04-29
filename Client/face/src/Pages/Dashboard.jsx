import { Box,Flex,Text,Avatar,Container, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Dbhooks from '../Hooks/Dbhooks';

function Dashboard() {

  const [displayText, setDisplayText] = useState('');

 
  const text='Welcome to Your Dashboard'
  useEffect(() => {
    const interval = setInterval(() => {
      // Get the next character to display
      const nextCharacter = text[displayText.length];
      // Update the displayed text with the next character
      setDisplayText(prevText => prevText + nextCharacter);
      
      // If all characters are displayed, reset the text
      if (displayText.length === text.length) {
        setDisplayText('');
      }
    }, 300); // Adjust the interval (in milliseconds) for typing speed

    return () => clearInterval(interval);
  }, [text, displayText]);




  const imageUrls = [
    '/skct.jpg',
    '/skctlap.jpg',
    '/sr.png',
    // Add more image URLs here
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

 useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000); // Change the interval time to adjust the slideshow speed

    return () => clearInterval(interval);
  }, []);

  const {collectiondata}=Dbhooks();
  const [toppersData, setToppersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await collectiondata("USERS");
      if (data) {
        setToppersData(data);
      } else {
        console.error("Failed to fetch data from Firestore");
      }
    };
    fetchData();
  }, []);
  


  






  return (
    <>
    {/* -------------Banner------------------------ */}
    <Container
  mt={4}
  ml={1}
  height={{ base: "30vh", md: "60vh" }}
  maxW="full"
  backgroundImage={`url(${imageUrls[currentImageIndex]})`}
  backgroundSize="cover"
  backgroundPosition="center"
  position="relative"
>
  
  {/* <Box
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    // bgGradient="linear(to-b, rgba(0,0,0,0.5), rgba(0,0,0,0.8))"
    zIndex={1}
  /> */}

  
  <Flex
    direction="column"
    justify="center"
    align="center"
    height="100%"
    color="white"
    zIndex={2}
  >
    <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" mb={4}>
     {displayText}
    </Text>
    <Button cursor={'pointer'}>click me</Button>
    
  </Flex>
  
</Container>


{/* ---------------------------Details-------------------------------- */}
   <Container ml={0} maxW="full">

      <Flex flexDirection={{base:'column-reverse',md:'row'}} >

        <Box>

        <Box mt={8} p={4} borderWidth={1} borderRadius="md" overflow="auto" maxHeight="60vh" 
        // boxShadow={'lg'} // Add boxShadow property here 
        // boxShadowColor={'gray.300'}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Details Section
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac diam
            fermentum, vehicula nisi vitae, mollis libero. Integer sit amet
            libero vitae justo malesuada convallis at et massa. Vivamus vitae
            placerat urna. Donec at dolor nec urna condimentum tincidunt sed
            non turpis. Nam id nisi a nunc sodales ultrices.
          </Text>
          
        </Box>

        </Box>
         
     
        {/* ----------------------Ratings Container----------- */}
        <Container>

        <Box mt={8} p={4} borderWidth={1} borderRadius="md" overflow="auto" maxHeight="60vh">
          <Text fontSize="xl" fontWeight="bold" mb={4} ml={'80px'}>
            Toppers
          </Text>
          {toppersData
  // Sort the array by CGPA in descending order (highest CGPA first)
  .sort((a, b) => b.data.CGPA - a.data.CGPA)
  .map((data, index) => (
    <Flex key={data.id}  alignItems={'center'} gap={"10px"} padding={2} mb={5}>
      <Text>{index + 1}</Text>
      <Avatar ml={'10px'} />
      <Text>{data.data.NAME}</Text>
      <Text>{data.data.CGPA}</Text>
    </Flex>
  ))}

          
        </Box>

        </Container>
        

      </Flex>
        
    </Container>
    </>
  )
}

export default Dashboard