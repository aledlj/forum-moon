Mousetrap.bind('shift+r', function() {
    $(".replybox").focus();
    return false;
});

Mousetrap.bind('b s', function() {
    $(location).attr('href', "usersettings");
    return false;
});

Mousetrap.bind('b p', function() {
    $(location).attr('href', "posts");
    return false;
});

/*Mousetrap.bind('b t', function() {
    $(location).attr('href', "create_topic");
    return false;
});*/

Mousetrap.bind('b h', function() {
    $(location).attr('href', "help");
    return false;
});

Mousetrap.bind('n t', function() {
    $(location).attr('href', "create_topic");
    return false;
});

Mousetrap.bind('s i', function() {
    $(location).attr('href', "signin");
    return false;
});

Mousetrap.bind('s o', function() {
    $(location).attr('href', "signout");
    return false;
});

function changepasswordhotkey() {
    //only on settings page
    Mousetrap.bind('c p', function() {
        collapse("password");
        return false;
    });
}