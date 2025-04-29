const express=require('express');
const cors=require('cors');
const app=express();
const middleware=require('./middleware')

const nodemailer = require('nodemailer');
// // const bodyParser = require('body-parser');

app.use(cors());

port=process.env.PORT||5000

// app.use(middleware.decodeToken)     


app.listen(port,()=>
{
   console.log("the port is start listening :"+port)   
})

app.get("/",(req,res)=>
{
    res.send("Hello this the check console access");
})


app.post('/scheduleCodeDeletion', async (req, res) => {
  
  const { dept, batch } = req.headers;
  console.log("Department and Batch:", dept, batch);

  if (!dept || !batch) {
      return res.status(400).json({ error: 'Department and batch headers are required' });
  }

  try {
      setTimeout(async () => {
          middleware.deleteCodes(dept, batch);
          console.log("Codes deleted successfully!");
          res.status(200)
      }, 2* 60 * 1000); // 2 minutes delay

    
  } catch (error) {
      console.error('Error scheduling code deletion:', error);
      res.status(500);
  }
});


  app.post('/sendemail', async (req, res) => {

    console.log("api call for mail");

    const {email}=req.headers;
    console.log(email);
    try
    {
        
// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manishdevaraj01@gmail.com', // Your Gmail address
      pass: 'kukz xrev ucab diqm' // Your Gmail password (or App Password if using 2FA)
    }
  });
  
  // Define email content
  const mailOptions = {
    from: 'manishdevaraj01@gmail.com', // Sender address (must be same as auth user)
    to: email+"@skct.edu.in", // List of recipient s
    subject: 'Attendance', // Subject line
    text: 'Your attendance have been marked!' // Plain text body
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200)
    }
  });
    }
    catch(err)
    {
      console.log(err);
        res.json({error:err});
    }

  })

  // verify device
  app.get('/verifydevice', async (req, res) => {
    const { cdeviceid, email, udeviceid } = req.headers;
    if (cdeviceid) {
        try {
            const id = await middleware.deviceinfo(email);
            console.log('id:', id);
            console.log("current:", cdeviceid);
            console.log("up:", udeviceid);
            if (id) {
                if (id == cdeviceid) {
                    console.log('authenticated');
                    await middleware.updatedevice(email, udeviceid);
                    return res.status(200).json({ message: "authenticated" });
                } else {
                    return res.status(401).json({ message: 'NOT Authenticable device' });
                }
            } else {
                return res.status(404).json({ message: 'No device found for the user' });
            }
        } catch (error) {
            console.error('Error verifying device:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        console.log('Token is not identified');
        return res.status(400).json({ message: 'Token is not identified' });
    }
});


app.put("/updatedevice",async(req,res)=>
{
  const {cdeviceid,email}=req.headers;
  if(email)
  {
    await middleware.updatedevice(email,cdeviceid);
    return res.status(200).json({message:"authenticated"});
  }
  else
  {
    console.log('token is not identifide');
    return res.status(404).json({message:'token is not identifide'});
  }

})