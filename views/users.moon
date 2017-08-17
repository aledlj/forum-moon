-- views/users.moon
import Widget from require "lapis.html"

class CategoryList extends Widget
    content: =>
        div class: "body", ->
            ul ->
              for user in *@users
                li ->
                  text user.name .. " " .. user.id
