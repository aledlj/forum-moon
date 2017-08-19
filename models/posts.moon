db = require "lapis.db"
import Model from require "lapis.db.model"

class Posts extends Model
    @relations: {
        {"topic", belongs_to: "Topics"}
        {"user", belongs_to: "Users"}
    }
