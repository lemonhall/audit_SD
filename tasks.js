function TasksCtrl($scope,$http) {
  
  var user_cookies={};
  var page_offset=5;
  if(sessionStorage["audit_SD"]){
    user_cookies=JSON.parse(sessionStorage["audit_SD"]);
    $scope.user=user_cookies.user;
  }else{
    window.location="/";
  }
 
  //更新某条目状态的内部辅助函数，由autitYes,deny来调用
  var updateStatuByID=function(_id,statu){

      $http.post('/updateStatuByID',{_id:_id,statu:statu}).success(function(data) {

      });

  };
  var updatePages=function(start){

      $http.post('/tasks_length/',{user_login:user_cookies.user}).
          success(function(data){
            var length=data;
            var _start=start||length;
                $scope.page_now=_start;
            var offset=page_offset;
            var pages_calc=Math.floor(length/offset);
            $scope.pages=[];
            for(var i=0;i<pages_calc;i++){
                var pageinfo={};
                    pageinfo.start=length-i*offset;
                    pageinfo.pageNumber=i+1;
                $scope.pages.push(pageinfo);
            }
          $http.post('/tasks',{start:_start,offset:offset,user_login:user_cookies.user}).
            success(function(data) {
                $scope.tasks = data;
          });//end of update $scope.tasks;
      });//end of post success
  };

  //分页查看，响应用户点击分页按钮
  $scope.loadPage=function(start){
    updatePages(start);
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
          $http.post('/task_add',{uuid:uuid,newTask:newTask,user_login:user_cookies.user}).
          success(function(data) {
              //最终其实还是使用了服务端验证，并返回记录并更新本地内存的方式
              //newTask只是一个初始化的模版
              $scope.tasks[uuid]=data;
          });

          $scope.userPhoneType = '';
          $scope.userActive='';
          $scope.tHeader='';
          $scope.tURL='';
          $scope.tDateTime='';
          $scope.tPriv=0;
        console.log("length:"+uuid);
    });//END of get uuid
    updatePages($scope.page_now);
  };//END of addSendPlan

  //删除任务
  $scope.delTask = function(_id) {
    if ($scope.tasks[_id].statu.audit==="info") {
      // $http.post('/task_delete',{_id:_id,user_login:user_cookies.user}).
      //   success(function(data) { 
      //       delete $scope.tasks[_id];
      // });
            alert("暂时不允许删除.....");
    }else{
            alert("已审核项目无法删除.....");
    }
  };

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

  //登出
  $scope.Logout = function() {
    sessionStorage["audit_SD"]="";
    window.location="/";
  };


  //数据的初始化
  //首先得到整个表的条目数量，取users[user_login].tasksList.length
  //然后根据每页面50，倒排得去服务器取数据
  //另外只能取该用户自身的数据，别人的数据他不应该能看到
  //当然power===admin的用户，就随便了
  updatePages();
}