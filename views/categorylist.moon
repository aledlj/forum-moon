-- views/categorylist.moon
import Widget from require "lapis.html"

class CategoryList extends Widget
    content: =>
        --@content_for "subheader", ->
        --     text "hello"

        div id: "categorylist-table", ->
            div class: "table-header", ->
                div class: "table-header-cell", -> text "Category"
                div class: "table-header-cell", -> text "Last post"
                div class: "table-header-cell", -> text "Activity"

            for category in *@categories
                if category.id == 0 then continue
                latest_post = @latest_post_for[category.id]
                latest_topic = @latest_topic_for[category.id]
                div class: "category", "data-id": category.id, ->
                    div class: "info", style: "display: inline-block", ->
                            h3 -> a href: @url_for("category", category: category.id), -> text category.name
                            span class: "indexdesc", category.description
                    if latest_post == nil
                        div class: "latest-post", ->
                            span title: "No topics", "-"
                        div class: "activity", ->
                            span class: "relative-time", title: "No activity", "data-date": category.id, -> text "-"
                    else
                        div class: "latest-post", ->
                        -- @latest_post_for[category.id]
                            a href: @url_for("topic", topic: latest_topic.id, post: latest_post.id), class: "indexsubject", latest_topic.subject
                        div class: "activity", ->
                            a href: @url_for("topic", topic: latest_topic.id, post: latest_post.id), class: "relative-time", "data-timestamp": latest_post.date, -> text "..."
        
        --script -> "relativeTime( '.relative-time' ); setInterval(relativeTime, 9000);"
