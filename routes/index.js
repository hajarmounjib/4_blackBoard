var express = require('express');
const { count, aggregate } = require('../models/articles');
var router = express.Router();

var articleModel = require('../models/articles')
var orderModel = require('../models/orders')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', async function (req, res, next) {

  var emptyStocks = await articleModel.find({ stock: 0 })

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = user.messages;

  var unreadMessages = 0;
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].read == false) {
      unreadMessages += 1
    }
  }

  var taches = user.tasks;
  var taskInprogress = 0

  for (var i = 0; i < taches.length; i++) {
    if (taches[i].dateCloture == null) {
      taskInprogress += 1;
    }
  }

  res.render('index', { emptyStocks: emptyStocks.length, unreadMessages, taskInprogress });
});

/* GET tasks page. */
router.get('/tasks-page', async function (req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  res.render('tasks', { taches: user.tasks });
});

/* GET Messages page. */
router.get('/messages-page', async function (req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');

  res.render('messages', { messages: user.messages });
});

/* GET Users page. */
router.get('/users-page', async function (req, res, next) {

  var users = await userModel.find({ status: "customer" });

  res.render('users', { users });
});

/* GET Catalog page. */
router.get('/catalog-page', async function (req, res, next) {

  var articles = await articleModel.find();

  res.render('catalog', { articles });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function (req, res, next) {

  var orders = await orderModel.find();

  res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async function (req, res, next) {

  var order = await orderModel.findById(req.query.id)
    .populate('articles')
    .exec()

  res.render('order', { order });
});

/* GET chart page. */
router.get('/charts', async function (req, res, next) {
  var user = await userModel.find({ status: 'customer' })
  var countFemale = 0;
  var countMale = 0
  var countLu = 0;
  var countNonlu = 0
  for (var i = 0; i < user.length; i++) {
    if (user[i].gender === "female") {
      countFemale += 1;
    }
    if (user[i].gender === "male") {
      countMale += 1;
    }
  }

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = user.messages;

  var unreadMessages = 0;
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].read == false) {
      countNonlu += 1
    }
    if (messages[i].read == true) {
      countLu += 1
    }
  }
var payment = orderModel.aggregate();
payment.match({"status_payment":"validated","status_shipment":true})
payment.group({ _id : {status_payment:"$status_payment",}, cmdexpedie: { $sum: 1 }});
var cmdexpedie =await payment.exec();

var nonpayment = orderModel.aggregate();
nonpayment.match({"status_payment":"validated","status_shipment":false})
nonpayment.group({ _id : "$status_payment", cmdnonexpedie: { $sum: 1 }});
var cmdNonexpedie =await nonpayment.exec();


var caMensuel = orderModel.aggregate();
caMensuel.match({"status_payment":"validated"})
caMensuel.group({ _id : {moisPayment:{$month:'$date_payment'}}, totalPayment: { $sum: '$total'}});
var camensuel =await caMensuel.exec();


var chiffreAffaire = JSON.stringify(camensuel)

console.log(chiffreAffaire)
  res.render('charts', { countFemale, countMale ,countLu,countNonlu,cmdexpedie,cmdNonexpedie,chiffreAffaire,});
});


module.exports = router;
