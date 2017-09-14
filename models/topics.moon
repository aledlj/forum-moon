db = require "lapis.db"
import Model from require "lapis.db.model"

class Topics extends Model
    @relations: {
        {"category", belongs_to: "Categories"}
        {"author", belongs_to: "Users", key: "id"}
        {"latest_posts"
        field: "*, UNIX_TIMESTAMP(date)"
        has_many: "Posts"
        where: {binned: false}
        order: "date desc"}
    }
