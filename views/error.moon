-- views/missing.moon
config = require("lapis.config").get!
import Widget from require "lapis.html"

class Error extends Widget
    content: =>
        --@content_for "subheader", ->
        --     text "hello"

        --raw "<style>body {background-image: none;} #pagewrapper {flex-direction: row; justify-content: center; display: flex;} #pagewrapper > #content {margin-top: 0px;}</style>"

        unless @errors[1] == "non_recoverable"
            div id: "error-banner", ->
                h1 @errorinfo.title
                h2 @errorinfo.description
                if config.testmode
                    code class: "language-lua hljs", ->
                        text "Error: "..@errorinfo.name
                        text @traceback
        else
            div id: "error-banner", ->
                h1 @errorinfo.title
                h2 @errorinfo.description
                h3 "Error: "..@errorinfo.name
                if config.testmode then code class: "hljs", ->
                    text @error_handler_info.err
                    text @error_handler_info.trace
