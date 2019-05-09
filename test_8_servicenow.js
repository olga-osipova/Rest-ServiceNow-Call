var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {  

$scope.user = {};
$scope.disabled = false;


$scope.fetch = function() {
	

//ServiceNow Javascript REST request example

/*var requestBody = ""; 

var client=new XMLHttpRequest();
client.open("get","https://dev51175.service-now.com/api/now/table/sys_user?sysparm_limit=10");

client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');

//Eg. UserName="admin", Password="admin" for this code sample.
client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'admin'));

client.onreadystatechange = function() { 
	if(this.readyState == this.DONE) {
		console.log(this.status + this.response); 
	}
}; 
client.send(requestBody);*/


//JSONv2 url example	
	
//var instance_url = 'http://dev51175.service-now.com/sys_user.do?JSONv2&sysparm_action=getRecords&sysparm_query=active=true'	


	var instance_url = "https://dev51175.service-now.com/api/now/table/sys_user?sysparm_limit=10&sysparm_query=user_name!=admin^ORDERBYDESCsys_updated_on";
	
	$http({
        url: instance_url,
        method: 'GET' ,
		headers: {
		'Authorization': 'Basic '+btoa('admin'+':'+'admin'),
        'Accept':  'application/json',
    	'Content-Type': 'application/json'
		}
        
    }).then(function (httpResponse) {
		
        console.log('response:', httpResponse);
		
		if (httpResponse.data.result) {
		
		var data = httpResponse.data.result;
		
		$scope.users = data;		
		$scope.user_options = Object.keys(data[0]);
		console.log($scope.user_options);
		}
		
    })
   }
   
   
 $scope.add = function() {
	   
	$("#myModal").modal();   	   
	   
   }
   
$scope.addUser = function() {
	
	$scope.disabled = true;  
	console.log($scope.user);	
	
		var check = true;
	
	if ( (Object.keys($scope.user)).length!= 4 ) {
			check = false;
		}
	

    if (check) {
	
	$http({
        url: 'https://dev51175.service-now.com/api/now/table/sys_user',
        method: 'POST' ,
        data    : $scope.user,
        headers: {
		'Authorization': 'Basic '+btoa('admin'+':'+'admin'),
        'Accept':  'application/json',
    	'Content-Type': 'application/json'
		} 		
    }).then(function (httpResponse) {
		
		$scope.user = {};
		
        console.log('Success response:', httpResponse);	

        var data = httpResponse.data.result;
		
    if (data.sys_id ) {
	
	$scope.message = 'User with SysID ' + data.sys_id + ' has been inserted';
	$scope.fetch();
				
    }
	
	$scope.disabled  = false;
	},
	
	function (httpResponse) {
		
        console.log('Error response:', httpResponse);	
		
		$scope.message = 'Error occurred while inserting';
		$scope.disabled  = false;		
    }
	)	
	   
   }
   
else {
	$scope.disabled  = false;
	$scope.message = 'All of the fields should be filled in';
}

}   	
	


$scope.change = function(user) {
	
	$scope.changeUser = angular.copy(user);
	$("#myChangeModal").modal();  	
	
}

$scope.sendUserData = function() {
	
	console.log($scope.changeUser);
	
	
	$scope.disabled = true;  
	var check = true;
	
			var keys = 	['first_name', 'last_name', 'user_name','email'];
			
			for (var i=0; i < keys.length; i++) {
			
			var key = keys[i];
			console.log($scope.changeUser[key]);
			
			if (!$scope.changeUser[key]) {
				console.log('Invalid option: ' +  keys[i]);
			    check = false;	
			}			
		    }
	

    if (check) {
		
	$scope.new_user_data = {};
	
	$scope.new_user_data.name = $scope.changeUser.name;
	$scope.new_user_data.user_name = $scope.changeUser.user_name;
	$scope.new_user_data.email = $scope.changeUser.email;
	
	
	var sys_id = $scope.changeUser.sys_id;
	
	$http({
        url: 'https://dev51175.service-now.com/api/now/table/sys_user/' + sys_id,
        method: 'PATCH' ,
        data    : $scope.new_user_data,
        headers: {
		'Authorization': 'Basic '+btoa('admin'+':'+'admin'),
        'Accept':  'application/json',
    	'Content-Type': 'application/json'
		}  		
    }).then(function (httpResponse) {
		
				
        console.log('Success response:', httpResponse);	

    var data = httpResponse.data.result;
		
    if (data.sys_id ) {
	
	$scope.message = 'User with SysID ' + data.sys_id + ' has been updated';
	$scope.fetch();
				
    }
				
    $scope.disabled  = false;
	},
	
	function (httpResponse) {
		
        console.log('Error response:', httpResponse);	
		
		$scope.message = 'Error occurred while updating';
		$scope.disabled  = false;		
    }
	)	
	   
   }
   
else {
	$scope.disabled  = false;
	$scope.message = 'All of the fields should be filled in';
}
	
}



$scope.delete = function(user) {
	$scope.deleteUser = angular.copy(user);
	$("#myDeleteModal").modal();  	
	
}


$scope.removeUser = function() {
	
	console.log($scope.deleteUser);
	$scope.dis = true;
	var sys_id = $scope.deleteUser.sys_id;
	
	$http({
        url: 'https://dev51175.service-now.com/api/now/table/sys_user/' + sys_id,
        method: 'DELETE' ,
        headers: {
		'Authorization': 'Basic '+btoa('admin'+':'+'admin'),
        'Accept':  'application/json',
    	'Content-Type': 'application/json'
		} 		
    }).then(function (httpResponse) {
		
				
        console.log('Success response:', httpResponse);	
	
	    $scope.message = 'User has been deleted';
	    $scope.fetch();
				
    },
	
	function (httpResponse) {
		
        console.log('Error response:', httpResponse);	
		
		$scope.message = 'Error occurred while deleting';
		$scope.dis  = false;		
    }
	)	
	   
   }
   


$('#myModal').on('hidden.bs.modal', function (e) {
  $scope.message = '';
  $scope.disable  = false;
  $scope.dis  = false;
})

$('#myChangeModal').on('hidden.bs.modal', function (e) {
  $scope.message = '';
  $scope.disable  = false;
  $scope.dis  = false;
})

$('#myDeleteModal').on('hidden.bs.modal', function (e) {
  $scope.message = '';
  $scope.disable  = false;
  $scope.dis  = false;
})  
   
   
});	
	




	
