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
                "<ul data-role='listview' data-inset='true' id='users'>" +
                "<h3>users:</h3>" +
                "</ul>" +
                "<ul data-role='listview' data-inset='true'>" + "</ul>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-delete ui-btn-icon-right' href='#'>Delete</a>" +
                "<a class='ui-btn ui-btn-inline ui-btn-c ui-corner-all ui-icon-plus ui-btn-icon-right btn-add-user' id=" + data[i] + " href='#'>Add</a>" +
                "<a class='ui-btn ui-icon-minus ui-btn-icon-left ui-corner-all ui-shadow btn-delete' id=" + data[i] + " href='#'>Delete group</a>" +
                "</div>"

            $.ajax({
                type: "POST",
                url: 'http://192.168.0.157:8081/listUsers',
                data: ({ group_name: data[i] }),
                dataType: "json",
                async: true,
                success: function(data) {
                    if (data == true) {
                        //location.reload();
                    }
                }
            });

            $("#set").append(content).collapsibleset('refresh');
        };



        //$("#set").append ("#group-list");
        /*
        					
                            
                            <div id="popupDialog" style="max-width:400px;" data-role="popup" data-theme="a" data-overlay-theme="a" data-dismissible="false">
                                <div data-role="header" data-theme="c">
                                    <h1>Delete User?</h1>
                                </div>
                                <div class="ui-content" role="main">
                                    <h3 class="ui-title">Are you sure you want to delete this user?</h3>
                                    <p>This action cannot be undone.</p>
                                    <a class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a" href="#" data-rel="back">Cancel</a>
                                    <a class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" href="#" data-rel="back" data-transition="flow">Delete</a>
                                </div>
                            </div><br>
                            <li><a class="ui-btn ui-btn-c ui-corner-all ui-icon-plus ui-btn-icon-right" href="#">Add</a></li>
                        </ul>
                    </div>
        					
        					
        				*/



        /*
        var node = document.createElement("li");
        var groupHead = document.createElement("h2");
        var link = document.createElement("ul"); 
        var box = document.createElement("div");
        var textnode = document.createTextNode(data[i]);
        //link.className = "";
        //link.setAttribute('data-role', 'listview');
        //link.setAttribute('data-inset', 'true');
					
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
					
        groupHead.appendChild(textnode);
        box.appendChild(groupHead);
        box.appendChild(link);
        node.appendChild(del);
        node.appendChild(addUser);
        node.setAttribute('data-icon', 'false');
        link.appendChild(node);


        //box.className = "ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content";
        box.setAttribute('data-role', 'collapsible');
        box.setAttribute('data-theme','c');
        box.setAttribute('data-content-theme','a');
        document.getElementById("group-list").appendChild(box);
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
