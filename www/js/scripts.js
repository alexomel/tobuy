//main page
var authenticated;
$('#btn-submit').click(function(){
	
	
	//$.post('http://192.168.0.157:8081/login', ({txt_email: $('[name=txt-email]').val(), txt_password: $('[name=txt-password]').val()}), true, 'json');
	$.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/login',
        data: ({txt_email: $('#txt-email').val(), txt_password: $('#txt-password').val()}),
        dataType: "json",
		async: false,
        success: function(data) {
            if (data == true){
				alert(data);
				window.location.href = "groups-body.html";
				data = false;
			}else{
				alert("Permission denied");
			}
        }
    });
	/*
	$.post('http://192.168.0.157:8081/check', function(data, status){
		//alert(data);
		authenticated = data;
		if (authenticated == true){
			window.location.href = "groups-body.html";
		}
	});*/
	//$('#login-form')[0].reset();
	/*
	$.get("http://192.168.0.157:8081/login", function(data, status){
        authenticated = data;
		if (authenticated == true){
			window.location.href = "groups-body.html";
		}
    });
	*/
});

//groups
function groups(){
	
			$.post('http://192.168.0.157:8081/list', function(data, status){
			
				//alert(data.length);
				for(var i=0; i<data.length; i++){
					var node = document.createElement("li");
					var link = document.createElement("a"); 
					var textnode = document.createTextNode(data[i]);
					link.appendChild(textnode);
					link.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
					node.appendChild(link);
					document.getElementById("group-list").appendChild(node);
				}
			});
}