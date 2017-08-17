$(document).on('turbolinks:click', function() {
    NProgress.configure({ parent: 'body' });
    NProgress.start();
    // if (isSidebarOut === 1){
    //     $('#nprogress .bar').css({"width": "calc(100% - 200px)"});
    //     $('#nprogress .bar').css({"margin-left": "200px"});
    //     //a = $('#nprogress .bar').css("left");
    // }
});

$(document).on('turbolinks:render', function() {

    NProgress.done();
    NProgress.remove();
});

$(document).on('turbolinks:load', function() {

    // if (isSidebarOut === 1){
    //     sideBarTurbolinksLoad(1);
    // } else {
    //     sideBarTurbolinksLoad(0);
    // }
    // closeMenu(1);
});
// Turbolinks is displaying a preview
