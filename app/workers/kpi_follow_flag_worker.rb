#encoding: utf-8

class KpiFollowFlagWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :flag, :backtrace => true, :retry => true

  def perform(user_id, kpi_id)
    if (user=User.find_by_id(user_id)) && (kpi=Kpi.find_by_id(kpi_id))
      kpi_subscribs=kpi.kpi_subscribes.where(user_id: user_id)
      kpi_user_subscirbe=KpiUserSubscribe.where(user_id:user_id,kpi_id:kpi_id).first
      if kpi_user_subscirbe.nil?
        kpi_user_subscirbe= KpiUserSubscribe.new(kpi_id: kpi_id, user_id:  user_id, follow_flag: Kpi::KpiFollowFlag::NONE)
        kpi_user_subscirbe.tenant=user.tenant
        kpi_user_subscirbe.save
      end


      if kpi_subscribs.count==0
        kpi_user_subscirbe.update_attributes(follow_flag:Kpi::KpiFollowFlag::NONE)
      else
        user_department_ids=user.user_departments.pluck(:department_id).reject{|id| id.blank?}
        kpi_subscrib_department_ids=kpi_subscribs.pluck(:department_id)

        # p user_department_ids
        # p kpi_subscrib_department_ids
        # p user_department_ids-kpi_subscrib_department_ids
        # p (user_department_ids-kpi_subscrib_department_ids).size
        if(user_department_ids-kpi_subscrib_department_ids).size==0
          kpi_user_subscirbe.update_attributes(follow_flag:Kpi::KpiFollowFlag::ALL)
        else
          kpi_user_subscirbe.update_attributes(follow_flag:Kpi::KpiFollowFlag::PARTLY)
        end
      end
    end
  end
end
