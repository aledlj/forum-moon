-- views/category.moon
import Widget from require "lapis.html"

--io.input("./static/icons/SVG/Documents/Blue/Stroke/icon-114-lock.svg")
--lockicon = io.read("*all")
--lockicon = string.gsub(lockicon, "#157EFB", "#000000")

-- // Colors
-- $bg-color: #ff9f7c;
-- $triangle-color: #ffcc79;
--
-- // Dimensions
-- $triangle-size: 38px;
-- $triangle-size-half: $triangle-size / 2;
--
-- $color1: #ffffff;
-- $color2: #f5f5f5;
-- $color3: #ebebeb;
-- $color4: #c7c7c7;
-- $color5: #f0f0f0;
-- $color6: #e0e0e0;
-- $color6: #e6e6e6;
-- $color6: #dbdbdb;
--
-- body {
-- 	background: linear-gradient(315deg, transparent 75%, $color1 0)-$triangle-size-half 0,
--     linear-gradient(45deg, transparent 75%, $color2 0)-$triangle-size-half 0,
--     linear-gradient(135deg, $color3 50%, transparent 0) 0 0,
--     linear-gradient(45deg, $color4 50%, $color5 0) 0 0 $color6;
--     background-size: $triangle-size $triangle-size;
-- }

class Category extends Widget
    content: =>
        link async: true, "type": "text/css", rel: 'stylesheet', "data-turbolinks-track": "reload", href: "/static/fonts/hawcons/filled/style.css"

        @content_for "subheader", ->
             text @category.name

        div id: "category-table", ->
            div class: "table-header", ->
                div class: "table-header-cell", -> text "Topic"
                div class: "table-header-cell", -> text "Users"
                div class: "table-header-cell", -> text "Views"
                div class: "table-header-cell", -> text "Posts"
                div class: "table-header-cell", -> text "Activity"

            --text tostring(next(@topics) == nil)
            if next(@topics) == nil then
                div class: "empty", -> p -> a class: "colorbutton icon", ->
                    span class: "hawcons-icon-135-pen-angled"
                    text "Create topic"
            else
                for topic in *@topics
                    div class: "topic", "data-id": topic.id, ->
                        div class: "closed-icon", ->
                            if topic.closed == 1 then span class: "hawcons-icon-114-lock"
                        div class: "info", style: "display: inline-block", ->
                            h3 style: "position: relative", ->
                                text topic.subject
                            --div role: "button"
                        div class: "users", ->
                            for i, user in ipairs topic.latest_posters
                                a {
                                    class: "avatarlink"
                                    style: "background-image: url(/static/images/avatars/#{user.name}/#{user.avatar})", tooltip: if i == 1 then "#{user.name} - Latest Poster" else user.name
                                    title: if i == 1 then "#{user.name} - Latest Poster" else user.name
                                }

                        div class: "views", -> text "..." -- topic.views
                        div class: "post-count", -> text topic.post_count
                        div class: "activity", ->
                            a class: "relative-time", "data-timestamp": topic.latest_post_date, -> text "..." -- topic.views
        --                     h3 -> a href: @url_for("category", category: category.id), -> text category.name
        --                     span class: "indexdesc", category.description
        --             if latest_post == nil
        --                 div class: "latest-post", ->
        --                     span title: "No topics", "-"
        --                 div class: "activity", ->
        --                     span class: "relative-time", title: "No activity", "data-date": category.id, -> text "-"
        --             else
        --                 div class: "latest-post", ->
        --                 -- @latest_post_for[category.id]
        --                     a href: @url_for("topic", topic: latest_topic.id, post: latest_post.id), class: "indexsubject", latest_topic.subject
        --                 div class: "activity", ->
        --                     a href: @url_for("topic", topic: latest_topic.id, post: latest_post.id), class: "relative-time", "data-timestamp": latest_post.date, -> text "..."

        --script -> "relativeTime( '.relative-time' ); setInterval(relativeTime, 9000);"
