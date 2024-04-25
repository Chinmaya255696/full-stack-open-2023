const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


//const url =
 // `mongodb+srv://chinu:Chinu%402556@cluster0.mtofcuv.mongodb.net/?retryWrites=true&w=majority&appName=NoteApp`
// in this uri my password is Chinu@2556
/* you have a password (Chinu@2556) that contains the special character @.
 This character is also used in URIs to separate the username and password 
 from the hostname. 
 When the @ symbol is part of the username or password, it must be 
 URL-encoded to avoid confusion with the delimiter.

Solution:
You need to replace the @ in your password with its URL-encoded equivalent %40.
This prevents it from being interpreted as a delimiter in the URI.
Modify your connection string accordingly: */

//======================OR===============================//

// Encode any special characters in the password
const encodedPassword = encodeURIComponent(password);

const url = `mongodb+srv://chinu:${encodedPassword}@cluster0.mtofcuv.mongodb.net/?retryWrites=true&w=majority&appName=NoteApp`;
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

