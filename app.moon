lapis = require "lapis"
db = require "lapis.db"
console = require "lapis.console"
config = require("lapis.config").get!

import Users, ForumSettings from require "models"

forumsettings = {}

for table in *ForumSettings\select!
    forumsettings[table.id] = table.value


test = 1

class extends lapis.Application
    layout: "layout"
    @before_filter =>
        @forum_title = forumsettings.title
        @page_title = forumsettings.title
        @testmode = config.testmode
        if test == 0 and @route_name != "list_users"
            @write redirect_to: @url_for "list_users"
    [home: "/"]: =>
        render: "categorylist"

    [list_users: "/users"]: =>
        @page_title = "Users - " .. forumsettings.title
        @users = Users\select! -- `select` all the users
        render: "users"

    "/console": console.make!
