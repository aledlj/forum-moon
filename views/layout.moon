html = require "lapis.html"

class Layout extends html.Widget
    content: =>
        html_5 ->
            head ->
                title @title or "Lapis Page"
                link rel: "stylesheet", href: "/static/style.css"
                link rel: "stylesheet", href: "/static/normalise.css"

            div id: "header", ->
                text "hello!"

            body ->
                @content_for "inner"
                div id: "footer", -> div id: "footerinside", -> p ->
                    text "Created by the Vidze Team."
                    raw " &copy;"
                    text "#{os.date "%Y"} Vidze."
