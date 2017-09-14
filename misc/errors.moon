errorinfo = {
    no_categories:
        name: "No categories"
        title: "There's no categories"
        description: "No categories have been created yet."
    no_category:
        name: "No category"
        title: "There's nothing here"
        description: "The category does not exist. It may have been deleted, or it may have never existed at all."
    error_404:
        name: "Missing or non-existant route"
        title: "There's nothing here"
        description: "The page you tried to go to doesn't exist."
    database_error:
        name: "Database error"
        title: "Error"
        description: "A server error occured. Please report this to the forum administration."
    non_recoverable:
        name: "Non-recoverable error"
        title: "Error"
        description: "A server error occured. Please report this to the forum administration."
}

get_error_messages = (err) ->
    {
        name: errorinfo[err].name,
        title: errorinfo[err].title,
        description: errorinfo[err].description
    }

{:get_error_messages}
