
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {title: "index"});
};

exports.drone = function(req, res){
  res.render('drone', {title: "drone"});
};

exports.drone2 = function(req, res){
  res.render('drone2', {title: "drone2"});
};

exports.drone3 = function(req, res){
  res.render('drone3', {title: "drone3"});
};

exports.controller = function(req, res){
  res.render('controller', {title: "controller"});
};

exports.controller2 = function(req, res){
  res.render('controller2', {title: "controller2"});
};

exports.controller3 = function(req, res){
  res.render('controller3', {title: "controller3"});
};

exports.controller4 = function(req, res){
  res.render('controller4', {title: "controller4"});
};