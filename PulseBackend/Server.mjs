import express from "express";
import cors from 'cors';
import mongoose, { Schema, mongo } from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from "multer";

dotenv.config();

//create main App;

const app = express();
app.use(cors({
     origin: '*',
     methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

//create Port;

const PORT = process.env.PORT || 3000;

//Mongo db connection;

mongoose.connect('mongodb://localhost:27017/Pulse')
.then(() => {
     console.log('Db is connect');
})
.catch(() => {
     console.log('Db is disconnect')
})

//Create db schema;

const UserShcema = mongoose.Schema({
     name: String,
     lastname: String,
     nickname: String,
     email: String,
     password: String,
     rePassword: String,
     userProfile: {
          type: String,
          default: ''
     },
     userSpecialEmoji: {
          type: [String],
          default: []
     },
     userBiography: {
          type: String,
          default: ''
     },
     userFollowedCount: { //if user follow the other users
          type: String,
          default: ''
     },
     userFollowCount: { //user's followers
          type: String,
          default: ''
     },

});


//Add the Schema to Model
const Users = mongoose.model('Users', UserShcema);


//get register user;
app.post('/register', async (req, res) => {
     try {
         const registerUser = req.body;

         const { nickname, email } = registerUser;
         const existingUsers = await Users.findOne({
             $or: [
               { nickname: nickname }, 
               { email: email }
          ],
         });
 
         if (existingUsers) {
             return res.status(409).json({ existUser: "This user already used" });
         } 

          const users = new Users(registerUser);
 
          try {
               // bcrypt hashing user password for security;
               const plainPassword = users.password;
               const saltRounds = 10;
               const hashingPassword = await bcrypt.hash(plainPassword, saltRounds);
               
               users.password = hashingPassword;
               await users.save();
            
               res.status(200).json({
                    registered: 'registerCompleted',
               });

          } catch (error) {
               console.log('Error saving user:', error);
               res.status(500).send({ error: "Internal Server Error" });
          }

     } catch (error) {
         console.log('Error in server:', error);
         res.status(500).send({ error: "Internal Server Error" });
     }
});


app.post('/login', async (req, res) => {
     try {
          const { nickname, password } = req.body;

          //FIND AT DATABASE
          const users = await Users.findOne({
               $or: [
                    { nickname: nickname },
                    { password: password },
               ]
          });

          //NOT FOUND USER ?
          if(!users){
               return res.send({notfound: 'not found user'});
          }

          //INVALID PASSWORD ?
          const validPassword = await bcrypt.compare(password, users.password);
          if(!validPassword){
               return res.send({invalidPass: 'invalid password'});
          }

          //AFTER THE UP
          try {
          //creating user token id
          const payload = { userID: users._id };
          const secretKey = process.env.SECRET_KEY;
          const token = jwt.sign(payload, secretKey, {expiresIn: '30d'});

          //send token to client
          res.send({token: token, message: 'loggedSuccess'});

          }catch(error){
               console.log(error, "token error")
          }

     } catch (error) {
          res.send({loginErr: error})
     }
});


app.get('/login/sendinformation', async (req, res) => {
     try {
          const token = req.headers.authorization;
          const withoutBearer = token.replace("Bearer ", "");
          const secretKey = process.env.SECRET_KEY;
          const { userID } = jwt.verify(withoutBearer, secretKey);
          const users = await Users.find({ _id: userID });
          res.send({userInfo: users});
     } catch (error) {
          console.log(error, 'user information cannot be send')
     }
});


//multer settings and save the user profile
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//give user profile photograph
app.post('/userprofile', upload.single('uploadedImage'), async (req, res) => {
     try {
          const uploadedImg = req.body.uploadedImage;
          const decodedImage = Buffer.from(uploadedImg, 'base64');
          const token = req.headers.authorization;

          if(token && decodedImage){

               const withoutBearer = token.replace("Bearer ", "");
               const secretKey = process.env.SECRET_KEY;
               const { userID } = jwt.verify(withoutBearer, secretKey);

               if(!userID){
                    return res.status(401).send({ error: 'istifadeci kimliyi yanlisdir' });
               }
               
               if(!uploadedImg){console.log('not req.file')}

               const updateUser = await Users.findOneAndUpdate({ _id: userID }, { userProfile: uploadedImg });

               if(updateUser){
                    res.status(200).send({message: 'Profile deyisdirildi'});
                    console.log('profil yuklendi')
               }else{
                    res.status(404).send({error: 'istifadeci tapilmadi'});
                    console.log('profil yuklenmedi')
               }

          } else {
               console.log('error');
               console.log(token);
          }
     } catch (error) {
          res.status(501).json({ error: 'profil yuklenemedi catch er', });
          console.log(error)
     }
});

//send user profile photograph to client side
app.get('/getuserprofile', async (req, res) => {
     try {
         const token = req.headers.authorization;
         const withoutBearer = token.replace("Bearer ", "");
         const secretKey = process.env.SECRET_KEY;
         const verifyToken = jwt.verify(withoutBearer, secretKey);
 
         // Use findOne instead of find to get a single document
         const user = await Users.findOne();
 
         if (user && verifyToken) {
             console.log('user is found and send the profile image');
             return res.status(201).send({ userProfile: user.userProfile });
 
         } else {
             console.log('not found user');
             return res.status(404).json({ error: 'User not found' });
         }
 
     } catch (error) {
         console.log(error);
         return res.status(500).json({ error: 'Internal Server Error' });
     }
});
 
//give user emojies on the client side
app.post('/useremojies', async (req, res) => {
  try {
     const token = req.headers.authorization;
     const { emojies } = req.body;

     if(token){ console.log('token var') } 
     else { console.log('token tapilmadi') }

     if(emojies){ console.log('emojiler geldi') } 
     else { console.log('emojiler tapilmadi') }

     const withoutBearer = token.replace("Bearer ", "");
     if(withoutBearer) { console.log('token ayristirildi') } 
     else { console.log('without bearer xetasi') }

     const secretKey = process.env.SECRET_KEY;
     if(secretKey) { console.log('secret key found') } 
     else { console.log('secret key not found') }

     const { userID } = jwt.verify(withoutBearer, secretKey);
     if(userID) { console.log('token verified is successfull!') } 
     else { console.log('token not verified USER not found!') }
     
     const maxEmojiLength = 3;
     if(userID && emojies.length <= maxEmojiLength ){
          const uploadEmoji = await Users.findOneAndUpdate(
               { _id: userID },
               { $set: { userSpecialEmoji: emojies } },
          );
          if(uploadEmoji){
               res.status(201).json({success: 'emojiler veritabanina yuklendi'})
               console.log('emoji yuklendi!');
          } else {
               res.status(500).json({error: 'emojiler veritabanina yuklenmedi'})
          }
     } else {
          res.status(404).send({override: 'overEmoji'});
          console.log('userid deyil! or emoji length is override')
     }

  }catch(error){
     res.status(404).send({error: 'emojiler alinamadi'});
     console.log('emojiler alinamadi', error);
  }
     
});

//send user emojies to client side
app.get('/getuseremojies', async (req, res) => {
     try {
          const token = req.headers.authorization;
          if(token){console.log('token alindi')}else{ console.log('token tapilmadi') }

          const withoutBearer = token.replace("Bearer ", "");
          if(withoutBearer){ console.log('token ayristirildi') } else { console.log('token ayristirilmadi') }

          const secretKey = process.env.SECRET_KEY;
          if(secretKey){ console.log('secret key tapildi') } else { console.log('secret key tapilmadi') }

          const user = await Users.findOne();
          const verifyToken = jwt.verify(withoutBearer, secretKey);
          if(user && verifyToken){
               console.log('verified and founded token and user');
               res.status(201).send({ emojies: user.userSpecialEmoji });
          } else {
               res.status(404).json({ error: 'emojiler tapilmadi veya user ve verifytoken errordadi' });
          }

     } catch (error) {
          console.log(error, 'emojiler gonderilmedi') 
     }
});


//give user BIOGRAPHY on the client side
app.post('/userbio', async (req, res) => {
     try {
          const { userBiography } = req.body;
          const token = req.headers.authorization;
          if(token){console.log('token alindi')} else { console.log('token tapilmadi') }
     
          const withoutBearer = token.replace("Bearer ", "");
          if(withoutBearer){console.log('token ayristirildi')} else { console.log('token ayristirilmadi') }
     
          const secretKey = process.env.SECRET_KEY;
          if(secretKey){console.log('secretkey tapildi')} else { console.log('secretkey tapilmadi') }
     
          const { userID } = jwt.verify(withoutBearer, secretKey);

          if(userID && userBiography){
               const uploadBio = await Users.findOneAndUpdate(
                    { _id: userID },
                    { $set: { userBiography: userBiography } },
               );
               
               if(uploadBio){
                    res.status(201).json({message: 'biography updated!'})
                    console.log('bio guncellendi!')
               } else {
                    res.status(404).json({message: 'error var biography de'});
                    console.log('bio error! update user deyil ya da basqa birsey')
               }
          }

     }catch(error){
          console.log('biography alina bilmedi', error);
          res.status(404).json({err: 'biography alina bilmedi'})
     }


     
})


//send user BIOGRAPHY on the client side
app.get('/getuserbio', async (req, res) => {
     try {
          const token = req.headers.authorization;
          const withoutBearer = token.replace('Bearer ', '');
          const secretKey = process.env.SECRET_KEY;
          const verifyToken = jwt.verify(withoutBearer, secretKey);
          
          const user = await Users.findOne();

          if(user && verifyToken){
               res.status(201).send({ userBio: user.userBiography });
               console.log('user bio gonderildi');
          } else {
               console.log('user tapilmadi veya verifytoken err, bio gonderilmedi');
               res.status(404).json({ error: 'user bio not send to client side' })
          }
     } catch (error) {
          console.log('gonderilmedi biography error', error);
          res.status(500).json('error');
     }
})


//delete biography
app.delete('/deletebio', async (req, res) => {
     try {
      const token = req.headers.authorization;
      const withoutBearer = token.replace('Bearer ', "");
      const secretKey = process.env.SECRET_KEY;
      const { userID } = jwt.verify(withoutBearer, secretKey);
      
      if(userID) {
          const deleteBio = await Users.findOneAndUpdate(
               { _id: userID },
               { $set: { userBiography: '' } }, 
               { new: true } 
          );
          if(deleteBio){
               console.log('bio silindi');
               res.status(200).send({msg: 'bio deleted'});
          } else {
               console.log('bio silinmedi');
               res.status(404).json('xeta var')
          }
      } else {
          console.log('user id tapilmadi veya token sehvi var, bio silinmedi')
      }

     } catch (error) {
       console.log('bio silinmedi', error)
       res.status(500).json({err: 'bio silinmedi'})
     }
})


//USER POSTS

//create new schema
const UserPosts = mongoose.Schema({
     user: {
          type: String,
          default: "",
     },
     postDescription: {
          type: String,
          default: "",
     },

     postImage: {
          type: String,
          default: "",
     },

     postVideo: {
          type: String,
          default: "",
     },

     postText: {
          type: String,
          default: "",
     },

     postLikes: {
          type: Number,
          default: 0,
     },

     postComments: {
          type: String,
          default: "",
     }
});

const Posts = mongoose.model("posts", UserPosts);
 
app.post('/userposts', upload.single('postImg'), async (req, res) => {
     try {
          const description = req.query.description;
          description ? console.log(description) : console.log('nul desc');
          const postImg = req.file;
          postImg ? console.log('POSTIMG alindi') : console.log('none postimg')
          const token = req.headers.authorization; 
          token && console.log('ok token');
          const withoutBearer = token.replace("Bearer ", "");
          withoutBearer && console.log('without bearer is success');
          const secretkey = process.env.SECRET_KEY;
          const { userID } = jwt.verify(withoutBearer, secretkey);

          if(userID) {
               const updatePost = await Posts.create({
                    user: userID,
                    postDescription: description,
                    postImage: postImg.buffer.toString('base64'),
               });
               
               updatePost ? console.log('updated post') : console.log('doesn"t update post');
 
           } else {
               console.log('userid is not found');
          }

     } catch (error) {
          console.log(error, '/userpost endpoint error');
     }
})

app.get('/getposts', async (req, res) => {
     try {
       const posts = await Posts.find();
   
       if (posts) {
         res.send({ posts: posts });
       } else {
         console.log('No posts found');
         res.status(404).send('No posts found');
       }
     } catch (error) {
       console.log('Error fetching posts', error);
       res.status(500).send('Error fetching posts');
     }
   });
   


app.get('/home', (req, res) =>{ 
     console.log('slma');
     res.send('salam ha1')
})




//start
app.listen(PORT, () => {
     console.log(PORT, 'is running');
})