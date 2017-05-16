//main page
var authenticated = false;
$('#btn-submit').click(function(){
	$.post('http://192.168.0.157:8081/login', ({txt_email: $('[name=txt-email]').val(), txt_password: $('[name=txt-password]').val()}), 'json');
	$('#login-form')[0].reset();

	$.get("http://192.168.0.157:8081/login", function(data, status){
        authenticated = data;		
    });
	if (authenticated == true){
			window.location.href = "groups-body.html"
		}else{
			window.location.href = "groups-body.html"
	}
});

//groups
function groups(){
	$.get("http://192.168.0.157:8081/login", function(data, status){
        authenticated = data;
    });
	
	if (authenticated == false){
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
}