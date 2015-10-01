class User < ActiveRecord::Base
  has_many :messages


  # all users who were last made a post request within the x unit of time
  def self.online_now
    where("last_seen >= ?", Time.now-2.seconds)
  end

end
