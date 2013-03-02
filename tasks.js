function TasksCtrl($scope,$http) {
  
  //数据的初始化
  //首先得到整个表的条目数量，取uuid
  //然后根据每页面50，倒排得去服务器取数据
  //另外只能取该用户自身的数据，别人的数据他不应该能看到
  //当然power===admin的用户，就随便了
  $http.post('/tasks',{start:2,offset:5}).success(function(data) {
      $scope.tasks = data;
  });
 
  //更新某条目状态的内部辅助函数，由autitYes,deny来调用
  var updateStatuByID=function(_id,statu){

      $http.post('/updateStatuByID',{_id:_id,statu:statu}).success(function(data) {

      });

  };


  //增加一个计划
  $scope.addSendPlan = function() {
    console.log("Hello falsdkjflakjsdf");
    //首先向服务器取得uuid，而后加入信息条目
    $http.get('/uuid').success(function(data) {
        console.log(data);
        uuid = data;
        var newTask={userPhoneType:$scope.userPhoneType,userActive:$scope.userActive,tHeader:$scope.tHeader,tURL:$scope.tURL,tDateTime:$scope.tDateTime,tPriv:$scope.tPriv,statu:{audit:"info",icon:"icon-info-sign"},region:"省公司",tOperator:"zhoumj"};

          //更改客户端内存中的数值
          $scope.tasks[uuid]=newTask;
          $scope.tasks[uuid]._id=uuid;

          //更改服务器端的数值
          $http.post('/task_add',{uuid:uuid,newTask:newTask}).
          success(function(data) {

          });

          $scope.userPhoneType = '';
          $scope.userActive='';
          $scope.tHeader='';
          $scope.tURL='';
          $scope.tDateTime='';
          $scope.tPriv=0;
        console.log("length:"+uuid);
    });//END of get uuid
    
  };//END of addSendPlan

  //审核通过
  $scope.auditTask = function(_id) {
    alert("确认审核通过么？");
    console.log(_id);
    if(_id!=null || _id!=undefined){
      $scope.tasks[_id].statu={audit:"success",icon:"icon-ok"};
       updateStatuByID(_id,{audit:"success",icon:"icon-ok"});
      console.log(_id);

    }else{
      console.log("Not found~~");
    }
  };

  //否决该审核
  $scope.denyTask = function(_id) {
    alert("确认否决审核么？");

    if(_id!=null || _id!=undefined){
      $scope.tasks[_id].statu={audit:"error",icon:"icon-remove"};
      updateStatuByID(_id,{audit:"error",icon:"icon-remove"});
    }else{
      console.log("Not found~~");
    }
  };
}