function TasksCtrl($scope,$http) {
  
  //数据的初始化
  $http.get('/tasks').success(function(data) {
    $scope.tasks = data;
  });
 

  var updateStatuByID=function(_id,statu){

      $http.post('/updateStatuByID',{_id:_id,statu:statu}).success(function(data) {

      });

  };


  //增加一个计划
  $scope.addSendPlan = function() {
    console.log("Hello falsdkjflakjsdf");
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
    });//END of get uuid
    
  };//END of addSendPlan

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