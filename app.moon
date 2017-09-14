moon = require "moon"
lapis = require "lapis"
--db = require "lapis.db"
console = require "lapis.console"
config = require("lapis.config").get!
import capture_errors, assert_error, yield_error from require "lapis.application"
import preload from require "lapis.db.model"
import get_error_messages from require "misc.errors"
util = require "lapis.util"

import ForumSettings, Users, UserSettings, Categories, Topics, Posts, UserReports from require "models"

sortcategories = false
temptimeswitch = true
noorder = true

class extends lapis.Application
    layout: "layout"
    @before_filter =>
        @forumsettings = {}

        for setting in *ForumSettings\select!
            @forumsettings[setting.id] = setting.value

        @forum_title = @forumsettings.title
        @page_title = @forumsettings.title
        --if test == 0 and @route_name != "list_users"
        --    @write redirect_to: @url_for "list_users"

    [home: "/"]: capture_errors {
        on_error: =>
            switch @errors[1]
                when "missing"
                    @errorinfo = get_error_messages "no_categories"
                    render: "error", status: 200
        =>
            ---- method 1 - DB
            preload Categories, "latest_topics"
            preload Topics, "category", "user", "latest_posts"
            preload Posts, "topic"

            @categories = Categories\select!
            --@categories = {}

            if @categories == nil or next(@categories) == nil
                yield_error "missing"

            @latest_post_for, @latest_topic_for = {}, {}

            for category in *@categories
                --print category.id
                topics = category\get_latest_topics!
                if next(topics) == nil then continue

                topiclist = {}
                do
                    i = 1
                    for topic in *topics
                        topiclist[i] = topic.id
                        i += 1

                post = Posts\find_all topiclist, {
                    key: "topic_id"
                    where:
                        binned: false
                    clause: "order by date desc limit 1"
                }

                if next(post) == nil then continue

                @latest_post_for[category.id] = post[1]
                @latest_post_for[category.id].time_ago_in_words = util.time_ago_in_words post[1].date
                @latest_topic_for[category.id] = Topics\find post[1].topic_id

            for category in *@categories
                if category.order == nil
                    category.order = category.id

            table.sort @categories, (a, b) -> a.order < b.order

            render: "categorylist"
        }

    [list_users: "/users"]: =>
        @page_title = "Users - " .. @forumsettings.title
        @users = Users\select! -- `select` all the users
        render: "users"

    [category: "/category/:category"]: capture_errors {
        on_error: =>
            switch @errors[1]
                when "missing"
                    @errorinfo = get_error_messages "no_category"
                    render: "error", status: 404
                when "database_error"
                    @errorinfo = get_error_messages "database_error"
                    @error = true
                    render: "error", status: 500
        =>
            @category = Categories\find @params.category
            if @category == nil or next(@category) == nil
                yield_error "missing"

            --allinbin = Topics\select "where category_id = ?", @category.id, "max(topics.binned) = 1 and min(topics.binned) = 1 and topics.binned is not null)"

            @topics = Topics\select [[
                inner join posts on posts.topic_id = topics.id
                where category_id = ? and topics.binned = false
                group by topics.id
                order by latest_post_date desc]],
                @category.id, fields: "topics.subject, topics.date, topics.category_id, topics.id, topics.closed, posts.topic_id, max(posts.date) as latest_post_date, count(posts.id) as post_count"

            @latest_posters_in_topic = {}
            unless @topics == nil or next(@topics) == nil
                for topic in *@topics
                    participating_users = Topics\select [[
                        inner join posts on posts.topic_id = topics.id
                        inner join users on users.id = posts.author
                        where topics.id = ? and topics.binned = false
                        group by users.id
                        order by max(posts.date) desc]],
                        topic.id, fields: "DISTINCT users.name, users.id, users.avatar, topics.id, posts.author"

                    topic.latest_posters = participating_users


            --topic_ids = [v.id for v in *@topics]
            --if next(@topics) == nil then print "no topics?"

            -- @post = Posts\find_all @topics, {
            --     key: "topic_id"
            --     clause: "unix_timestamp(date)"
            --     where:
            --         binned: false
            --     clause: "order by date desc limit 1"
            -- }

            -- if next(post) == nil then print "no posts?"

            -- @latest_post_for[category.id] = post[1]
            -- @latest_post_for[category.id].time_ago_in_words = util.time_ago_in_words post[1].date
            -- @latest_topic_for[category.id] = Topics\find post[1].topic_id

            render: true
        }

    [topic: "/topic/:topic/:post"]: capture_errors {
        on_error: =>
            switch @errors[1]
                when "missing"
                    @errorinfo = get_error_messages "missing"
                    render: "error", status: 404
        =>
            "#{@params.name}"
            --render: "users"
        }

    handle_404: =>
        @errorinfo = get_error_messages "error_404"
        @errors = {"error_404"}
        @error = true
        render: "error", status: 404

    handle_error: (err, trace) =>
        @errorinfo = get_error_messages "non_recoverable"
        @page_title = "Error"
        @errors = {"non_recoverable"}
        @error = true
        @error_handler_info = {:err, :trace}
        render: "error", status: 500

    --[testpanel: "/test"]:


    "/console": console.make!
