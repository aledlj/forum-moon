html = require "lapis.html"

static_files = dofile "./views/resources.lua"

topbar_buttons = {
    list_users: "Test"
    --topics: "Topic View"
    --webcam: "Webcam"
}

topbar_dropdownmenu_list = {
    testboxbutton: => li -> a onClick: "testBox(); return false", href: "#", "Test box"
}

class Layout extends html.Widget
    content: =>
        html_5 ->
            head ->
                title @page_title
                meta charset: "UTF-8", "http-equiv": "Content-type", content: "text/html;charset=UTF8"
                meta name: "keywords", content: "vidze, forum"
                meta name: "viewport", content: "width=device-width, initial-scale=1.0"
                script "data-turbolinks-track": "reload", src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
                script "data-turbolinks-track": "reload", src: "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"
                script "hljs.initHighlightingOnLoad();"
                link rel: "stylesheet", "data-turbolinks-track": "reload", href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/monokai-sublime.min.css"

                for file in *static_files.js
                    script "data-turbolinks-track": "reload", src: file
                for file in *static_files.css
                    link rel: 'stylesheet', "data-turbolinks-track": "reload", href: file
                for file in *static_files.fonts
                    link async: true, "type": "text/css", rel: 'stylesheet', "data-turbolinks-track": "reload", href: file

            body ->
                div "data-turbolinks-permanent": true, id: 'data'
                div "data-turbolinks-permanent": true, id: 'clippycontainer'
                div "data-turbolinks-permanent": true, id: 'floatingcontainer'

                div id: "bg", -> img alt: ""

                div id: "pagewrapper", ->
                    div id: "media-res" -- tell js what the @media is -->
                    div id: "topbar", ->
                        a id: "header", href: @url_for("home"), @forum_title
                        div id: "topbuttons-left", ->
                            for k, v in pairs topbar_buttons
                                --if @session.signedin == false
                                a class: "colorbutton", href: @url_for(k), v
                        div class: "topbar-separator"
                        if @session.signedin
                            print "a"
                        else
                            div id: "topbuttons-right", ->
                                a class: "colorbutton icon", href: @url_for("home"), ->
                                    i class: "fa fa-user", "aria-hidden": "true"
                                    text "Sign In"
                                a class: "colorbutton", href: @url_for("home"), "Sign Up"
                        div role: "button", class: "topbar-dropdownmenu-button", onclick: "mobilemenu(); return false;", -> i class: "fa fa-bars", "aria-hidden": "true"
                    --
                    -- no dropdown menu yet
                    noscript ->
                        "Please enable Javascript."
                        raw "<style>content{display:none;}</style>"

                    div id: "content", ->
                        if @has_content_for "subheader"
                            div class: "subheader", -> @content_for "subheader"
                        @content_for "inner"

                div id: "footer", -> div id: "footerinside", -> p ->
                    text "Created by the Vidze Team."
                    raw " &copy;"
                    text "#{os.date "%Y"} Vidze."
