import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirbaseConfig";

function Dbhooks() 
{
   
const collectiondata = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      console.log("ch1")
      data.push({ id: doc.id, data: doc.data() });
    });
    return data;
  };
    

return {collectiondata};
  
}

export default Dbhooks