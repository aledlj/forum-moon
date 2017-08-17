lapis = require "lapis"
console = require "lapis.console"
db = require "lapis.db"

import Users from require "models"

class extends lapis.Application
    layout: "layout"
    [home: "/"]: =>
        @title = "Home"
        render: "categorylist"

    [list_users: "/users"]: =>
        @users = Users\select! -- `select` all the users
        render: "users"

    "/console": console.make!
