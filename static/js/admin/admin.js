var isSidebarOut = 0;
var sidebarbusy = 0;
var isTestBoxOut = 0;
var sidebarForceReject = 0;
var adminValidated = 0;

var adminSidebarWidth = 250;
var buttonWidth = 15;
adminSidebarWidthWithButton = (adminSidebarWidth + buttonWidth) + "px";

function sideBarTurbolinksLoad(sideBarIsOut){
    if (sideBarIsOut === 1) {
        $( "#pagewrapper" ).css({"marginLeft": adminSidebarWidthWithButton});
        $( ".top" ).css({"width": '100%'});
        $( ".top" ).css({"width": '-='+adminSidebarWidth});
        $( "#footer" ).css({"marginLeft": adminSidebarWidthWithButton});
    } else {
        $( "#pagewrapper" ).css({"marginLeft": "0px"});
        $( ".top" ).css({"width": '100%'});
        $( "#footer" ).css({"marginLeft": "0px"});
    }
}

function sideBarToggle(delay){
    sidebarbusy = 1;
    if (isSidebarOut === 0){
        // create center div
        $( "#adminsidebar" ).html("<div id=\"admin-center\"></div>");
        // slide in admin bar
        $( "#adminsidebar" ).velocity({left: "0px"}, 325, "easeOutQuart"); //USED TO BE 500, "spring" AND width: "200px"
        // fade in admin button color, fade out old icons and fade in new icon ("finish" stops current animation)
        $( "#admintogglebutton" ).velocity({left: adminSidebarWidth, backgroundColor: "#D35050"}, 325, "easeOutQuart"); //USED TO BE 500, "spring" AND width: "200px"
        $( "#admintoggleicon" ).velocity("finish");
        $( "#admintoggleicon" ).velocity({opacity: "0"}, 325, "linear", function(){
            $( "#admintoggleicon" ).removeAttr("class");
            $( "#admintoggleicon" ).attr("class", "fa fa-times");
            $( "#admintoggleicon" ).velocity({opacity: "1"}, 325, "linear");
        });
        // squeezes the rest of the page 200px to the right
        $( "#pagewrapper" ).velocity({marginLeft: adminSidebarWidthWithButton}, 325, "easeOutQuart");
        $( ".top" ).css({"width": '100%'});
        $( ".top" ).velocity({width: '-='+adminSidebarWidthWithButton}, 325, "easeOutQuart");
        $( "#footer" ).velocity({marginLeft: adminSidebarWidthWithButton}, 325, "easeOutQuart");
        // slides background slightly
        $( "#bg img" ).velocity("stop");
        $( "#bg img" ).velocity({left: "3%"}, 625, "easeOutQuart");
        isSidebarOut = 1;
    }
    else{
        setTimeout(function(){
            $( "#adminsidebar" ).velocity({left: "-"+adminSidebarWidth}, 325, "easeOutQuart", function(){
                $("#adminsidebar").html("");
                sidebarbusy = 0;
            });

            $( "#admintogglebutton" ).velocity({left: "0px", backgroundColor: "#7C7C7C"}, 325, "easeOutQuart");
            $( "#admintoggleicon" ).velocity("finish");

            $( "#admintoggleicon" ).velocity({opacity: "0"}, 325, "linear", function(){

                $( "#admintoggleicon" ).removeAttr("class");
                $( "#admintoggleicon" ).attr("class", "fa fa-cog");

                $( "#admintoggleicon" ).velocity({opacity: "1"}, 325, "linear");
            });

            $( "#pagewrapper" ).velocity({marginLeft: "0px"}, 325, "easeOutQuart");
            $( ".top" ).velocity({width: '100%'}, 325, "easeOutQuart");
            $( "#footer" ).velocity({marginLeft: "0px"}, 325, "easeOutQuart");

            $( "#bg img" ).velocity("stop");
            $( "#bg img" ).velocity({left: "0%"}, 625, "easeOutQuart");

            isSidebarOut = 0;
        }, delay);
    }
}

function testBox(){
    if (isTestBoxOut === 0){
        $("#content").before("<div id=\"testbox\">" +
            "<p><h2>Testbox</h2></p>" +
            "<p><a href=\"#\" data-turbolinks=\"false\" onClick=\"showblockscreen('firstsignin', 'en', 1, 0, 0, 1, 0, 0); return false;\">test blockui</a></p>" +
            "<p><a href=\"#\" data-turbolinks=\"false\" onClick=\"showblockscreen('firstsignin', 'en', 1, 1, 1, 1, 1, 1); return false;\">test 2</a></p>" +
            "<p><a href=\"#\" data-turbolinks=\"false\" onClick=\"testGrowl(); return false;\">test growl</a></p>" +
            "<p><a href=\"#\" data-turbolinks=\"false\" onClick=\"testDrag(); return false;\">test drag</a></p>" +
            "<textbox id=\"seltest\"></textbox>" +
            "<p>Apply theme: <select id=\"themeselect\" class=\"inputbox\" style=\"margin-left:5px;\"><option value=\"0\"> </option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option></select></p>" +
        "</div>");
        isTestBoxOut = 1;

        $('#seltest').selectize({
            delimiter: ',',
            persist: false,
            create: function(input) {
                return {
                    value: input,
                    text: input
                };
            },
            maxItems: null,
            searchField: ['name'],
            options: [
                {name: 'Hello'},
                {name: 'Helllo'},
                {name: 'Hell'}
            ],
        });

        $( "#themeselect" ).change(function() {

            theme = $('#themeselect').val();

            addTheme(theme);

            // if (theme == "0"){
            //     $("#themecss").remove();

            // }
            // else{
            //     $("#themecss").remove();
            //     addTheme(theme);

            // }

        });
    }
    else{
        $("#testbox").remove();
        isTestBoxOut = 0;
    }
}

var reload = 0;
var debug = 0;

function updateAdmin(page, getid) {
    adminNavigation(page,null,getid);
}

function adminAction(action, id, fromadminbar, page){

    if (fromadminbar == 1) {
        NProgress.configure({ parent: '#adminsection' });
        bararea = "admin";
    } else {
        NProgress.configure({ parent: 'body' });
        bararea = "normal";
    }

    NProgress.start();

    $.post("admin/adminfunctions.php",
    {
        'action': action,
        'id': id
    },
    function(data) {

        if (debug) {console.log(data);}

        NProgress.done();
        if (data.auth === false) {
            if (data.reason == "nouser") {
                barnotice.add("Your account doesn't exist.",bararea);
            } else if (data.reason == "notsignedin") {
                barnotice.add("You are not signed in.",bararea);
            } else if (data.reason == "notadmin") {
                barnotice.add("You are not an admin.",bararea);
            } else if (data.error == "servererror") {
                barnotice.add("Server Error",bararea);
            }
        } else {
            if (data.error) {
                if (data.error == "servererror") {
                    barnotice.add("Server Error",bararea);
                } else if (data.error == "invalidaction") {
                    barnotice.add("That is not a valid action.",bararea);
                } else if (data.error == "alreadybanned") {
                    barnotice.add("User is already banned.",bararea);
                } else if (data.error == "alreadyunbanned") {
                    barnotice.add("User is already unbanned.",bararea);
                } else if (data.error == "topicalreadyclosed") {
                    barnotice.add("Topic is already closed.",bararea);
                } else if (data.error == "topicalreadyopen") {
                    barnotice.add("Topic is already open.",bararea);
                } else if (data.error == "topic-alreadybinned") {
                    barnotice.add("Topic is already in the bin.",bararea);
                } else if (data.error == "topic-notinbin") {
                    barnotice.add("Topic is not in the bin.",bararea);
                }
            } else if (data.result == "success") {

                if (action == "banuser") {
                    barnotice.add("User banned",bararea);
                    if (page == "user") {
                        $( ".subheader" ).css("text-decoration", "line-through");
                        $('#admin-banbutton').attr({onclick:"adminAction(\'unbanuser\',"+id+",1,currentpage); return false;"});
                        $('#admin-banbutton .adminitem').text('Unban');
                    }
                    if (page == "userlist") {
                        $('.banbutton.id'+id).html('<a class="colorbutton" href="#" onclick="adminAction(\'unbanuser\','+id+',0,currentpage); return false;">Unban</a>');
                        $( ".userlistname.id"+id ).css("text-decoration", "line-through");
                    }
                }

                if (action == "unbanuser") {
                    barnotice.add("User unbanned",bararea);
                    if (page == "user") {
                        $( ".subheader" ).css("text-decoration", "none");
                        $('#admin-banbutton').attr({onclick:"adminAction(\'banuser\',"+id+",1,currentpage); return false;"});
                        $('#admin-banbutton .adminitem').text('Ban');
                    }
                    if (page == "userlist") {
                        $('.banbutton.id'+id).html('<a class="colorbutton" href="#" onclick="adminAction(\'banuser\','+id+',0,currentpage); return false;">Ban</a>');
                        $( ".userlistname.id"+id ).css("text-decoration", "none");
                    }
                }

                if (action == "closetopic") {
                    barnotice.add("Topic closed.",bararea);
                    $('#admin-topicclosed').attr({onclick:"adminAction(\'opentopic\',"+id+",1,currentpage); return false;"});
                    $('#admin-topicclosed .adminitem').html('<i class="fa fa-lock" style="margin-right:7px"></i>');
                }

                if (action == "opentopic") {
                    barnotice.add("Topic opened.",bararea);
                    $('#admin-topicclosed').attr({onclick:"adminAction(\'closetopic\',"+id+",1,currentpage); return false;"});
                    $('#admin-topicclosed .adminitem').html('<i class="fa fa-unlock" style="margin-right:7px"></i>');
                }

                if (data.serveraction == "topic-binned") {
                    barnotice.add("Topic moved to bin.",bararea);
                    $('#topic-'+id).hide();
                }

                if (data.serveraction == "topic-restored") {
                    barnotice.add("Topic restored from bin.",bararea);
                    $('#topic-'+id).show();
                }

            }
        }
    }); // end ajax call
}

function adminNavigation(navigation, page, getid) {
    if (isSidebarOut == 1) {
        if (sidebarbusy === 0){
            NProgress.configure({ parent: '#adminsection' });
            NProgress.start();

            $.post( "admin/adminfunctions.php",
            {
                'navigation': navigation,
                'previouspage': previoussection,
                'pageid': getid
            },
            function( data ) {
                //JSON.parse( data );

                if (debug) {console.log(data);}

                if (data.auth === false) {
                    if (data.reason == "nouser" | data.reason == "notsignedin") {
                        NProgress.done();
                        sideBarToggle();
                    }
                    else if (data.reason == "notadmin" | sidebarForceReject == "1") {
                        NProgress.done();
                        $('#adminsidebar').html("<div id=\"admin-redcross\">✖</div>");
                        sideBarToggle(625);
                    }
                }
                else {
                    NProgress.done();
                    adminValidated = 1;

                    $('#adminsidebar').html(
                    "<div id=\"adminsidebarcontainer\">" +
                        "<div id=\"adminheader\">" +
                            "<a id=\"adminheadertext\">" +
                                data.title +
                            "</a>" +
                        "</div>"+
                        "<div id=\"adminsection\">" +
                            "<div role=\"button\" id=\"adminbackbutton\" onClick=\"adminNavigation('back', currentpage, getid); return false;\"><i class='fa fa-angle-left' aria-hidden='true'></i></div>"+
                            "<a id=\"adminsectiontext\">" +
                                data.section +
                            "</a>" +
                        "</div>"+
                        "<div id=\"adminbody\">" +
                            "<div id=\"admincontent\">" +
                                data.content +
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div id=\"notice-bar-admin\"></div>"
                    );
                    sidebarbusy = 0;
                }
            });
        }
    }
}

function initAdmin(page, getid) {
    var desired_delay = 4000;
    var message_timer = false;

    if (sidebarbusy === 0){
        if (isSidebarOut == 1) {
            sideBarToggle();
        }
        else{
            sideBarToggle();
            NProgress.configure({ parent: '#adminsidebar' });
            NProgress.start();

            //AJAX
            $.post( "admin/adminfunctions.php",
            {
                'action': 'initadmin',
                'currentpage': page,
                'pageid': getid
            },
            function( data ) {
                //JSON.parse( data );

                if (debug) {console.log(data);}

                if (data.auth === false) {
                    if (data.reason == "nouser" | data.reason == "notsignedin") {
                        NProgress.done();
                        sideBarToggle();
                    }
                    else if (data.reason == "notadmin" | sidebarForceReject == "1") {
                        NProgress.done();
                        $('#adminsidebar').html("<div id=\"admin-redcross\">✖</div>");
                        sideBarToggle(625);
                    }
                }
                else {
                    NProgress.done();
                    adminValidated = 1;

                    $('#adminsidebar').html(
                    "<div id=\"adminsidebarcontainer\">" +
                        "<div id=\"adminheader\">" +
                            "<a id=\"adminheadertext\">" +
                                data.title +
                            "</a>" +
                        "</div>"+
                        "<div id=\"adminsection\">" +
                            "<div role=\"button\" id=\"adminbackbutton\" onClick=\"adminNavigation('back', currentpage, getid); return false;\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></div>"+
                            "<a id=\"adminsectiontext\">" +
                                data.section +
                            "</a>" +
                        "</div>"+
                        "<div id=\"adminbody\">" +
                            "<div id=\"admincontent\">" +
                                data.content +
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div id=\"notice-bar-admin\"></div>"
                    );
                    sidebarbusy = 0;

                    previoussection = data.page;
                }
            });
        }
    }
}

function adminMobile() {
    showblockscreen("admin","en",1,1,0,0,0,0);
    $(".blockMsgContents").html("<h1>Admin</h1><p class='blockMsgContentspsmaller'>testing</p>");
}

$( document ).ajaxError(function(event, jqxhr, settings, thrownError) {
    NProgress.done();
    console.log("Error: " + thrownError);
    //$.jGrowl("Error: " + thrownError);
    if (isSidebarOut === 1){
        $('#admin-center').append("<a style=\"white-space: pre-wrap;height:100px;\">There was a problem connecting.</a>");
        sideBarToggle(625);
    }

});