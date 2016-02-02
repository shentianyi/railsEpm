module Alert
  class ItemPresenter<Presenter
    Delegators=[:id, :alertable, :alertable_id, :alertable_type, :status, :type, :user_id, :handle_type, :text,:target_id, :created_at]
    def_delegators :@item, *Delegators

    def initialize(item)
      @item=item
      self.delegators =Delegators
    end

    def unread?
      self.status==Status::UNREAD
    end

    def body_data
      if self.type==Alert::Type::TASK
        {
            id: self.alertable.id,
            due_flag: self.alertable.due?,
            to_due_at: self.alertable.to_due_at,
            dued_at: self.alertable.dued_at
        }
      else
        {
            id: self.target_id
        }
      end
    end

    def as_brief_info
      {
          head: {
              alert_id: self.id,
              alert_type: self.type,
              alert_text: self.text,
              created_at: self.created_at,
              sender: 'System' # TODO design alert sender
          },
          unread: self.unread?,
          handle_type: {
              id: self.handle_type,
              name: HandleType::MANUAL
          },
          data: self.body_data
      }
    end


    def self.as_brief_infos(items)
      infos=[]

      items.each do |item|
        infos<< self.new(item).as_brief_info
      end

      infos
    end
  end
end