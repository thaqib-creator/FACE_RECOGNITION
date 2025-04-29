var admin = require("firebase-admin");

// const serviceAccount = {
//   type: 'service_account',
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
// };  

const serviceAccount={
  "type": "service_account",
  "project_id": "facerecognition-c5582",
  "private_key_id": "5d94fd7bb07f035e6f17cbdef613a153bc5dd5ec",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5aOo/VdGI++N2\nuELzUCYH53EWVhjtVplrXqR1OmFpJVoB3QJ9945Xehn81fZokeGjoxzO2EdhR6Jc\nxM9EIMuoQKIQzco7ueUJqRYEHCBkRmlXqLkZzkgUkhVq65PFM0+eq4jykj2wNmt2\n7Q0UrQQMsOg/LPLfJ2Y8gBukZvyfaKUGXr+giJH5WeiDV3Dkb5aucBCAhjk+a7bb\nnQYyjf0ovSdpCFWYxHKDH8RS2AGSF3suIlEq5l6ueYZzMIfMaPcRjk1C8bOLi1ii\naPQMGngqQuuLZS4DwHkTeCtcvTSnd2qBfk04OBlJpdBY8Kx20VfCk4lW7JUbCj/g\nXlLMeYZXAgMBAAECggEAP2a3d4n2mXOdIEs5Ja+6GYjUnHE7m+k5lEQsU6PvjH+H\nzExRnlapd5Na0KEv3ilIcecEolzF5+eRh0yLnb3jNnlHkhx088CJKCkITMZ7cx66\nxg19omvuLQ6ZQVMmWFBIATeiIGTOsHOjgurjxra1REu4V2Yc9R8pcDXUff7zkuSk\n6G01np+2oRQoijzkkXF1cp8yQNGVAr0rmsjL6G+KxBZ+l8gsWuH4cDGIPCqxPRv7\nbWZoioPEA3FtuOrQkbfJXlWtfhwfcWjAlv/45Dqfnz/7LeHlf4SWMAd7+GGmXb8J\nMqUDmjZ6c0X1S15g5VatJgwiW4qrUiVqQcDT30dwEQKBgQD5yom5L3bZ0GyL6q0K\nOpIfHfq5hcwo6ZgaEoSAVM72IxJTgVkY7N/OyCUR13hv55o8GZ8PLGYva8bpVOfU\ng2CO+luwhrsLaaYvIh0rhuu3ssxveJG98sRUNocek8rQdJojok9ajtjc4uA/J3aZ\nPjfsRdukkTktTxHmTY8rn1IgxwKBgQC+BLVDK13dF/AFnwSITRLyMoMeGmBwbmPD\niJn39t9EZFKjcc+eyOpx0gsIgI9u8RCoKeSlqCkZcg2mMKncVBqEYnEgtcZznSHe\n7XG0Mi/j39XoyL1i+Hm3kfI7dL60SEc+tTZKSs9Iz1XQJJP8Uh4xK0pYmJE+8w7D\na0itcBz98QKBgQC8N5cLCO6/NUN1MkFs4bFU7RwNSvoJIerQSn+4yy6fXNHkRiTC\nmUoS39C+3uMLPzKCcrPdlRDyTn21N5rwEIZjddY872hlMxhbj5L3R1S6OGm+3NTE\nkfbJlcS+j5JU/Gdgzl6I1/Ykind6XtwIoE83I3RbTmoM7/WG2Y41ynjx5QKBgCyu\nyL0RzpG2FlAME7HFhgYEEMccZr8phjYtwh8II3peqPwcQDlTf6XiQYvvR0tMTqFs\nsIKv53I/WqxQ1zCjalTlHTsW46K+OX/FkC5SeuZ39UI3KinCykR7gl2u10VnlbFO\nRYT00IeLkd9PKqlz2fuv9VyeC9GksD0N1lpKedbRAoGATPhT16w8cbK6KaKhqfGM\ndzkb3oV2LEq+d8ybm9/XWhLMPTtpnWmBDp48xKbGI47Y9S5DiuyEbYgAQZ6CeDan\n162FCEDlvbqtTIec3H5KlQ2aXx5F5u7ENTFZw9j6GFcSek1fZ1IBvusFH5hGvftr\nXbadW4sRKpz9wWZ+EjMqNsE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ldsq1@facerecognition-c5582.iam.gserviceaccount.com",
  "client_id": "116077854922531334962",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ldsq1%40facerecognition-c5582.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports =admin;