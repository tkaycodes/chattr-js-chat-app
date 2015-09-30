json.array! @messages do |message|
  json.id          message.id
  json.body        message.body
  json.user        message.username
  json.created_at  time_ago_in_words(message.created_at)
end

