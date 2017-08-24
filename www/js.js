var ipaddr = 'http://192.168.0.102:8081';

//Add logined user id to local storage

if(localStorage.email === undefined || localStorage.email == ''){
localStorage.email = prompt("Provide user email:");

$.ajax({
	url: ipaddr + '/getId',
	type: 'POST',
	async: false,
	data: {"email" : localStorage.email},
	success: function(data){
		localStorage.id = data[0];
	},
	error: function(e){//alert(e.message)
	}
});
}


//Main page:
//list groups
//button delete for each group, 
//users for each group + button delete each user separetely
//button add user to each group
//button add list to each group
$.ajax({
	url: ipaddr + '/listgroups',
	type: 'POST',
	data: {"id" : localStorage.id},
	async: true,
	success: function(data){
		for (var i = 0; i < data.length / 2; i++) {
            var nextId = i;
            nextId++;
            var content = "<div data-role='collapsible' data-theme='a' data-content-theme='a' id='group" + nextId + "'>" +
                "<h2>" + data[i] + "</h2>" +
                "<ul data-role='listview' data-inset='true' id='appendib"+i+"'>" +
                "<h3>users:</h3>" +
				"<span id='users"+i+"'/>"+
                "</ul>" +
				"<ul data-role='listview' data-inset='true' id='appendib"+i+"'>" +
                "<h3>lists:</h3>" +
				"<span id='lists"+i+"'/>"+
                "</ul>" +
                "<div class='ui-grid-a'>" + "<div class='ui-block-a'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-b ui-corner-all ui-icon-plus ui-btn-icon-left ui-mini btn-add-user' id=" + data[i] + " data-group=" + data[i + (data.length / 2)] + " href='#'>Add User</a>" + "</div>" +
                "<div class='ui-block-b'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini btn-usr-del' id=" + data[i] + " data-group=" + data[i + (data.length / 2)] + " href='#'>Delete user</a>" + "</div>" +
                "<br />" + "<div class='ui-block-a'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-b ui-corner-all ui-icon-plus ui-btn-icon-left ui-mini btn-add-list' id='" + data[i] + "' data-group=" + data[i + (data.length / 2)] + " href='#'>Create list</a>" + "</div>" +
                "<div class='ui-block-b'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini btn-delete' id='" + data[i] + "' data-group=" + data[i + (data.length / 2)] + " href='#'>Delete group</a>" + "</div>" +
                "</div>" + "</div>";
			$("#setGroup").append(content).collapsibleset('refresh');

		$('.btn-delete').click(function() {
		//alert($(this).attr("data-group"));
			$.ajax({
				url: ipaddr + '/deleteGroup',
				type: 'POST',
				async: false,
				data: {"groupName" : this.id, "id" : localStorage.id, "group_id" : $(this).attr("data-group")},
				success: function(data){

				},
				error: function(e){alert(e.message)}
			});
			location.reload();
		});
/*
		LIST USERS
*/		
		var count = 0;
		var datCount = 0;
		var group_id = data[i + (data.length / 2)];
		//alert(group_id);
		$.ajax({
						type: "POST",
						url: ipaddr + '/listUsers',
						data: ({group_id: data[i + (data.length / 2)]}),
						async: true,
						success: function(data){
							if(data != ""){
									var dat = data.length;
									while(dat > 0){

										document.getElementById('users'+count).innerHTML += data[dat-1].email + "";
										//document.getElementById('users'+count).setAttribute("style", "color: blue;");
										var btn = document.createElement('a');
										btn.setAttribute("class", "ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini user_id");
										//.setAttribute("id", "user_id"+count); // INSERT ID USER HERE
										btn.setAttribute("data-user_id", data[dat-1].id);
										btn.setAttribute("data-group_id", group_id);
										document.getElementById('users'+count).append(btn);
										document.getElementById('users'+count).innerHTML += "<br>";
										dat--;
										datCount++;
									}
									count++;
									datCount = 0;



							}
							
						/*
							DELETE USER
						*/
							
							$('.user_id').click(function() {
									//alert($(this).attr('data-user_id'));
									$.ajax({
										url: ipaddr + '/deleteUser',
										type: 'POST',
										async: false,
										data: {"user_id" : $(this).attr('data-user_id'), "group_id" : $(this).attr('data-group_id')},
										success: function(data){

										},
										error: function(e){alert(e.message)}
									});
									location.reload();
							});
						}

		});

			var count2 = 0;
			var datCount2 = 0;
			//var datCount = 0;
			$.ajax({
						type: "POST",
						url: ipaddr+'/listListsGroups',
						data: ({group_id: group_id}),
						dataType: "json",
						async: true,
						success: function(data){
									if(data != "undefined" && data != ""){
									var dat = data.length;
									while(dat > 0){
										document.getElementById('lists'+count2).innerHTML += data[dat-1].list_name + "<br>";
										dat--;
										datCount++;
									}
									count2++;
									datCount2 = 0;

									}else{
										document.getElementById('lists'+count2).innerHTML = "" + "<br>";
									}
						}
			});



		$('.btn-add-user').click(function() {
		var userEmail = prompt("Enter the user email: ");
			$.ajax({
				url: ipaddr + '/addUser',
				type: 'POST',
				async: false,
				data: {"groupName" : this.id, "id" : localStorage.id, "userEmail" : userEmail},
				success: function(data){

				},
				error: function(e){alert(e.message)}
			});
			location.reload();
		});

		$('.btn-add-list').click(function() {
		var list_name = prompt("Enter the list name: ");
			$.ajax({
				url: ipaddr + '/addList',
				type: 'POST',
				async: false,
				data: {"list_name" : list_name, "group_id" : $(this).attr('data-group')},
				success: function(data){

				},
				error: function(e){alert(e.message)}
			});
			location.reload();
		});

		}
	},
	error: function(e){
	 alert(e.message);
	}
});


//Button create group

$('#create-group').click(function() {

var groupName = prompt("Enter the group name: ");
if(groupName == ""){
	alert("Field cannot be empty!");
}else{
	$.ajax({
	url: ipaddr + '/createGroup',
	type: 'POST',
	async: false,
	data: {"groupName" : groupName, "id" : localStorage.id},
	success: function(data){

	},
	error: function(e){alert(e.message)}
});
location.reload();
}});

//Button logout

$("#btn-logout").click(function() {

	localStorage.clear();
	location.reload();

})


//localStorage.clear();