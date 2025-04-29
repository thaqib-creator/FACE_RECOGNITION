import { useEffect, useRef, useState } from "react";
import { db, storage } from "../FirbaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {  HStack, Input, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function ExelPage() {
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const docRef = doc(db, "Iot", "Attendance");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
          // Document exists, fetch its data
          const data = docSnap.data();
          // Extracting only the date part from the keys
          const dateKeys = Object.keys(data).map(key => key.split(" ")[0]);
          setDocumentData(dateKeys);
          console.log("Document does exist");
        } else {
          // Document does not exist
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocumentData();
  }, []);
  // const [downloadUrl, setDownloadUrl] = useState(null);

  const handleDownload = async (date) => {
    try {
      const filePath = ref(storage, `Attendance/Iot/${date}.xlsx`);

      getDownloadURL(filePath).then((url)=>
      {
        console.log(url)
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${date}.xlsx`); 
        
        // Set the filename with the .xlsx extension
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
      })
    
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
const inputref=useRef()
const [filedate,setfiledate]=useState()

const handleClickChange = (date) => {
  console.log(date)
  setfiledate(date)
  inputref.current.click(); // Trigger click on input element
};

const handleFileSelection = async (file) => {
  if (file) {
    try {
      console.log("filedate is : ",filedate)
      const filename=filedate+".xlsx"
      console.log(filename)
      const storageRef = ref(storage, `Attendance/Iot/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              },  );
            } catch (error) {
              console.error("Error uploading file:", error);
            }
          }
          console.log("File uploaded successfully!");
};

  return (
    <Wrap spacing={4}>
      
      {documentData ? (
        documentData.map(date => (
          <WrapItem key={date}>
           <HStack borderBottom="1px solid #ccc" >
           <Text  padding="4"
             onClick={() => handleDownload(date)}
             cursor={"pointer"}
            >
              {date}
            </Text>
              <Text color ="teal.300" onClick={()=>handleClickChange(date)} cursor={"pointer"}>Change</Text>
              <Input  ref={inputref} type="file" display={"none"}  accept=".xls,.xlsx,application/vnd.google-apps.spreadsheet"
              onChange={(e) => handleFileSelection(e.target.files[0])}
              ></Input>
           </HStack>
          </WrapItem>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </Wrap>
  );
}

export default ExelPage;
