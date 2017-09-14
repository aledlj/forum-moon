-- views/missing.moon
import Widget from require "lapis.html"

class NoCategories extends Widget
    content: =>
        --@content_for "subheader", ->
        --     text "hello"

        div id: "missing-page", ->
            h1 @errortitle
            h2 @errordescription
            p "a"
