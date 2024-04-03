const express = require('express');
const User = require("../models/user");
const router = express.Router();

//Admin user routing

const adminCredentials = {
  name: 'Obakeng',
  password: 'Dusani@0180'
}

router.post('/admin/login',(req, res)=>{
  if(req.body.name === adminCredentials.name && req.body.password === adminCredentials.password ){
    req.session.user = req.body.name;
    res.redirect('/admin/dashboard');
  }else{
    res.end('Invalid username');
  }
})

router.get('/admin/dashboard',(req, res)=>{
  if(req.session.user){
    res.render('dashboard', {user: req.session.user})
  }
})

router.get('/admin/logout', (req, res)=>{
  req.session.destroy((data)=>{
    res.redirect('/admin')
  })
})

router.get('/admin/manageusers',(req, res)=>{
  if(req.session.user){
    res.render('users',{user: req.session.user});
  }
})

router.get('/admin/manageuser',(req, res)=>{
  User.find().sort({createdAt: -1})
    .then((data)=>{
      res.send(data)
    }).catch((err)=>{
    console.log(err);
  })
});

router.get('/admin',(req, res)=>{
  res.status(200).render('admin');
})

module.exports = router;
