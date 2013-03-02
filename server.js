var express = require('express');
var app=express();
var server = require('http').createServer(app);
var fs = require('fs');


var tasks={};
var users={
		"admin":{region:"God",power:"admin",password:"admin",taskLists:[]},
		"zhoumj":{region:"省公司",power:"admin",password:"zhoumj",taskLists:[]},
		"jinancc":{region:"济南",password:"jinan0531",taskLists:[]},
		"qingdaocc":{region:"青岛",password:"qingdao0532",taskLists:[]},
		"zibocc":{region:"淄博",password:"zibo0533",taskLists:[]},
		"zaozhcc":{region:"枣庄",password:"zaozh0632",taskLists:[]},
		"dongyingcc":{region:"东营",password:"dongying0546",taskLists:[]},
		"yantaicc":{region:"烟台",password:"yantai0535",taskLists:[]},
		"weifangcc":{region:"潍坊",password:	"weifang0536",taskLists:[]},
		"jiningcc":{region:"济宁",password:"jining0537",taskLists:[]},	
		"taiancc":{region:"泰安",password:"taian0538",taskLists:[]},		
		"weihaicc":{region:"威海",password:"weihai0631",taskLists:[]},
		"rizhaocc":{region:"日照",password:"rizhao0633",taskLists:[]},
		"binzhoucc":{region:"滨州",password:"binzhou0543",taskLists:[]},
		"dezhoucc":{region:"德州",password:"dezhou0534",taskLists:[]},
		"liaochcc":{region:"聊城",password:"liaoch0635",taskLists:[]},
		"linyicc":{region:"临沂",password:"linyi0539",taskLists:[]},		
		"hezecc":{region:"菏泽",password:"heze0530",taskLists:[]},
		"laiwucc":{region:"莱芜",password:"laiwu0634",taskLists:[]}
};


var uuid=0;
var usr_login="admin";


//记录操作日志的核心函数
var dbLog=function(log){
	console.log("数据库操作日志:"+log);
	fs.appendFile('dataOp.log', log+"\n", function (err) {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});
};
	


var syncTofs=function(){

	fs.writeFile('database.json', JSON.stringify(tasks), function (err) {
  		if (err) throw err;
  			console.log('It\'s saved!');
	});
},syncFromfs=function(){
	fs.readFile('database.json', function (err, data) {
  		if (err) throw err;
  		console.log(data);
  		tasks=JSON.parse(data);
	});
};

//这句很关键，没有它，POST解析就无法进行
app.use(express.bodyParser({}));
app.use('/', express.static(__dirname + '/'));

server.listen(8000);


//原子性操作，客户端取得某记录的唯一键值，自增的
app.get('/uuid', function (req, res) {
  uuid++;
  res.send(JSON.stringify(uuid));
});

//取得任务，需要添加认证，选择范围，以及取得某用户的记录的功能
app.post('/tasks', function (req, res) {
	var start=req.body.start;
	var offset=req.body.offset;

	var range_tasks={};
	var list_length=users[usr_login].taskLists.length;
	var index=0;

	for(var i=start;i>=start-offset;i--){
		index=users[usr_login].taskLists[i];
		range_tasks[index]=tasks[index];
	}

  res.send(JSON.stringify(range_tasks));
});

//增加一条任务
app.post('/task_add', function (req, res) {
	var uuid=req.body.uuid;
	var newTask=req.body.newTask;
  		tasks[uuid]=newTask;
  		tasks[uuid]._id=uuid;
  	dbLog("tasks["+uuid+"]="+JSON.stringify(newTask)+";");
  	dbLog("tasks["+uuid+"]._id="+uuid+";");

  	//如果用户不是超级用户，则同时要向admin用户的列表和普通用户的列表中同时添加值，以索引
  	if(users[usr_login].power!="admin"){
  		 users[usr_login].taskLists.push(uuid);
  		dbLog("users['"+usr_login+"'].taskLists.push("+uuid+");");
  		 //这里有bug
  		 users["admin"].taskLists.push(uuid);
  	}else{
  		dbLog("users['"+usr_login+"'].taskLists.push("+uuid+");");
  		users[usr_login].taskLists.push(uuid);
  	}
  	//console.log(tasks);
});


//删除某条未经审核的任务
app.post('/task_delete', function (req, res) {
	var del_item=req.body;

});

//更新某条的状态
app.post('/updateStatuByID', function (req, res) {
	var _id=req.body._id;
	var statu=req.body.statu;
	console.log(req.body);

	if (_id!=null || _id!=undefined) {
		tasks[_id].statu=statu;
		dbLog("tasks["+_id+"].statu="+JSON.stringify(statu)+";");
	}else{
		console.log("not found~~");
	}

});

//用户的认证问题
app.post('/verfy_user', function (req, res) {
	var usr=req.body.usr;
	var pass=req.body.pass;
	if(pass===users[usr].password){
		users[usr].lastLogin=Date.now();
		res.send({user:usr,region:users[usr].region,power:users[usr].power});
	}
});