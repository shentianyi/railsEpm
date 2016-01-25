module Task
  class EntryItem<Task::Item
    default_scope { where(type: Task::Type::ENTRY) }
  end
end