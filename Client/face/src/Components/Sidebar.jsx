import { Box, Flex, Text, Avatar} from '@chakra-ui/react';
import {
  PlaylistAddCheckCircleOutlined as PlaylistAddCheckCircleOutlinedIcon,
  AcUnitRounded as AcUnitRoundedIcon,
  ReportProblemRounded as ReportProblemRoundedIcon,
  GppGood as GppGoodIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from '../ContextApi/UseUserContext';

function Sidebar() {
  const navigate = useNavigate();
  const { Logout } = UseUserContext();

  return (
    <Box
      top={0}
      borderRight={'1px solid'}
      height={'100vh'}
      borderColor={'whiteAlpha.400'}
      py={8}
      position={'sticky'}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex flexDirection={'column'} gap={10}>
        {/* -------------------------LOGO-------------------------- */}
        <Flex alignItems={'center'} gap={2}>
          <Box>
            <Avatar src={'/srlogo.png'} size={'md'} />
          </Box>
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>
              SKCT
            </Text>
          </Box>
        </Flex>
        {/* --------------------------------dashboard--------------------- */}
        <Flex
          alignItems={'center'}
          ml={3}
          gap={3}
          cursor={'pointer'}
          _hover={{ color: 'gray.300' }}
          onClick={() => navigate('/')}
        >
          <AcUnitRoundedIcon />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'whitesmoke'} fontSize={'lg'} fontWeight={'bold'}>
              Dashboard
            </Text>
          </Box>
        </Flex>
        {/*  --------------------------------Attendance------------------*/}
        <Flex
          alignItems={'center'}
          ml={3}
          gap={3}
          cursor={'pointer'}
          _hover={{ color: 'gray.300' }}
          onClick={() => navigate('/student')}
        >
          <PlaylistAddCheckCircleOutlinedIcon />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'whitesmoke'} fontSize={'lg'} fontWeight={'bold'}>
              Attendance
            </Text>
          </Box>
        </Flex>
        {/* -----------------Feedback---------------------------------- */}
        <Flex
          alignItems={'center'}
          ml={3}
          gap={3}
          cursor={'pointer'}
          _hover={{ color: 'gray.300' }}
          onClick={() => navigate('/feedback')}
        >
          <ReportProblemRoundedIcon />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'whitesmoke'} fontSize={'lg'} fontWeight={'bold'}>
              Feedback
            </Text>
          </Box>
        </Flex>
        {/* --------------------Od------------------------ */}
        <Flex
          alignItems={'center'}
          ml={3}
          gap={3}
          cursor={'pointer'}
          _hover={{ color: 'gray.300' }}
          onClick={() => navigate('/od-approval')}
        >
          <GppGoodIcon />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'whitesmoke'} fontSize={'lg'} fontWeight={'bold'}>
              OD Approval
            </Text>
          </Box>
        </Flex>
        {/* --------------------------Profile------------------------------ */}
        <Flex
          alignItems={'center'}
ml={2}
          gap={3}
          cursor={'pointer'}
          _hover={{ color: 'gray.300' }}
          onClick={() => navigate('/profile')}
        >
          <Avatar
            src={
              'https://firebasestorage.googleapis.com/v0/b/facerecognition-c5582.appspot.com/o/Studentimages%2FIot%2Fmanish_06?alt=media&token=fdfaaf9f-bbb5-438d-87ac-294c7f004af2'
            }
            size={'sm'}
          />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'whitesmoke'} fontSize={'lg'} fontWeight={'bold'}>
              Profile
            </Text>
          </Box>
        </Flex>
        {/*--------------Logout------------  */}
        <Flex
          alignItems={'center'}
          ml={3}
          gap={3}
          mt={'150px'}
          cursor={'pointer'}
          _hover={{ color: 'gray.300' }}
          onClick={Logout}
        >
          <LogoutIcon />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Text color={'whitesmoke'} fontSize={'lg'} fontWeight={'bold'}>
              LogOut
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Sidebar;