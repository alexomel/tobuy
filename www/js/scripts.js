var authenticated = false;

$('#btn-submit').click(function(){
	$.post('http://192.168.0.157:8081/login', ({txt_email: $('[name=txt-email]').val(), txt_password: $('[name=txt-password]').val()}), 'json');
	$('#login-form')[0].reset();

	$.get("http://192.168.0.157:8081/login", function(data, status){
        authenticated = data;		
    });
	if (authenticated == true){
			$.get("groups-body.html", function(data){ 
				$(document).load(data);
			});
		}else{
			window.location.href = "groups-body.html"
	}
});