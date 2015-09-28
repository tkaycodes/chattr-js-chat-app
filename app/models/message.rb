class Message < ActiveRecord::Base
  validates :body, presence: true


  # validations for testing js alert for message error messages :
    # validates :body, inclusion: { in: %w(small medium large), message: "%{value} is not a valid size" }
    # validates :body, length: { minimum: 2 }
end
