-- config.moon
config = require "lapis.config"
import config from require "lapis.config"

config "development", ->
    testmode 1
    port 8080
    secret ""
    session_name ""
    num_workers 1
    logging ->
        queries true
        requests true
    mysql ->
        host ""
        user ""
        password ""
        database ""


config "production", ->
    testmode 0
    port 80
    secret ""
    session_name ""
    num_workers 4
    logging ->
        queries true
        requests true
    mysql ->
        host ""
        user ""
        password ""
        database ""
    code_cache "on"
