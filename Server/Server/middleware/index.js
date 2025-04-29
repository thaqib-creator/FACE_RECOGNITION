const admin=require('../Firebasconfig/config')

class Middleware
{
    async decodeToken(req,res,next)
    {
      
        try
        {
            const token=req.headers.authorization;
            const key=token.split(" ")[1];
            // console.log(key)
            const decodevalue=await admin.auth().verifyIdToken(key);

            if(decodevalue)
            {
                res.status(200).json({message:"Your acces to db is authorized........."});
                return next();  
            }

            return res.json({message:"Internal error"})

        }
        catch(err)
        {
            return res.json({error:err});
        }

    }

    async  deleteCodes (dept, batch)
    {
        try {
            const db = admin.firestore(); 
            const docRef = db.doc(`${dept}/${batch}/Students/MANAGER`);
            
      
            docRef.update(updatedData)
    .then(() => {
        console.log('Document successfully updated!');
    })
    .catch((error) => {
        console.error('Error updating document:', error);
    });
      
      
        //   console.log('Codes deleted successfully!');
        //   return 'Codes deleted successfully!';
        } catch (error) {
          console.error('Error deleting codes:', error);
          throw error;
        }
      };

      async deviceinfo(email) {
        try {
            const db = admin.firestore(); 
            const doc = await db.collection('USERS').doc(email).get();
            if (doc.exists) {
                console.log('Document data:', doc.data().DEVICE_ID);
                return doc.data().DEVICE_ID;
            } else {
                console.log('No such document!');
                return null; // or throw an error, depending on your logic
            }
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error; // Rethrow the error for handling elsewhere if needed
        }
    }
    
      async updatedevice(email,id)
      {
        const db = admin.firestore(); 
        const docRef = db.collection('USERS').doc(email);
        docRef.update({
            DEVICE_ID:id,
        })
    .then(() => {

        console.log('Document successfully updated!');
    })
    .catch((error) => {
        console.error('Error updating document:', error);
    });
      }
}

module.exports=new Middleware();