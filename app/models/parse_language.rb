class ParseLanguage < ActiveRecord::Base
  HEADS = ["location", "working_type", "task_id"]


  def self.parse_display(name, value, language="en")

    return nil if name.blank?

    case value
      when "location"
        json = JSON.parse(File.read("data/cities_#{language}.json"))
        json.each do |a|
          a[1].each do |h|
            return h["code"] if h["name"] == name
          end
        end
      when "working_type"
        json = JSON.parse(File.read("data/working_types_#{language}.json"))
        json.each_with_index do |h , i|
          return h["code"] if h["name"] == name
        end
      when "task_id"
        json = JSON.parse(File.read("data/tasks_#{language}.json"))
        json.each_with_index do |h , i|
          return h["code"] if h["name"] == name
        end
    end

    return nil
  end

  def self.parse_code(code, value, language="en")

    return nil if name.blank?

    case value
      when "location"
        json = JSON.parse(File.read("data/cities_#{language}.json"))
        json.each do |a|
          a[1].each do |h|
            return h["name"] if h["code"] == code
          end
        end
      when "working_type"
        json = JSON.parse(File.read("data/working_types_#{language}.json"))
        json.each_with_index do |h , i|
          return h["name"] if h["code"] == code
        end
      when "task_id"
        json = JSON.parse(File.read("data/tasks_#{language}.json"))
        json.each_with_index do |h , i|
          return h["name"] if h["code"] == code
        end
    end

    return nil
  end

end