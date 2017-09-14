html = require "lapis.html"

static_files = dofile "./static/resources.lua"

topbar_buttons = {
    list_users: "Test"
    --topics: "Topic View"
    --webcam: "Webcam"
}

topbar_dropdownmenu_list = {
    testboxbutton: => li -> a onClick: "testBox(); return false", href: "#", "Test box"
}

class LayoutFatalError extends html.Widget
    content: =>
        html_5 ->
            head ->
                title "Error" - @page_title
                meta charset: "UTF-8", "http-equiv": "Content-type", content: "text/html;charset=UTF8"
                meta name: "keywords", content: "vidze, forum"
                meta name: "viewport", content: "width=device-width, initial-scale=1.0"
                script "data-turbolinks-track": "reload", src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
                script "data-turbolinks-track": "reload", src: "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"
                script "hljs.initHighlightingOnLoad();"
                link rel: "stylesheet", "data-turbolinks-track": "reload", href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/monokai-sublime.min.css"

                -- for file in *static_files.js
                --     script "data-turbolinks-track": "reload", src: file
                for file in *static_files.css
                    link async: true, rel: 'stylesheet', "data-turbolinks-track": "reload", href: file
                for file in *static_files.fonts
                    link async: true, "type": "text/css", rel: 'stylesheet', "data-turbolinks-track": "reload", href: file

            body id: "fatal-error", ->
                text "a"

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
                    div id: "content", ->
                        @content_for "inner"

                div id: "footer", -> div id: "footerinside", -> p ->
                    text "Created by the Vidze Team."
                    raw " &copy;"
                    text "#{os.date "%Y"} Vidze."
