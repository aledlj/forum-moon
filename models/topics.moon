db = require "lapis.db"
import Model from require "lapis.db.model"

class Topics extends Model
    @relations: {
        {"category", belongs_to: "Categories", key: "category_id"}
        {"user", belongs_to: "Users"}
    }
