json.array! @messages do |message|
  json.id          message.id
  json.body        message.body
  json.user_name   message.user.name if message.user
  json.user_id     message.user.id   if message.user
  json.created_at  time_ago_in_words(message.created_at)
end

