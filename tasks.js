function TasksCtrl($scope) {
  $scope.tasks = [
    {statu:{audit:'success',icon:"icon-ok"},region:"济南",userPhoneType:'Android',tURL:"http://www.175game.com/news/20130227/26527.html",tHeader:"看门狗下定决心夺取主机游戏一哥称号",tOperator:"苏强",tDateTime:"2013/3/31",tPriv:9},
    {statu:{audit:'error',icon:"icon-remove"},region:"济南",tHeader:"Eink公司展出e-ink屏的智能手机，它到底好在哪？ | 36氪",tURL:"http://www.36kr.com/p/201603.html",userPhoneType:'Iphone',tDateTime:"2013/3/1",tPriv:9,tOperator:"苏强"},
    {statu:{audit:'info',icon:"icon-info-sign"},region:"济南",tHeader:"缺乏睡眠一周会改变数百基因表达",tURL:"http://www.solidot.org/story?sid=33607",userPhoneType:'Iphone',tDateTime:"2013/3/1",tPriv:9,tOperator:"苏强"}];
 
  $scope.addSendPlan = function() {
    console.log("Hello falsdkjflakjsdf");
    $scope.tasks.push({userPhoneType:$scope.userPhoneType,userActive:$scope.userActive,tHeader:$scope.tHeader,tURL:$scope.tURL,tDateTime:$scope.tDateTime,tPriv:$scope.tPriv,statu:{audit:"info",icon:"icon-info-sign"},region:"济南",tOperator:"苏强"});

    $scope.userPhoneType = '';
    $scope.userActive='';
    $scope.tHeader='';
    $scope.tURL='';
    $scope.tDateTime='';
    $scope.tPriv=0;
  };//END of addSendPlan

}