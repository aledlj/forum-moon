-- views/missing.moon
import Widget from require "lapis.html"

class Missing extends Widget
    content: =>
        --@content_for "subheader", ->
        --     text "hello"

        div id: "error-banner", ->
            h1 @errortitle
            h2 @errordescription
