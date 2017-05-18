//main page
var authenticated;
$('#btn-submit').click(function(){
	
	$.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/login',
        data: ({txt_email: $('#txt-email').val(), txt_password: $('#txt-password').val()}),
        dataType: "json",
		async: false,
        success: function(data) {
            if (data === true){
				alert("Succesfully logined");
				window.location.href = "groups-body.html";
				data = false;
			}else{
				alert("Permission denied");
			}
        },
		error: function(){
			alert("Permission denied");
		}
    });
});
$('#btn-submit1').click(function(){
	
	$.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/register',
        data: ({txt_email: $('#txt-email').val(), txt_password: $('#txt-password').val()}),
        dataType: "json",
		async: true,
		success: function(data){
			
		}
		/*,
        success: function(data) {
            if (data === true){
				alert("Succesfully logined");
				window.location.href = "groups-body.html";
				data = false;
			}else{
				alert("Permission denied");
			}
        },
		error: function(){
			alert("Permission denied");
		} */
    });
});
$('#create-group').click(function(){
	var groupName = prompt("Provide group name: ");
	$.ajax({
		type: "POST",
		url: 'http://192.168.0.157:8081/createGroup',
		data: ({group_name: groupName}),
        dataType: "json",
		async: false,
});
location.reload();
});

$('#btn-logout').click(function(){
	$.ajax({
		type: "POST",
		url: 'http://192.168.0.157:8081/logout',
		data: ({x: ""}),
        dataType: "json",
		async: false,
		success: function(data){
			if(data == true){
				
			}
		}
});
window.location.href = "sign-in.html";
//location.reload();
});

//groups
function groups(){
	
			$.post('http://192.168.0.157:8081/list', function(data, status){
			
				//alert(data.length);
				for(var i=0; i<data.length; i++){
					var node = document.createElement("li");
					var link = document.createElement("a"); 
					var textnode = document.createTextNode(data[i]);
					
					var del = document.createElement("button");
					var deltext = document.createTextNode("delete");
					del.appendChild(deltext);
					del.id = "btn-delete" + i;
					del.className = "ui-btn btn-delete ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-corner-all";
					del.value = data[i];
					
					var addUser = document.createElement("button");
					var addUserText = document.createTextNode("Add user");
					addUser.appendChild(addUserText);
					addUser.id = "add-user" + i;
					addUser.className = "btn-add-user ui-btn ui-btn-inline";
					addUser.value = data[i];
					
					link.appendChild(textnode);
					link.className = "ui-btn ui-btn-icon-right ui-icon-bars";
					node.appendChild(link);
					node.appendChild(del);
					node.appendChild(addUser);
					document.getElementById("group-list").appendChild(node);
				}
				$('.btn-delete').click(function(){
					//alert(this.id);
					
					$.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/groupDelete',
						data: ({group_name: $('#' + this.id).val()}),
						dataType: "json",
						async: false,
						success: function(data){
							if(data == true){
								location.reload();
							}
						}
					});
				});
				$('.btn-add-user').click(function(){
					var email = prompt();
					$.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/addUser',
						data: ({group_n: $('#' + this.id).val(), useremail: email}),
						dataType: "json",
						async: false,
						success: function(data){
							if(data == true){
								location.reload();
							}
						}
					});
				});
			});
			
}
