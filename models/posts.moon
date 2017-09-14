db = require "lapis.db"
import Model from require "lapis.db.model"

class Posts extends Model
    @relations: {
        {"topic", belongs_to: "Topics"}
        {"author", belongs_to: "Users", key: "id"}
    }
