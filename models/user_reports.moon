db = require "lapis.db"
import Model from require "lapis.db.model"

class UserReports extends Model
    @relations: {
        {"user", belongs_to: "Users"}
    }
