-- views/categorylist.moon
import Widget from require "lapis.html"

class CategoryList extends Widget
    content: =>
        div class: "body", ->
            p -> text "Welcome to Lapis #{require "lapis.version"}!"
            p -> a href: @url_for("list_users"), "Click here for the next page"
