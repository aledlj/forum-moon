-- views/resources.moon

static_files = {
    js: {
        "/static/js/ext/turbolinks.js"
        "/static/js/ext/nprogress.js"
        "/static/js/ext/jqueryui/jquery-ui.min.js"
        "/static/js/ext/jquery.ui.touch-punch.min.js"
        "/static/js/ext/interact.min.js"
        "/static/js/ext/velocity.min.js"
        "/static/js/ext/outliner.js"
        "/static/js/ext/mousetrap.min.js"
        "/static/js/ext/mousetrap-global-bind.min.js"
        "/static/js/ext/jquery.jgrowl.js"
        "/static/js/ext/jquery.blockUI.js"
        --"static/js/admin/admin.js"
        --"static/js/dropdownmenu.js"
        "/static/js/ext/moment.min.js"
        "/static/js/ext/jquery-textrange.js"
        --"static/js/functions.js"
        --"static/js/noticebar.js"
        --"static/js/keyshortcuts.js"
        "/static/js/test.js"
        "/static/js/ext/tinycolor.min.js"
        "/static/js/ext/spectrum.js"
        "/static/js/ext/marked.min.js"
        "/static/js/ext/selectize.min.js"
        "/static/js/ext/tooltipster.bundle.min.js"
        "/static/js/ext/autosize.min.js"
        "/static/js/turbolinks.js"
    }

    css: {
        "/static/styles/normalise.css"
        "/static/styles/style.css"
        --$theme_file
        --"static/styles/admin/spinner.css"
        "/static/js/ext/nprogress.css"
        "/static/fonts/fa/css/fa-min.css"
        "/static/js/ext/jquery.jgrowl.css"
        "/static/js/ext/spectrum.css"
        "/static/js/ext/smore-inc-clippy.js/build/clippy.css"
        "/static/js/ext/tooltipster.bundle.css"
        "/static/js/ext/selectize.css"
        "/static/js/ext/selectize.bootstrap3.css"
        "/static/styles/test.min.css"
    }

    fonts: {
        "https://fonts.googleapis.com/css?family=Arimo:400,400i,700,700i|Open+Sans:300,400,600,700|Raleway:100,200|Lato:100,300"
    }
}

return static_files
