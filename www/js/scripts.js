/*
action="http://192.168.0.157:8081/insert"


$('#infoForm').submit(function() {

    var postTo = 'http://192.168.0.157:8081/process_post';
    $.post(postTo,({first_name: $('[name=first_name]').val(), last_name: $('[name=last_name]').val()}),'json');
    return false;

});
/*
function loadDoc() {
var value = $.get("http://192.168.0.157:8081/count", function(data, status){
        //alert("Data: " + JSON.stringify(data));
		document.getElementById("demo").innerHTML = JSON.stringify(data);
    });
}
*/
/*
$('#infoForm').submit(function() {

    var postTo = 'http://192.168.0.157:8081/insert';
    $.post(postTo,({first_name: $('[name=first_name]').val(), last_name: $('[name=last_name]').val()}),'json');
    return false;

});
$('#infoForm').submit(function() {

    var postTo = 'http://192.168.0.157:8081/login';
    $.post(postTo,({first_name: $('[name=first_name]').val(), last_name: $('[name=last_name]').val()}),'json');
    return false;

});
*/
var authed;
$('#get').click(function() {
$.get("http://192.168.0.157:8081/authed", function(data, status){
		if(data == true){	
			authed = true;
		}else{
			authed = false;
		}
    });
});
$('#getG').click(function() {
	$.get("http://192.168.0.157:8081/authed", function(data, status){
		if(data == true){	
			authed = true;
		}else{
			authed = false;
		}
    });
$.get("http://192.168.0.157:8081/getGroups", function(data, status){
        //alert("Data: " + JSON.stringify(data));
		//if(data != ""){
		//var dat = JSON.stringify(data);
		var dat = JSON.parse(data);
			//alert(JSON.stringify(dat));
			var ul = document.getElementById("list");
			var li = document.createElement("li");
			var li2 = document.createElement("li");
			li.appendChild(document.createTextNode(JSON.stringify(dat[0])));
			ul.appendChild(li);
			li2.appendChild(document.createTextNode(JSON.stringify(dat[1])));
			ul.appendChild(li2);
		//}else{
		//	document.getElementById('demo').innerHTML = "NO!";
		//}
    });
});