var express = require('express');
var app=express();
var server = require('http').createServer(app);


var tasks={};
var users={
"admin":{region:"God",power:"admin",password:"admin"},
"zhoumj":{region:"省公司",power:"admin",password:"zhoumj"},
"jinancc":{region:"济南",password:"jinan0531"},
"qingdaocc":{region:"青岛",password:"qingdao0532"},
"zibocc":{region:"淄博",password:"zibo0533"},
"zaozhcc":{region:"枣庄",password:"zaozh0632"},
"dongyingcc":{region:"东营",password:"dongying0546"},
"yantaicc":{region:"烟台",password:"yantai0535"},
"weifangcc":{region:"潍坊",password:	"weifang0536"},
"jiningcc":{region:"济宁",password:"jining0537"},	
"taiancc":{region:"泰安",password:"taian0538"},		
"weihaicc":{region:"威海",password:"weihai0631"},
"rizhaocc":{region:"日照",password:"rizhao0633"},
"binzhoucc":{region:"滨州",password:"binzhou0543"},
"dezhoucc":{region:"德州",password:"dezhou0534"},
"liaochcc":{region:"聊城",password:"liaoch0635"},
"linyicc":{region:"临沂",password:"linyi0539"},		
"hezecc":{region:"菏泽",password:"heze0530"},
"laiwucc":{region:"莱芜",password:"laiwu0634"}
};


var uuid=1;


//这句很关键，没有它，POST解析就无法进行
app.use(express.bodyParser({}));
app.use('/', express.static(__dirname + '/'));

server.listen(8000);

app.get('/uuid', function (req, res) {
  uuid++;
  res.send(JSON.stringify(uuid));
});

app.get('/tasks', function (req, res) {
  res.send(JSON.stringify(tasks));
});

app.post('/task_add', function (req, res) {
	var uuid=req.body.uuid;
	var newTask=req.body.newTask;
  	tasks[uuid]=newTask;
  	tasks[uuid]._id=uuid;
  	//console.log(tasks);
});

app.post('/task_delete', function (req, res) {
	var del_item=req.body;

});

  // updateByID=function(_id,statu){

  //     $http.post('/updateByID',{_id:_id,statu:statu}).success(function(data) {

  //     });

  // };
app.post('/updateStatuByID', function (req, res) {
	var _id=req.body._id;
	var statu=req.body.statu;
	console.log(req.body);

	if (_id!=null || _id!=undefined) {
		tasks[_id].statu=statu;
	}else{
		console.log("not found~~");
	}

});

app.post('/verfy_user', function (req, res) {
	var usr=req.body.usr;
	var pass=req.body.pass;
	if(pass===users[usr].password){
		users[usr].lastLogin=Date.now();
		res.send({user:usr,region:users[usr].region,power:users[usr].power});
	}
});



