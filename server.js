const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  gender: String,
  aboutMe: String,
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/trollbook', {
  useNewUrlParser: true
});

app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    aboutMe: req.body.aboutMe,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find();
    console.log(users);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/users/:id', async(req, res) => {
  try {
    var item = await Item.findOne({
      username: req.params.id
    });
    //item.title = req.params.title;
    //item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
