class Story < ActiveRecord::Base
  attr_accessible :title, :description, :story_set_id
  belongs_to :user
  belongs_to :story_set
  has_many :chart_conditions, :as => :chartable, :dependent => :destroy
  has_many :attachments, :as => :attachable, :dependent => :destroy
  has_many :comments, :as => :commentable, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)


  after_create :save_chart_data

  def save_chart_data
    self.chart_conditions.each do |c|
      query = AnalyseService.chart_condition_filter(c)
      if query
        data = Entry::Analyzer.new(query).analyse
        KpiEntryAnalyseCache.new(id:c.id,cacheable_type: c.class.name,query: query.to_json, chart_data:data).save
      end
    end
  end

  def self.detail_by_set_id id
    joins(:user).where(story_set_id: id).select('users.first_name as user_name, users.image_url as user_avatar,stories.*')
  end
end
