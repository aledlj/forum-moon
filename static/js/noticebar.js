barnotice = {};

var queueplace = 0;

barnotice.add = function(content, type, theme){
    var $element;
    if (type == "admin") {
        $element = $("#notice-bar-admin");
    } else if (type == "normal" || type === undefined) {
        $element = $("#notice-bar-persistent");
    }
    var addtheme = "";

    var $bardiv = $("<div>", {id: "bar-container"}).text(content);

    $element.queue("notice-bar", function(next) {
        if (theme) {
            $bardiv.addClass(theme);
        }
        $element.show().append($bardiv);
        var height = $bardiv.outerHeight();
        $element.velocity({translateY: height+"px"},0,"linear");
        $bardiv.css("visibility","visible");
        $element.velocity({translateY: "0px"},300,"easeOutQuad", function(){
            $(document).on('click', function(event) {
                var $target = $(event.target);
                if (!$target.is($bardiv)) {
                    $( this ).off( 'click' );
                    $element.velocity({translateY: height+"px"},300,"easeOutQuad", function(){
                        $bardiv.remove();
                        queueplace--;
                        //console.log("(close) queue items left: " + queueplace);
                        next();
                    });
                }
            });
        });
    });

    if (queueplace === 0) {
        $element.dequeue("notice-bar");
    }

    queueplace++;

    return $bardiv;
};

/*barnotice.clear = function(type){
    if (type == "admin") {
        $("#notice-bar-admin").clearQueue("notice-bar");
    } else if (type == "normal") {
        $("#notice-bar-persistent").clearQueue("notice-bar");
    }
    barnotice.queueplace = 0;
};*/