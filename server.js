var express = require('express');
var app=express();
var server = require('http').createServer(app);


var tasks=[];
var users=[];
var uuid=0;

  var findbyID=function(_id){
      var returnVal=false;

      tasks.forEach(function(value,index){
          //console.log(value._id);
          if(value._id===_id){
            //console.log("ff:"+index);
            returnVal=index;
          }
        });
      return returnVal;
  };


var newTask={_id:0,userPhoneType:"Android",userActive:"活跃",tHeader:"啊哈哈哈",tURL:"http://papa.me",tDateTime:"2013/3/1",tPriv:9,statu:{audit:"info",icon:"icon-info-sign"},region:"省公司",tOperator:"zhoumj"};

	tasks.push(newTask);

//这句很关键，没有它，POST解析就无法进行
app.use(express.bodyParser({}));
app.use('/', express.static(__dirname + '/'));

server.listen(8000);

app.get('/uuid', function (req, res) {
  res.send(JSON.stringify(uuid));
});

app.get('/tasks', function (req, res) {
  res.send(JSON.stringify(tasks));
});

app.post('/task_add', function (req, res) {
	var newItem=req.body;
		uuid++;
		newItem._id=uuid;
  	tasks.push(newItem);
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
	var index=findbyID(_id);

	if (index!=false) {
		tasks[index].statu=statu;
	}else{
		console.log("not found~~");
	}

});



