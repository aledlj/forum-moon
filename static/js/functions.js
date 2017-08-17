var docked = 1;
var paneltoggle_password = 0;
var busy = 0;

function toggleHeaderDock() {
    if (docked == 1) {
        $(".top").css({ "position": "absolute" });

        $('#headerdockicon').html('<i style="font-size:0.85rem;" class="fa fa-caret-down"></i>');
        $("#headerdockicon").attr("title", "Dock");
        docked = 0;
    } else {
        $(".top").css({ "position": "fixed" });

        $('#headerdockicon').html('<i style="font-size:0.85rem;" class="fa fa-caret-up"></i>');
        $("#headerdockicon").attr("title", "Undock");
        docked = 1;
    }
}

/*var handler = function(event){
    // if the target is a descendent of container do nothing
    if($(event.target).is("a")){

    }
};

$(document).click(handler);*/

// collapse(".passpanel","fa-key", "fa-angle-up", "user_oldpass")

function collapse(elem, iconoff, iconon, focuselem) {
    $element = $(elem);
    $icons = {"iconoff": iconoff, "iconon": iconon};
    $focuselem = focuselem;

    if ($element.data('busy') === 0) {
        if ($element.hasClass('settingspanel')) {
            if ($element.data('opened') == 1) {
                $element.data('busy', 1);
                $(elem+" .collapsepanelcontent").velocity({ opacity: "0" }, 325, "easeOutQuart", function() {
                    $(elem+" .collapsepanelcontent p").velocity({ marginTop: "0", height: "0" }, 325, "easeOutQuart");
                    $(elem+" .collapsepanelcontent").velocity({ height: "0", "margin-top": "0" }, 325, "easeOutQuart");
                    $(elem+" .collapsepanelcontent p").css("pointer-events", "none");
                });

                //$('.paneltext i').html('Change password&nbsp;&nbsp;<i class="fa fa-key collapse1" style="font-size: 1.2rem;"></i>');
                $(elem+" .paneltext i").velocity({ opacity: "0" }, 325, "easeOutQuart", function() {
                    $(elem+" .paneltext i").wrapInner('<i/ class="fa '+$icons.iconoff+' collapse1" style="font-size: 1.2rem;">').children().unwrap();
                    $(elem+" .paneltext i").css("opacity", "0");
                    $(elem+" .paneltext i").velocity({ opacity: "1" }, 325, "easeOutQuart", function() {
                        $element.data('busy', 0);
                        $element.data('opened', 0);
                    });
                });
            } else {
                $element.data('busy', 1);
                $(elem+" .collapsepanelcontent").velocity({ height: "100%", "margin-top": "1em" }, 325, "easeOutQuart", function() {
                    $(elem+" .collapsepanelcontent").velocity({ opacity: "1" }, 325, "easeOutQuart");
                    $(elem+" .collapsepanelcontent p").css("pointer-events", "auto");
                    $(elem+" .inputbox input[name='"+$focuselem+"']").focus();
                });

                $(elem+" .collapsepanelcontent p").velocity({ marginTop: "10px", height: "100%" }, 325, "easeOutQuart");
                $(elem+" .paneltext i").velocity({ opacity: "0" }, 325, "easeOutQuart", function() {
                    $(elem+" .paneltext i").wrapInner('<i/ class="fa '+$icons.iconon+' collapse1" style="font-size: 1.2rem;">').children().unwrap();
                    $(elem+" .paneltext i").css("opacity", "0");
                    $(elem+" .paneltext i").velocity({ opacity: "1" }, 325, "easeOutQuart", function() {
                        $element.data('busy', 0);
                        $element.data('opened', 1);
                    });
                });
                //$('.paneltext i').wrapInner('<i/ class="fa fa-angle-up collapse1" style="font-size: 1.2rem;">').children().unwrap();
            }
        }
    }
}

themechange = null;
notiftransition = null;

function Growl(message, type, parent) {
    if (type == "growl") {
        $.jGrowl(message, {
            pool:               6,
            header:             '',
            group:              '',
            sticky:             false,
            position:           'bottom-right',
            appendTo:           '#jGrowl-persistent',
            glue:               'after',
            theme:              'default',
            themeState:         'highlight',
            corners:            '5px',
            check:              250,
            life:               8000,
            closeDuration:      '300',
            openDuration:       '300',
            easing:             'easeOutQuad',
            closer:             false,
            closeTemplate:      '✖',
            closerTemplate:     '<div>Close all</div>',
            log:                function() {},
            beforeOpen:         function(e) {
                $(e).parent().append("#jGrowl-persistent");
            },
            afterOpen:          function() {},
            open:               function() {
            },
            beforeClose:        function() {},
            close:              function() {},
            click:              function() {},
            animateOpen:        {
                opacity:        1
            },
            animateClose:       {
                opacity:        0
            }
        });
    }

    if (type == "bar") {

        if (parent) {
            if (parent == "admin") {
                click = "#adminsidebar";
                appendto = "#jGrowl-bar-admin";
            } else {
                click = document;
                appendto = "#jGrowl-bar-persistent";
            }
        } else {
            click = document;
            appendto = "#jGrowl-bar-persistent";
        }

        $.jGrowl(message, {
            pool:               1,
            header:             '',
            group:              '',
            sticky:             true,
            position:           'bottom-right',
            appendTo:           appendto,
            glue:               'after',
            theme:              'bar',
            themeState:         'highlight',
            corners:            '5px',
            check:              250,
            life:               8000,
            closeDuration:      '300',
            openDuration:       '300',
            easing:             'easeOutQuad',
            closer:             false,
            closeTemplate:      '✖',
            closerTemplate:     '<div>Close all</div>',
            log:                function() {},
            beforeOpen:         function(e) {
                $(e).parent().appendTo("#jGrowl-bar-persistent");
            },
            afterOpen:          function(e) {
                $(click).one("click", function(){
                    //$(e).append("a");
                    $(e).children("button.jGrowl-close").triggerHandler('click');
                });
            },
            open:               function() {},
            beforeClose:        function() {},
            close:              function() {
                $("#jGrowl").remove();
            },
            click:              function() {},
            animateOpen:        {
                translateY: "-46px"
                //opacity:        1
            },
            animateClose:       {
                translateY: "+=46px"
                //opacity:        0
            }
        });
    }
}

//Growl("a","bar");

function testGrowl() {
    clearInterval(notiftransition);

    $(".notifs").css("transition", "background-color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955), color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955)");
    notiftransition = setInterval(function() { $(".notifs").css("transition", ""); }, 350);

    //if (n == 0) {n = 1};
    $('.notifs').removeClass('nonew');
    $('.notifs').html(++n);

    $.jGrowl('<a href="user.php?id=1" style=" position: absolute;"><img title="thepriceyman" style="width:48px; height:auto;" alt="thepriceyman" src="images/avatars/default.jpg"></a><p style="margin:0; margin-left: 68px;"><a class="post-userfromtopic" href="#" onClick="$.jGrowl(\'You are good at clicking.\', { sticky: true }); return false;">TheJerkyBeef</a> replied to your post in the topic <a class="post-userfromtopic" href="#" onClick="$.jGrowl(\'Congratulations, you have clicked a link.\', { sticky: true }); return false;">"why i like pencils"</a></p>');

    notifCheckAmount();

}

function notifCheckAmount() {

    clearInterval(notiftransition);

    $(".notifs").css("transition", "background-color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955), color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955)");

    notiftransition = setInterval(function() { $(".notifs").css("transition", ""); }, 350);

    //if (clearnotifs == 1){n = 0};

    if (n === 0) {
        $(document).prop('title', pagetitleoriginal);
    } else {
        $(document).prop('title', '(' + n + ') ' + pagetitleoriginal);
    }

}

var firsttime = 1;
var copy = 0;
var firsttimeclippy = 0;

Mousetrap.bind('c l i p p y', function() {
    clipshow();
});

function clipshow() {
    if (firsttimeclippy === 0) {
        clippy.load('Clippy', function(agent) {
            // Do anything with the loaded agent
            cliphelp = agent;

            agent.show('Greeting');

            agent.speak('When all else fails, bind some paper together. My name is Clippy.');
            firsttimeclippy = 1;
        });
    }
}

Mousetrap.bind('p p', function() {
    testDrag();
});

Mousetrap.bind('s a l m o n', function() { $("#pricey").remove(); $("#drag").remove(); });

function testDrag() {

    if (firsttime == 1) {

        $(".indexcat").css("transition","all 500ms cubic-bezier(0.165, 0.84, 0.44, 1)");

        $('.indexcat').each(function(i, obj) {
            $this = $(this);
            var $grab = $("<div class='grabcontainer'>")
                .prepend($("<div class='grab'>"))
                .prepend($("<div class='grab'>"));
            console.log($this);
            $grab.prependTo($this);

            offset = $this.offset();
            width = $this.outerWidth();
            height = $this.outerHeight();

            $a = $("<div class='dropzone'>")
                .css({
                    "height":height,
                    "width":width,
                    //"top":offset.top,
                    //"left":offset.left,
                    "background-color":"rgba(0,0,0,0.25)"
                    //"position":"absolute"
                });

            $test = $this.wrap($a);
            //$this.data("dropzone",$test);

            //console.log($this.data("dropzone"));

        });

        $('.grabcontainer').each(function(){
            var $parent = $(this).parent();
            var $dropzone = $parent.parent();
            console.log($dropzone);
            interact(this)
                .draggable({
                    // enable inertial throwing
                    inertia: true,
                    // keep the element within the area of it's parent
                    restrict: {
                        restriction: $(window),
                        endOnly: false,
                        elementRect: { top: 0, left: 0, bottom: 0, right: 0 }
                    },
                    // enable autoScroll
                    autoScroll: false,

                    // call this function on every dragmove event
                    onmove: function (event) {
                        var target = event.target,
                        // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        // translate the element
                        //target.style.webkitTransform =
                        //target.style.transform =
                        //  'translate(' + x + 'px, ' + y + 'px)';

                        //$parent.velocity({ translateY: y, translateX: x, rotateZ: event.dx}, { queue: false, duration: 500, easing: 'easeOutQuart' });

                        if (doThisFrame++ >= 3) {
                            $parent.css({transform:"translateX("+x+"px) translateY("+y+"px) rotateZ("+event.dx+"deg)"});

                            //$("#pricey").css({transform:"translateX("+x+"px) translateY("+y+"px) rotateZ(0deg)"});
                            if (doThisFrame == 4) {
                                doThisFrame = 0;
                            }
                        }

                        // update the posiion attributes
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    },
                    // call this function on every dragend event
                    onend: function (event) {
                      console.log('moved a distance of '+ (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px');
                    }})
                .dropzone({
                    accept: $dropzone,//'.drag0, .drag1',
                });
        });

        $("body").prepend('<div id="pricey" src="images/avatars/thepriceyman.jpg" style="height: 32px;width: 500px;position:absolute;overflow:hidden;z-index:1;left: 32px; background-color: lightgrey;" href="#"></div>');
        $("body").prepend('<div id="drag" style="height: 32px;width:32px;position:absolute;cursor:pointer;overflow:hidden;z-index:2;background-color: grey;"></div>');
//border-radius:50px;
        //    height: 32px;
    // width: 500px;
    // position: absolute;
    // cursor: pointer;
    // overflow: hidden;
    // z-index: 2;
    // background-color: black;
    // left: -200px;
        //background-color:red;

        width = $(window).width();
        height = $(window).height();

        outerwidth = $("#drag").outerWidth();
        outerheight = $("#drag").outerHeight();

        $("#pricey").css("transition","all 500ms cubic-bezier(0.165, 0.84, 0.44, 1)");

        // http://interactjs.io/docs/

        // target elements with the "draggable" class
        interact('#drag')
          .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
              restriction: {
                x: 0,
                y: 0,
                width: width - outerheight,
                height: height - outerheight
            },
              endOnly: false,
              elementRect: { top: 0, left: 0, bottom: 0, right: 0 }
            },
            // enable autoScroll
            autoScroll: false,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
              console.log('moved a distance of '+ (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px');
            }
          });

        var doThisFrame = 0;

        function dragMoveListener (event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
            target.style.transform =
              'translate(' + x + 'px, ' + y + 'px)';
            // + 32

            if (doThisFrame++ >= 3) {
                //console.log("doing "+doThisFrame);
                //$("#pricey").velocity({ translateY: y, translateX: x, rotateZ: event.dx}, { queue: false, duration: 0, easing: 'easeOutQuart' });
                //$("#pricey").css("transition","none")
                $("#pricey").css({transform:"translateX("+x+"px) translateY("+y+"px) rotateZ("+event.dx+"deg)"});

                //$("#pricey").css({transform:"translateX("+x+"px) translateY("+y+"px) rotateZ(0deg)"});
                if (doThisFrame == 4) {
                    doThisFrame = 0;
                }
            } else {
                //console.log("not done "+doThisFrame);
            }
            //$("#pricey").velocity({rotateZ: event.dx}, { queue: false, duration: 1000, easing: 'easeOutQuart' });

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }

          // this is used later in the resizing and gesture demos
          //window.dragMoveListener = dragMoveListener;

        // var dotEl = document.getElementById('invisible');
        // var dotParent = dotEl.offsetParent;
        // width = $(window).width();
        // height = $(window).height();

        // // boundX: [0, dotParent.offsetWidth - dotEl.offsetWidth],
        // // boundY: [0, dotParent.offsetHeight - dotEl.offsetHeight],

        // var dotImpetus = new Impetus({
        //     source: dotEl,
        //     initialValues: [200, 200],
        //     boundX: [0, width - dotEl.offsetWidth],
        //     boundY: [0, height - dotEl.offsetHeight],
        //     friction: 0.8, //0.92
        //     multiplier: 1, //1
        //     update: function(x, y) {
        //         this.style.left = x + 'px';
        //         this.style.top = y + 'px';
        //         $("#pricey").velocity({ top: this.style.top, left: this.style.left }, { queue: false, duration: 1500, easing: 'easeOutQuart' });
        //     }
        // });

        // firsttime = 0;

        //$(document).bind('mousemove', function(ev) {

        //});
    }

    //$.jGrowl('<a href="user.php?id=1" style=" position: absolute;"><img title="thepriceyman" style="width:auto; height:64px;" alt="thepriceyman" src="images/avatars/thepriceyman.jpg"></a><p style="margin:0; margin-left: 78px; margin-right:10px;">Hello there! I am <a class="post-userfromtopic" href="user.php?id=1">thepriceyman</a>! I like curry!</p>');

}

function addTheme(arg) {
    clearInterval(themechange);
    if (arg == "0") {
        $(".form-text").css("color","#181818");
        $(".settingsheader").css("color","#181818");
        $(".username").css("color","#181818");
        $(".subheader").css("color","#181818");
        $("#themecss").remove();
    } else {
        $(".form-text").css("color","");
        $(".settingsheader").css("color","");
        $(".username").css("color","");
        $(".subheader").css("color","");
        $("#themecss").remove();
        $('head').append('<link rel="stylesheet" href="/inc/styles/themes/theme' + arg + '.css" type="text/css" id="themecss"/>');
    }

    $("*").css("transition", "background-color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955), color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955), border-color 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955), opacity 0.2s cubic-bezier(0.455, 0.030, 0.515, 0.955)");

    if (arg == "0" || arg == "3") {
        $("#bg img").css("opacity","0");
    } else {
        $("#bg img").css("opacity","1");
    }

    themechange = setInterval(function() { $("*").css("transition", ""); }, 1000);
}

var noticeopened = 0;
var noticeexpanded = 0;
var noticedraggable = 0;
var title = "Language Error";

var forumname = "";

function noticeExpand() {
    if (noticeopened == 1) {
        if (noticeexpanded === 0) {
            $('.blockMsg').attr('id', 'noticeexpanded');

            $('.noticeexpandbutton').removeAttr('title');
            //$('.blockMsg').css('transform', 'translate(0, 0)');
            $('.noticeexpandbutton').html('<div class="buttoninside insideexpand"><i class="fa fa-compress"></i></div>');
            $('.noticeexpandbutton').attr('title', 'Window');

            noticeexpanded = 1;
        } else {
            $('.blockMsg').removeAttr('id', 'noticeexpanded');

            $('.noticeexpandbutton').removeAttr('title');
            //$('.blockMsg').css('transform', 'translate(-50%, -50%)');
            //$('.blockMsg').css('left', '50%');
            //$('.blockMsg').css('top', '50%');
            $('.noticeexpandbutton').html('<div class="buttoninside insideexpand"><i class="fa fa-expand"></i></div>');
            $('.noticeexpandbutton').attr('title', 'Full screen');

            noticeexpanded = 0;
        }

    }
}

function noticeClose() {
    if (noticeopened == 1) {
        noticeopened = 0;

        if (noticeexpanded === 0) {
            $(".blockOverlay").velocity({ opacity: "0" }, 700, "easeInOutQuart", function() {
                $.unblockUI();
            });

            // $(".blockMsg").velocity(
            //     { opacity: [ 0, 1 ], transformPerspective: [1000, 1000], rotateY: [ "-50deg", 0 ], translateX: "-50%"},
            //      500, "easeInOutQuart", function(){
            //         //$(".blockMsg").css("transform","translate(-50%, -50%)");
            //     }
            // );

            $(".blockMsg").velocity({ opacity: [0, 1], transformPerspective: [1000, 1000], rotateX: ["5deg", 0], scale: [0.8, 1], translateX: ["0", "0"], translateY: ["0", "0"] },
                400, "easeInOutQuart",
                function() {
                    //$(".blockMsg").css("transform","translate(-50%, -50%)");
                }
            );
        }

        if (noticeexpanded == 1) {
            $(".blockMsg").css("transform", "translate(0px, 0px)");

            $(".blockOverlay").velocity({ opacity: "0" }, 700, "easeInOutQuart", function() {
                $.unblockUI();
            });

            $(".blockMsg").velocity({ opacity: [0, 1], transformPerspective: [1000, 1000], rotateX: ["5deg", 0], scale: [0.8, 1], translateX: ["0", "0"], translateY: ["0", "0"] },
                400, "easeInOutQuart",
                function() {
                    //$(".blockMsg").css("transform","translate(-50%, -50%)");
                }
            );
        }
    }
}
//var zoomScale = 1;
var dragged = 0;
var viewheight = $(window).height();
var viewwidth = $(window).width();

function showblockscreen(message, closeable, expanded, draggable, overlay, expandable, resizeable) {

    noticeopened = 1;
    noticeexpanded = expanded;
    noticedraggable = draggable;
    noticeexpandable = expandable;

    /*if (type == "firstsignin") {
        if (lang == "en") {
            title = "Hi";
            message = '<p class="blockMsgContentspbigger">Welcome to ' + forumname + '.</p>' +
                '<p class="blockMsgContentspbigger">We hope you enjoy your stay.</p>';
        }

        if (lang == "jp") {
            title = "こんにちは";
            message = '<p class="blockMsgContentspbigger">' + forumname + 'へようこそ！私は一番！犬、猫、アヒル！いいえ！はい！</p>' +
                '<p class="blockMsgContentspbigger">えと。。。　あの。。。　あ！日本語、英語！</p>';
        }

        $.blockUI({ message: '<div class="blockMsgContents"><h1>' + title + '</h1>' + message + '</div>' });
    }*/

    $.blockUI({ message: message });
    //$(".blockUI").css("font-family", "\"Lato\",sans-serif");

    if (type == "admin") {
        // if (lang == "en"){
        //     title = " ";
        //     message = '<p class="blockMsgContentspbigger"></p>';
        // }

        // if (lang == "jp"){
        //     title = " ";
        //     message = '<p class="blockMsgContentspbigger"></p>';
        // }

        // $.blockUI({message: '<div class="blockMsgContents"><h1>' + title + '</h1>'+message+'</div>'});
    }

    $(".blockOverlay").css("opacity", "0");
    $(".blockMsg").css("opacity", "0");

    if (expanded) {
        $('.blockMsg').attr('id', 'noticeexpanded');

        $(".blockOverlay").velocity({ opacity: "0.25" }, 600, "easeInOutQuart");
        $(".blockMsg").velocity({ opacity: [1, 0], transformPerspective: [1000, 1000], rotateX: [0, "-5deg"], scale: [1, 0.8] },
            400, "easeInOutQuart",
            function() {
                //$(".blockMsg").css("transform","translate(-50%, -50%)");
            }
        );

    } else {
        // $(".blockOverlay").velocity({opacity: "0.25"}, 600, "easeInOutQuart");
        // $(".blockMsg").velocity(
        //     { opacity: [ 1, 0 ], transformPerspective: [1000, 1000], rotateY: [ 0, "55deg" ], translateX: [ "0", "50%" ]},
        //      500, "easeInOutQuart", function(){
        //         //$(".blockMsg").css("transform","translate(-50%, -50%)");
        //     }
        // );

        $(".blockOverlay").velocity({ opacity: "0.25" }, 600, "easeInOutQuart");
        $(".blockMsg").velocity({ opacity: [1, 0], transformPerspective: [1000, 1000], rotateX: [0, "-5deg"], scale: [1, 0.8] },
            400, "easeInOutQuart",
            function() {
                //$(".blockMsg").css("transform","translate(-50%, -50%)");
            }
        );
    }

    if (expandable == 1) {
        if (expanded == 1) {
            $(".blockMsg").prepend('<a href="#" onclick="noticeExpand(); return false;"><div class="noticeexpandbutton" title="Window"><div class="buttoninside insideexpand"><i class="fa fa-compress"></i></div></div></a>');
        } else {
            $(".blockMsg").prepend('<a href="#" onclick="noticeExpand(); return false;"><div class="noticeexpandbutton" title="Full screen"><div class="buttoninside insideexpand"><i class="fa fa-expand"></i></div></div></a>');
        }
    } else {
        $(".noticedragbar").css("margin-right", "32px");
    }

    viewheight = $(window).height();
    viewwidth = $(window).width();

    //$('.blockMsg').css('transform', 'translate(-50%, -50%)');

    //$('.blockMsg').css('left', viewwidth / 20);
    //$('.blockMsg').css('width', viewwidth / 1.1);

    //$('.blockMsg').css('left', viewwidth / 20);
    //$('.blockMsg').css('width', viewwidth / 1.1);

    if (viewwidth >= 750) {
        $('.blockMsg').css('left', Math.round(viewwidth / 6));
        $('.blockMsg').css('width', Math.round(viewwidth / 1.5));

        $('.blockMsg').css('top', Math.round(viewheight / 8));
        $('.blockMsg').css('height', Math.round(viewheight / 1.33));
    } else {
        $('.blockMsg').css('left', Math.round(viewwidth / 20));
        $('.blockMsg').css('width', Math.round(viewwidth / 1.1));

        $('.blockMsg').css('top', Math.round(viewheight / 12));
        $('.blockMsg').css('height', Math.round(viewheight / 1.2));

    }

    if (lang) {
        if (lang == "en") {
            $(".blockUI").css("font-family", "\"Lato\",sans-serif");
        }

        if (lang == "jp") {
            $(".blockUI").css("font-family", "\"MPlus\",sans-serif");
        }
    }

    if (draggable == 1) {
        $(".blockMsg").prepend('<div class="noticedragbar"><div class="dragbarinside"></div></div>');

        $(".noticedragbar").dblclick(function() {
            if (noticeopened == 1) {
                noticeExpand();
            }
        });

        if (closeable === 0 && expandable === 0) {
            $(".noticedragbar").css("margin-right", "0px");
        }

        $('.blockMsg').draggable({
            handle: '.noticedragbar',
            snap: ".blockOverlay",
            snapMode: "inner",
            snapTolerance: 10,
            start: function(event, ui) {
                $(".blockMsg").css("transform", "");

                dragged = 1;
                // ui.position.left = 0;
                // ui.position.top = 0;
            },
            drag: function(event, ui) {

                if (noticeexpanded == 1) {

                    noticeExpand();
                    $('.blockMsg').css('transform', 'translate(0, 0)');

                    // var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
                    // var newLeft = ui.originalPosition.left + changeLeft / (( zoomScale)); // adjust new left by our zoomScale

                    // var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
                    // var newTop = ui.originalPosition.top + changeTop / zoomScale; // adjust new top by our zoomScale

                    // ui.position.left = newLeft;
                    // ui.position.top = newTop;
                }


            }
        });
    }

    if (closeable == 1) {
        $(".blockMsg").prepend('<a href="#" onclick="noticeClose(); return false;"><div class="noticeclosebutton" title="Close"><div class="buttoninside">x</div></div></a>');

        $(".blockOverlay").click(function() {
            noticeClose();
        });
    } else {
        $(".noticeexpandbutton").css("right", "0");
        $(".noticedragbar").css("margin-right", "32px");
    }

    if (overlay === 0) {
        $(".blockOverlay").hide();
    }

    if (resizeable == 1) {
        $(".blockMsg").resizable({
            containment: ".blockOverlay",
            handles: "all"
        });
    }

    return false;
}

moment.locale("en", {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "%d seconds",
        m:  "a minute",
        mm: "%d minutes",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    },
    calendar : {
        lastDay : "[Yesterday]",
        sameDay : "[Today]",
        nextDay : "[Tomorrow]",
        lastWeek : "[last] dddd [at] LT",
        nextWeek : "dddd [at] LT",
        sameElse : "Do MMMM YYYY"
    }
});

moment.locale("short", {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "%ds",
        m:  "%dm",
        mm: "%dm",
        h:  "%dh",
        hh: "%dh",
        d:  "%dd",
        dd: "%dd",
        M:  "%d month",
        MM: "%d months",
        y:  "%d year",
        yy: "%d years"
    }
});

function relativeTime( elem ) {

    if ( $( elem ).length ){

        $( elem ).each(function() {

            var date = $( this ).attr("date");

            if (date != "-") {

                moment.locale("en");

                $( this ).attr("title", moment( date ).fromNow() + " (" + moment( date ).format("h:mmA - D MMM YY") + ")");

                moment.locale("short");

                var now = moment();

                if (now.diff( date , "days") < 6) {

                    if (now.diff( date , "seconds") <= 10){
                        $(this).html("now");
                    }
                    else if (now.diff( date , "seconds") <= 20){
                        $(this).html("a moment ago");
                    }
                    else{
                        $(this).html(moment( date ).fromNow(true));
                    }
                }
                else if (moment(date).isBefore(now, "year")) {
                    $(this).html(moment( date ).format("D MMM YY"));
                }
                else {
                    $(this).html(moment( date ).format("D MMM"));
                }
            }
        });
    }
}

/*moment.locale("en");

$(".prel'.$posts_row['post_id'].'").attr("title", moment("'. $posts_row['post_date'] . '").calendar() + " (" + moment(" ' .$posts_row['post_date'].' ").format("h:mmA - Do MMM YYYY") + ")");

$(".prel'.$posts_row['post_id'].'").html(moment("'. $posts_row['post_date'] . '").fromNow());

var prel'.$posts_row['post_id'].' = $(".prel'.$posts_row['post_id'].'").text();

if (prel'.$posts_row['post_id'].'.match(/(^|\s)[1-9]s|10s(\s|$)/)){
    $(".prel'.$posts_row['post_id'].'").html("now");
}
if (prel'.$posts_row['post_id'].'.match(/(^|\s)1[1-9]s|20s(\s|$)/)){
    $(".prel'.$posts_row['post_id'].'").html("a moment ago");
}*/

function relativeTimePost( elem ) {

    if ( $( elem ).length ){

        $( elem ).each(function() {

            var date = $( this ).attr("date");

            moment.locale("en");

            $( this ).attr("title", moment( date ).fromNow() + " (" + moment( date ).format("h:mmA - D MMM YY") + ")");

            var now = moment();

            if (now.diff( date , "days") < 6) {

                if (now.diff( date , "seconds") <= 10){
                    $(this).html("now");
                }
                else if (now.diff( date , "seconds") <= 20){
                    $(this).html("a moment ago");
                }
                else{
                    $(this).html(moment( date ).fromNow());
                }
            }
            else if (moment(date).isBefore(now, "year")) {
                $(this).html(moment( date ).format("D MMM YYYY"));
            }
            else {
                $(this).html(moment( date ).format("D MMM"));
                }
        });
    }
}