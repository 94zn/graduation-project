"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
// router.post('/login/create',(req,res) => {
//   // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
//   let newAccount = new models.Login({
//     userName : req.body.username,
//     password : req.body.password
//   });
//
//   // 保存数据newAccount数据进mongoDB
//   newAccount.save((err,data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send('createAccount successed');
//     }
//   });
// });
/**
 * 获取已有账号接口
 * */
router.post('/login',(req,res) => {
  if(req.body.flag =='login'){
    // 通过模型去查找数据库
    models.Login.find({"userName":req.body.userName,"password":req.body.password},(err,data) => {
      if (err) {
        res.send(err);
      } else {
        console.log('find userName',data);
        req.session.userInfo = data;
        res.send(data);
      }
    });
  }else if(req.body.flag == 'register'){
    /**
      验证用户名是否存在
    */
    models.Login.find({"userName":req.body.userName},(err,data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
});

router.post('/checkUserName',(req,res) =>{
  models.Login.findbyUserName(
    req.body.userName
  ,(err,data)=>{
    if (err) {
      res.send(err);
    } else {
      if(data.length ==0){
        req.session.userInfo  = [
          {'userName':req.body.userName,'password':req.body.password}
        ]
      }
        res.send({'num':data.length});
    }
  })
});
/**
 * 用户注册接口
 * */
router.post('/register',(req,res)=>{
  console.log(req.body.userName,req.body.password);
  models.Login.create({
    userName:req.body.userName,
    password:req.body.password,
    // car:[]
  },(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

/**
 *用户注销
 */
router.get('/logout', (req, res) => {
  delete req.session.userInfo;
  res.send({status: 0, msg: '注销成功'});
});

/**
 * 用户购买商品
* */
router.post('/buy',(req,res) =>{
  // console.log('购买信息',req.body);
  var data = req.body;
  models.orders.create({
    order_address:data.b_address,
    order_price:data.b_price,
    order_phone:data.b_phone,
    order_bookName:data.b_bookName,
    order_name:data.b_name,   //收货人姓名
    order_userName:data.b_userName,
    order_author:data.b_author,
    order_time:data.b_time,
    order_type:data.b_type,
    order_status:data.b_status,
    order_id:data.b_order_id,
    // order_savetime:data.b_saveTime,
    order_num:data.b_num
  },(err,data)=>{
    if(err){
      res.send(err);
    }else{
      // res.send({status:0,msg:'购买成功'});
      // console.log('返回',data);
      res.send(data);
    }
  });

});

/**
* 用户加入购物车
* */
router.post('/addCar',(req,res)=>{
  models.Login.addCar(
    req.body.userName,
    req.body.detail.id,
    (err,data)=>{
     if(err){
       res.send(err)
     } else{
       res.send(data);
     }
    });

});

/**
 * 用户获取购物车信息
* */
router.get('/userProduct',(req,res)=>{
  console.log('car userInfo',req.query);
  models.addproduct.getCar(
    req.query.p_id,
    (err,data)=>{
      if(err){
        res.send(err);
      } else{
        res.send(data)
      }
    });
});

/**
* 用户移除购物车
* */

router.delete('/deleteCar',(req,res)=>{
  models.Login.removeCar(
    req.query.name,
    req.query.id
    ,(err,data)=>{
      if(err){
        res.send(err);
      } else{
        res.send(data);
      }
    })
});

/**
 * 用户获取个人订单信息
* */
router.get('/userOrders',(req,res)=>{
  models.orders.find({
      'order_userName':req.query.userName
    },
    (err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    })
});

/**
 * 用户获取分类商品
* */
router.get('/type',(req,res)=>{
  models.addproduct.find({
    'p_type':req.query.type
  },(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});

/**
 * 用户模糊查找
* */

router.get('/search',(req,res)=>{
  models.addproduct.find({
    'p_name':eval('/'+req.query.name+'/')
  },(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});

/**
*用户通过订单id 去查 产品Id
* */
router.get('/getProductByOrderId',(req,res)=>{
  models.orders.getProductId(
    req.query.id
    ,(err,data)=>{
        if(err){
          res.send(err)
        }else{
          res.send(data)
        }
    })
});

/**
*用户添加评论
* */
router.post('/addContent',(req,res)=>{
  models.addproduct.addContent(
    req.query.p_id,
    req.query.userName,
    req.query.content,
    (err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    })
});


/**
 * 管理员注销
* */
router.get('/adminloginout',(req,res) => {
  delete req.session.adminInfo;
  res.send({status:0,msg:'注销成功'});
});

/**
 * 管理员登录验证
 * */
router.get('/checkLogin', (req, res) => {
  if (req.session.adminInfo) {
    res.json({status: 0, userInfo: req.session.adminInfo})
  } else {
    res.json({status: 1, msg: '请先登录'});
  }
});

/**
 * 管理员登录
* */
router.post('/adminLogin',(req,res) => {
  models.admin.find({
    adname:req.body.name,
    password:req.body.password
  },(err,data)=>{
    if (err) {
      res.send(err);
    } else {
      if(data.length){
        req.session.adminInfo = data;
      }
      // console.log('admin',data)
      res.send(data);
    }
  })
});
/**
 * 获取登陆后用户信息
* */
router.get('/userinfo', (req, res) => {
  res.send(req.session.userInfo);
});

/**
 * 管理员获取orders
* */
router.get('/adminOrderList',(req,res)=>{
  if(req.query.flag == 'asc'){
      // res.send({'flag':'asc'});
      models.orders.sort(
        -1,req.query.skip,(err,data)=>{
          if(err){
            res.send(err)
          }else{
            res.send(data);
          }
        });
  }else if(req.query.flag == 'desc'){
      // res.send({'flag':'desc'})
      models.orders.sort(
        1,req.query.skip,(err,data)=>{
          if(err){
            res.send(err)
          }else{
            res.send(data);
          }
        });
  }else if(req.query.flag == 'first'){
    models.orders.sort(
      1,req.query.skip,(err,data)=>{
        if(err){
          res.send(err)
        }else{
          res.send(data);
        }
      });
  }else{
    models.orders.count((err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    });
  }
});

/**
 * 管理员获取所有商品
* */
router.get('/allProducts',(req,res)=>{
  res.send({'name':'获取所有列表'})
});

/**
 * 管理员添加商品
* */
router.post('/addproduct',(req,res)=>{
  // console.log(req.body)
  models.addproduct.create({
    p_name:req.body.p_name,
    p_author:req.body.p_author,
    p_price:req.body.p_price,
    p_num:Number(req.body.p_num),
    p_discribe:req.body.p_discribe,
    p_time:req.body.p_time,
    p_type:req.body.p_type,
    p_heat:req.body.p_heat
  },(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })

});
/**
* 管理员获取所有商品
* */
router.get('/adminAllProduct',(req,res)=>{
  models.addproduct.find({},(err,data)=>{
    if(err){
      res.send(err)
    }else{
      res.send(data)
    }
  })
});

/**
 * 管理获取用户列表
* */
router.get('/userList',(req,res)=>{
  models.Login.find({},(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});

/**
* 管理员修改商品信息
* */
router.post('/modify',(req,res)=>{
    console.log(req.body);
    models.addproduct.modifys(
      req.body.id,
      req.body.price,
      Number(req.body.num),
      (err,data)=>{
        if(err){
          res.send(err);
        }else{
          res.send(data);
        }
      });
});

/**
* 管理员更改订单状态(发货)
* */

router.put('/adminChangeStatus',(req,res)=>{
  console.log(req.query);
  models.orders.changeStatus(
    req.query.id
    ,(err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    });
});

/**
* 管理员删除商品
* */
router.delete('/deleteProduct',(req,res)=>{
  // res.send({'ok':req.body})
  models.addproduct.delete(
    req.body._id
    ,(err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    }
  )
});

module.exports = router;
