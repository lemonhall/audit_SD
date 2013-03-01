function TasksCtrl($scope,$http) {
  
  //数据的初始化
  $http.get('/tasks').success(function(data) {
    $scope.tasks = data;
  });
 

  var findbyID=function(_id){
      var returnVal=false;

      angular.forEach($scope.tasks, function(value,index){
          //console.log(value._id);
          if(value._id===_id){
            //console.log("ff:"+index);
            returnVal=index;
          }
        });
      return returnVal;
  },
  updateStatuByID=function(_id,statu){

      $http.post('/updateStatuByID',{_id:_id,statu:statu}).success(function(data) {

      });

  };


  //增加一个计划
  $scope.addSendPlan = function() {
    console.log("Hello falsdkjflakjsdf");
    var uuid=0;
    $http.get('/uuid').success(function(data) {
        console.log(data);
        uuid = data;
        var newTask={_id:uuid+1,userPhoneType:$scope.userPhoneType,userActive:$scope.userActive,tHeader:$scope.tHeader,tURL:$scope.tURL,tDateTime:$scope.tDateTime,tPriv:$scope.tPriv,statu:{audit:"info",icon:"icon-info-sign"},region:"省公司",tOperator:"zhoumj"};

          $scope.tasks.push(newTask);

          $http.post('/task_add',newTask).success(function(data) {

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

    var index=findbyID(_id);
    //console.log(_id);
    //console.log(index);

    if(index!=false){
      $scope.tasks[index].statu={audit:"success",icon:"icon-ok"};
       updateStatuByID(_id,{audit:"success",icon:"icon-ok"});
      console.log(_id);

    }else{
      console.log("Not found~~");
    }
  };
  $scope.denyTask = function(_id) {
    alert("确认否决审核么？");

    var index=findbyID(_id);
    //console.log(_id);
    //console.log(index);

    if(index!=false){
      $scope.tasks[index].statu={audit:"error",icon:"icon-remove"};
      updateStatuByID(_id,{audit:"error",icon:"icon-remove"});
    }else{
      console.log("Not found~~");
    }
  };
}