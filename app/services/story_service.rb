class StoryService
  def self.add_chart_condition condition,story
    c = ChartCondition.new(condition)
    story.chart_conditions<< c
    return story.chart_conditions
  end
end