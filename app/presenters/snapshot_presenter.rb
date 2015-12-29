#encoding: utf-8
class SnapshotPresenter<Presenter
  Delegators=[:id, :alert_id, :current_value, :lower_boundary, :upper_boundary, :user_id, :attachment_id, :created_at]
  def_delegators :@snapshot, *Delegators

  def initialize(snapshot)
    @snapshot=snapshot
    self.delegators =Delegators
  end

  def as_basic_info attach
    {
        alert_text: @snapshot.alert_id,
        current_value_text: @snapshot.current_value,
        upper_boundary_text: @snapshot.upper_boundary,
        lower_boundary_text: @snapshot.lower_boundary,
        chart_data: attach.chart_data,
        created_at: @snapshot.created_at,
        creator: UserPresenter.new(@snapshot.user).as_brief_info(false)
    }
  end

end
