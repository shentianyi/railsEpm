class Story < ActiveRecord::Base
  attr_accessible :title, :description, :story_set_id, :comment_count, :chart_count
  belongs_to :user
  belongs_to :story_set
  has_many :chart_conditions, :as => :chartable, :dependent => :destroy
  has_many :attachments, :as => :attachable, :dependent => :destroy
  has_many :comments, :as => :commentable, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)


  after_create :save_chart_data_and_pub_message

  def save_chart_data_and_pub_message
    self.chart_conditions.each do |c|
      query = AnalyseService.chart_condition_filter(c)
      if query
        data = Entry::Analyzer.new(query).analyse
        KpiEntryAnalyseCache.new(id: c.id, cacheable_type: c.class.name, query: query.to_json, chart_data: data).save
      end
    end

    user_ids= StorySet.find_collaborator_set(self.story_set_id).select { |u| u.to_i!=self.user_id }
    UserMessage.add_new_story_messgage(user_ids)

    EventMessage.new(sender_id: self.user_id, receiver_ids:user_ids, content: self.title,
                     messageble_type: self.class.name, messageable_id: self.id,
                     type: EventMessageType::NEW_STORY).save

  end

  def self.detail_by_set_id id
    joins(:user).where(story_set_id: id).select('users.first_name as user_name,users.title as user_title,users.email, users.image_url as user_avatar,stories.*')
  end
end
