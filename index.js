const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require("./models/User");

// application/x-www-form-urlecoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rin99:abcd1234@boilerplate.p8ebg48.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요~!'));


app.post('/register', async (req, res) =>  {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다

  const user = new User(req.body);

  try {
      const result = await user.save();
      return res.status(200).json({ success: true });
  } 
  catch(error) {
      return res.json({ success: false, error });
  }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));