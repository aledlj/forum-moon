print @latest_post_for

do
    i = 1
    for category in *@categories
    	if @latest_post_for[category.id] == nil
            continue
        timestamp = convert_date_to_timestamp(@latest_post_for[category.id][1].date)
        category.latestposttime = timestamp
        i += 1

@categories_ordered = {}

for key, category in pairs @categories
    if @latest_post_for[category.id] == nil
        continue
    table.insert @categories_ordered, {id: category.id, time: category.latestposttime}
    --@categories_ordered[category.id] = category

print "Category order:"

table.sort @categories_ordered, (a, b) ->
    a.time < b.time

for category in *@categories
    if @latest_post_for[category.id] != nil
        continue
    table.insert @categories_ordered, {id: category.id}

print @categories_ordered
