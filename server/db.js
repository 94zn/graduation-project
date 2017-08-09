// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
  // _id:String,
  userName : String,
  password : String,
  car:{
    type:Array,
    default:[],
    required:false
  }
});

/**
 * 管理员登录
* */
const adminLoginSchema = mongoose.Schema({
    adname:String,
    password:String
});

/**
* 管理员添加商品
* */

const addproductSchema = mongoose.Schema({
    p_name :String,
    p_author :String,
    p_num :Number,
    p_time :String,
    p_type :String,
    p_price :String,
    p_discribe :String,
    p_heat:String,
    p_content:[{
      name:String,
      content:{
        type:Array,
        default:[]
      }
    }]
    // _id:{
    //   required:false
    //   type:ObjectId,
    //
    // }
});

/**
 * 用户下订单
* */

const orderSchema = mongoose.Schema({
  order_address:String,
  order_author:String,
  order_bookName:String,
  order_userName:String, //用户名
  order_name:String, //收货人名字
  order_id:String,
  order_phone:String,
  order_price:String,
  order_type:String,
  order_status:String,
  order_num:String,
  order_savetime:{
    type: Date,
    default:Date.now
  },
  order_time:String,
});

/**
* 添加方法用于验证用户名是否存在
 */
loginSchema.statics.findbyUserName = function (name,callback) {
  return this.model('users').find({userName: name}, callback);
};

/**
 * 用户添加到购物车方法
* */
loginSchema.statics.addCar =function (userName,id,callback) {
  return this.model('users').update({'userName':userName},{'$addToSet':{'car':id}},callback);
};

/**
* 用户获取购物车信息
* */
addproductSchema.statics.getCar = function (id,callback) {
  return this.model('products').find({'_id':mongoose.Types.ObjectId(id)},callback)
};

/**
* 用户移除购物车
* */
loginSchema.statics.removeCar = function (name,id,callback) {
  return this.model('users').update({'userName':name},{$pull:{'car':id}},callback);
}

/**
 * 所有订单排序静态方法
* */
orderSchema.statics.sort =function (name,skip,callback) {
  var num = (skip-1)*4;
  return this.model('orders').find({},callback).sort({'order_savetime':name}).limit(4).skip(num);
};

/**
* 返回所有订单个数
* */
orderSchema.statics.count = function (callback) {
  return this.model('orders').find({},callback).count();
};

/**
* 用户通过订单id去查商品id
* */
orderSchema.statics.getProductId = function (id,callback) {
  return this.model('orders').find({'_id':mongoose.Types.ObjectId(id)},callback);
};

/**
 * 用户添加评论
* */
addproductSchema.statics.addContent = function (id,userName,content,callback) {
  console.log(id,userName,content)
  return this.model('products').update({'_id':mongoose.Types.ObjectId(id)},{$addToSet:{'p_content':{'name':userName,'content':content}}},callback)
};

/**
* 管理员修改商品信息
* */
addproductSchema.statics.modifys = function(id,price,num,callback){
  var _id = mongoose.Types.ObjectId(id);
  console.log('_id:',typeof  _id);
  // return this.model('products').find({'_id':_id},callback);
  return this.model('products').update({'_id':_id},{$set:{'p_price':price,'p_num':num}},callback);
};

/**
* 管理员删除商品
* */
addproductSchema.statics.delete = function (id,callback) {
  return this.model('products').remove({'_id':mongoose.Types.ObjectId(id)},callback);
};

/**
* 管理员发货
* */

orderSchema.statics.changeStatus = function (id,callback) {

  return this.model('orders').update({'_id':mongoose.Types.ObjectId(id)},{$set:{'order_status':'已发货'}},callback)
}

/************** 定义模型Model **************/
const Models = {
  Login : mongoose.model('users',loginSchema),
  admin :mongoose.model('admins',adminLoginSchema),
  addproduct : mongoose.model('products',addproductSchema),
  orders : mongoose.model('orders',orderSchema),
};

module.exports = Models;
