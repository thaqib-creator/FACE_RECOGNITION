import { Navigate, useLocation } from "react-router-dom";
import { UseUserContext } from "../ContextApi/UseUserContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Flex , Box} from '@chakra-ui/react';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user } = UseUserContext();
  const [authenticated, setAuthenticated] = useState(false||window.localStorage.getItem('userauth')=='true');

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user) { 
        console.log(user);
        setAuthenticated(true);
        window.localStorage.setItem('userauth', 'true');
        
        // Assuming Firebase Authentication
        if (user.getIdToken) {
          try {
            const idToken = await user.getIdToken();
            window.localStorage.setItem('usertoken', idToken);
          } catch (error) {
            console.error('Error getting ID token:', error);
          }
        }
      } 

          
    };

    checkAuthentication();
    

  }, [user,authenticated]);
  
  

  if (location.pathname === '/auth' || location.pathname === '/signup'|| location.pathname.startsWith('/device/')) {
    return children;
  }

  console.log("authenticated:", authenticated);
  console.log(user);

  return authenticated ? (
    
    <Flex>
      <Box
    w={{base:"60px",md:'200px'}}
    display={{base:"none",md:'block'}}
    >
        <Sidebar/>
     </Box> 

       <Box flex={1} w={{base:"calc(100%-60px)",md:"calc(100%-200px)"}}
       sx={{
        overflowY: 'auto',
        overscrollBehaviorY: 'contain', // Prevents scrolling propagation to the body
        scrollbarWidth: 'none', // Hides scrollbar in Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hides scrollbar in WebKit browsers (like Chrome and Safari)
        },
      }}
      >
          {children}
       </Box>

    </Flex>
  ) : (
    <Navigate to={"/auth"} />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
