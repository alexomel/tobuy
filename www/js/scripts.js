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
        async: true,
        success: function(data) {

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
    window.location.href = "sign-in.html";
    //location.reload();
});

//groups
function groups() {

    $.post('http://192.168.0.157:8081/list', function(data, status) {



        for (var i = 0; i < data.length - 1; i++) {


            var nextId = i;
            nextId++;
            var content = "<div data-role='collapsible' data-theme='b' data-content-theme='b' id='group" + nextId + "'>" +
                "<h2>" + data[i] + "</h2>" +
                "<ul data-role='listview' data-inset='true' id='appendib"+i+"'>" +
                "<h3>users:</h3>" +
				"<span id='users"+i+"'></span>"+
                "</ul>" +
                "<ul data-role='listview' data-inset='true'>" + "</ul>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right btn-usr-del' id="+data[i]+" href='#'>Delete</a>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-plus ui-btn-icon-right btn-add-user' id=" + data[i] + " href='#'>Add</a>" +
				"<a class='ui-btn ui-icon-plus ui-btn-icon-left ui-corner-all ui-shadow btn-add-list' id='" + data[i] + "' href='#'>Create List</a>" +
                "<a class='ui-btn ui-icon-minus ui-btn-icon-left ui-corner-all ui-shadow btn-delete' id='" + data[i] + "' href='#'>Delete group</a>" +
                "</div>"
			var count = 0;
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
										document.getElementById('users'+count).innerHTML = JSON.stringify(data);
										dat--;							
									}
									count++;
									
								
							}
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
							
						}
			});
		
		})
		
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
            });
        });
    });

}
