//main page
var authenticated;

$('#btn-submit').click(function() {

    $.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/login',
        data: ({ txt_email: $('#txt-email').val(), txt_password: $('#txt-password').val() }),
        dataType: "json",
        async: false,
        success: function(data) {
            if (data === true) {
                alert("Succesfully logined");
                window.location.href = "groups-body.html";
                data = false;
            } else {
                alert("Permission denied");
            }
        },
        error: function() {
            alert("Permission denied");
        }
    });
});
$('#btn-submit1').click(function() {

    $.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/register',
        data: ({ txt_email: $('#txt-email').val(), txt_password: $('#txt-password').val() }),
        dataType: "json",
        async: false,
        success: function(data) {
			alert("created");
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
$('#create-group').click(function() {
    var groupName = prompt("Provide group name: ");
    $.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/createGroup',
        data: ({ group_name: groupName }),
        dataType: "json",
        async: false,
    });
    location.reload();
});

$('#btn-logout').click(function() {
    $.ajax({
        type: "POST",
        url: 'http://192.168.0.157:8081/logout',
        data: ({ x: "" }),
        dataType: "json",
        async: false,
        success: function(data) {
            if (data == true) {

            }
        }
    });
    window.location.href = "index.html";
    //location.reload();
});

function lists(){
	var id;
	
	 
		$.post('http://192.168.0.157:8081/list', function(data, status) {
			var last = data[data.length - 1];
			id = last;
			//alert(id);
			
			
			
			$.post('http://192.168.0.157:8081/listLists', {userId:id} ,function(data, status) {
				
				for (var i = 0; i < data.length; i++) {
					var nextId = i;
					nextId++;
					//alert(data[i].list_name);
					var content = "<div data-role='collapsible' data-theme='a' data-content-theme='a' id='group" + nextId + "'>" +
                "<h2>" + data[i].list_name + "</h2>" +
                "<ul data-role='listview' data-inset='true' id='appendib"+i+"'>" +
				"<span id='lists"+i+"'></span>"+
                "</ul>" +
                //"<ul data-role='listview' data-inset='true'>" + "</ul>" +
				"<div type='text' name='txt-item' id='txt-item"+i+"' value=''></div>"+"<br>"+
				"<div class='ui-grid-a'>" + "<div class='ui-block-a'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-b ui-corner-all ui-icon-plus ui-btn-icon-left ui-mini btn-item-add' id=" + data[i].list_name + " href='#'>Add item</a>" + "</div>" +
                 "<div class='ui-block-b'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini btn-item-del' id=" + data[i].list_name + " href='#'>Delete item</a>" + "</div>" +
				"<div class='ui-block-b'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini btn-delete-list' id='" + data[i].list_name + "' href='#'>Delete list</a>" + "</div>"+
				"<a class='ui-btn ui-btn-inline ui-btn-a ui-corner-all btn-add-togroup' id='" + data[i].list_name + "' href='#'>Add to group</a>"+
                "</div>"
				var count3 = 0;
				var datCount3 = 0;
				//var lis = data[i].list_name;
				$.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/listItems',
						data: ({list_name: data[i].list_name}),
						dataType: "json",
						async: true,
						success: function(data){
							//location.reload();
							if(data != "undefined"){
									var dat = data.length;
									while(dat > 0){
										//var dd = JSON.stringify(data).split(":");
										//alert(datCount);
										//alert(data[dat-1].item);
										document.getElementById('txt-item'+count3).innerHTML += data[dat-1].item+ "<br>";
										dat--;
										datCount3++;
									}
									count3++;
									datCount3 = 0;
								
							}else{
									document.getElementById('txt-item'+count3).innerHTML = "" + "<br>";
							}
						}
			});
				$("#setList").append(content).collapsibleset('refresh');
				
				}
				
				$('.btn-item-add').click(function(){
					var item = prompt();
					$.ajax({
					
						type: "POST",
						url: 'http://192.168.0.157:8081/itemAdd',
						data: ({list_name: this.id, item_name: item}),
						dataType: "json",
						async: true,
						success: function(data){
							location.reload();
						}
					
					})
				
				});
				$('.btn-add-togroup').click(function(){
					var group = prompt();
					$.ajax({
					
						type: "POST",
						url: 'http://192.168.0.157:8081/addToGroup',
						data: ({list_name: this.id, group_name: group}),
						dataType: "json",
						async: true,
						success: function(data){
							//location.reload();
						}
					
					})
				
				});
				$('.btn-item-del').click(function(){
					var item = prompt();
					$.ajax({
					
						type: "POST",
						url: 'http://192.168.0.157:8081/itemDel',
						data: ({list_name: this.id, item_name: item}),
						dataType: "json",
						async: true,
						success: function(data){
							location.reload();
						}
					
					})
				
				})
				
				$('.btn-delete-list').click(function(){
					$.ajax({
					
						type: "POST",
						url: 'http://192.168.0.157:8081/deleteList',
						data: ({list_name: this.id}),
						dataType: "json",
						async: true,
						success: function(data){
							location.reload();
						}
					
					})
				
				})
				
			});
			
		
		});
}
		
		$('.btn-add-list').click(function(){
			var list = prompt();
			 $.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/createList',
						data: ({list_name: list}),
						dataType: "json",
						async: true,
						success: function(data){
							location.reload();
						}
			});
		
		});
		
		



//groups
function groups() {

    $.post('http://192.168.0.157:8081/list', function(data, status) {



        for (var i = 0; i < data.length - 1; i++) {


            var nextId = i;
            nextId++;
            var content = "<div data-role='collapsible' data-theme='a' data-content-theme='a' id='group" + nextId + "'>" +
                "<h2>" + data[i] + "</h2>" +
                "<ul data-role='listview' data-inset='true' id='appendib"+i+"'>" +
                "<h3>users:</h3>" +
				"<span id='users"+i+"'></span>"+
                "</ul>" +
				"<ul data-role='listview' data-inset='true' id='appendib"+i+"'>" +
                "<h3>lists:</h3>" +
				"<span id='lists"+i+"'></span>"+
                "</ul>" +
                "<div class='ui-grid-a'>" + "<div class='ui-block-a'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-b ui-corner-all ui-icon-plus ui-btn-icon-left ui-mini btn-add-user' id=" + data[i] + " href='#'>Add User</a>" + "</div>" +
                "<div class='ui-block-b'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini btn-usr-del' id=" + data[i] + " href='#'>Delete user</a>" + "</div>" +
                "<br />" + "<div class='ui-block-a'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-b ui-corner-all ui-icon-plus ui-btn-icon-left ui-mini btn-add-list' id='" + data[i] + "' href='#'>Create list</a>" + "</div>" +
                "<div class='ui-block-b'>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right ui-mini btn-delete' id='" + data[i] + "' href='#'>Delete group</a>" + "</div>" +
                "</div>" + "</div>"
			var count = 0;
			var datCount = 0;
            $.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/listUsers',
						data: ({group_name: data[i]}),
						dataType: "json",
						async: true,
						success: function(data){
							if(data != ""){
									var dat = data.length;
									while(dat > 0){
										//var dd = JSON.stringify(data).split(":");
										//alert(datCount);
										document.getElementById('users'+count).innerHTML += data[dat-1].email + "<br>";
										dat--;
										datCount++;
									}
									count++;
									datCount = 0;
								
							}
						}
			});
			var count2 = 0;
			var datCount2 = 0;
			//var datCount = 0;
			$.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/listListsGroups',
						data: ({group_name: data[i]}),
						dataType: "json",
						async: true,
						success: function(data){
							
							if(data != "undefined"){
									var dat = data.length;
									while(dat > 0){
										//var dd = JSON.stringify(data).split(":");
										//alert(datCount);
										document.getElementById('lists'+count2).innerHTML += data[dat-1].list_name + "<br>";
										dat--;
										datCount++;
									}
									count2++;
									datCount2 = 0;
								
							}else{
									document.getElementById('lists'+count2).innerHTML = "" + "<br>";
							}
							
							/*if(data != '')
							var value = JSON.stringify(data[0].list_name)
							else
							var value = "";
							
							alert(value);
									//var dat = data.length;
									//while(dat > 0){
										//var dd = JSON.stringify(data).split(":");
										document.getElementById('lists'+count2).innerHTML += value + "<br>";
										count2++;
										//dat--;
									//	datCount++;
									//}
									//count++;
									//datCount = 0;
								
							//}
							*/
							}
			});
            $("#set").append(content).collapsibleset('refresh');
        };
		
		
		
		$('.btn-usr-del').click(function(){
			var email = prompt();
			 $.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/delUser',
						data: ({user_del: email, group_id: this.id}),
						dataType: "json",
						async: true,
						success: function(data){
							location.reload();
						}
			});
		
		})
		/*
		$('.btn-add-list').click(function(){
			var list = prompt();
			 $.ajax({
						type: "POST",
						url: 'http://192.168.0.157:8081/createList',
						data: ({group_name: this.id, list_name: list}),
						dataType: "json",
						async: true,
						success: function(data){
							location.reload();
						}
			});
		
		})
		*/
		
        $('.btn-delete').click(function() {
            alert((this.id));

            $.ajax({
                type: "POST",
                url: 'http://192.168.0.157:8081/groupDelete',
                data: ({ group_name: this.id }),
                dataType: "json",
                async: false,
                success: function(data) {
                    if (data == true) {
                        location.reload();
                    }
                }
            });
        });
        $('.btn-add-user').click(function() {
            var email = prompt();
			if(email != ""){
            $.ajax({
                type: "POST",
                url: 'http://192.168.0.157:8081/addUser',
                data: ({ group_n: this.id, useremail: email }),
                dataType: "json",
                async: false,
                success: function(data) {
                    if (data == true) {
                        location.reload();
                    }
                }
            });}
        });
    });

}
