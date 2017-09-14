db = require "lapis.db"
import Model from require "lapis.db.model"

class Categories extends Model
    @relations: {
        {"latest_topics"
            has_many: "Topics"
            where: {binned: false}
            order: "date desc"}
        {"topics"
            has_many: "Topics"
            where: {binned: false}}
        }
