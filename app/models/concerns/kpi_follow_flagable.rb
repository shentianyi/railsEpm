module KpiFollowFlagable

    extend ActiveSupport::Concern
    included do
      after_save :update_follow_flag
      after_destroy :update_follow_flag



      def update_follow_flag

      end
    end
end