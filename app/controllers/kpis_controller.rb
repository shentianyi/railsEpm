#encoding: utf-8
class KpisController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :require_user_as_admin, :only => :index
  before_filter :get_ability_category, :only => [:index, :access]
  before_filter :get_kpis_by_category, :only => [:categoried,:access]
  before_filter :get_user_entity_groups, :only => [:access]
  def index
    kpi_list
  end

  # create kpi
  def create
    msg=Message.new
    kpi=Kpi.new(params[:kpi].except(:kpi_properties))
    kpi.creator=current_user

    #kpi_properties
    attrs = []
    if params[:kpi].has_key?(:kpi_properties)
      params[:kpi][:kpi_properties].uniq.each { |name|

        if property = KpiProperty.find_by_name(name)
        else
          property = KpiProperty.new(:name => name)
          property.user = current_user
          property.tenant = current_tenant
          property.save
        end
        attrs << property
      }
    end
    if kpi.save
      kpi.add_properties(attrs)
      msg.result=true
      msg.object=KpiPresenter.new(kpi).to_json
    else
      kpi.errors.messages[:result]= I18n.t "fix.add_fail"
      msg.content=kpi.errors.messages.values.join('; ')
    end
    render :json => msg
  end

  # edit kpi
  def edit
    @kpi=Kpi.ability_find_by_id(params[:id], current_ability)
  end

  # update kpi
  def update
    if @kpi=Kpi.ability_find_by_id(params[:kpi].delete(:id), current_ability)
      render :json => @kpi.update_attributes(params[:kpi])
    end
  end

  # delete kpi
  def destroy
    msg=Message.new
    if @kpi=Kpi.accessible_by(current_ability).find_by_id(params[:id])
      if @kpi.kpi_parent_items.count==0
        msg.result=@kpi.destroy
      else
        msg.content= I18n.t "fix.cannot_destroy_contain_kpi"
      end
    end
    render :json => msg
  end

  def assign
    msg=Message.new
    if user=User.find_by_id(params[:user])
      if user.entity_id.blank?
        msg.content = I18n.t "fix.user_entity_is_blank"
      else
        if result= KpisHelper.assign_kpi_to_user_by_id(params[:kpi], user, params[:by_cate].nil?) and result[0]
          msg.content =result
          msg.result =true
        else
          msg.content = I18n.t "fix.kpi_assign_fail"
        end
      end
    else
      msg.content = I18n.t "fix.user_no_exists"
    end
    render json: msg
  end

  #@function properties
  #get all kpi properties
  def properties
    @kpi_properties =KpiPropertyPresenter.init_json_presenters(Kpi.find_by_id(params[:id]).kpi_properties)
    render :json => @kpi_properties
  end

  def group_properties
    @properties=KpiPropertyValue.by_kpi_id(params[:id]).all
    render json: KpiPropertyPresenter.to_group_select(@properties)
  end

  def x_groups
    render json: XGroupType.get_x_group(Kpi.find_by_id(params[:id]))
  end

  #@function remove_properties
  def remove_properties
    msg = Message.new
    msg.result = false
    if item = KpiPropertyItem.find_by_id(params[:id]) #KpiPropertyItem.where(kpi_id: params[:kpi_id], kpi_property_id: params[:kpi_property_id])
      item.destroy
      msg.result = true
    end
    render :json => msg
  end

  #@function assign_properties
  #@params kpi_id,kpi_property_name
  #if kpi_property not found ,create a new one
  def assign_properties
    msg = Message.new
    msg.result = false
    kpi_property = KpiProperty.where("BINARY name = ?", params[:kpi_property_name]).first #KpiProperty.find_by_name(params[:kpi_property_name])
    kpi = Kpi.find_by_id(params[:id])
    if kpi_property.nil?
      kpi_property = KpiProperty.create(:name => params[:kpi_property_name], :user_id => current_user.id)
    end

    if kpi && kpi_property
      if KpiPropertyItem.where(kpi_id: kpi.id, kpi_property_id: kpi_property.id).first
        msg.content = I18n.t "manage.kpi.dimensions-same-error"
      else
        kpi_property_item = KpiPropertyItem.new
        kpi_property_item.kpi_property_id = kpi_property.id
        kpi_property_item.kpi_id = kpi.id
        msg.result = kpi_property_item.save
        msg.content = {id: kpi_property_item.id, name: kpi_property.name}
      end

    else
      msg.content = I18n.t "manage.kpi.dimensions-kpi-not-fount"
    end
    render :json => msg
  end

  def categoried
    render json: KpiSelectPresenter.init_json_presenters(get_kpis_by_category(params[:id]))
  end

  def user
    @user_kpis=KpisHelper.get_kpis_by_user_id params[:id], current_ability
    render :partial => 'user'
  end

  def access
    kpi_list
  end

  def list
    get_kpis_by_category params[:id]
    render :partial => 'list'
  end

  def subscribe

  end

  def access_list
    get_kpis_by_category params[:id]
    render :partial => 'access'
  end

  def condition
    render :json => {:unit => KpiUnit.all,
                     :frequency => EnumPresenter.init_json_presenters(KpiFrequency.all),
                     :direction => EnumPresenter.init_json_presenters(KpiDirection.all),
                     :base => Kpi.base_kpis(current_ability)}
  end

  def import
    msg=Message.new
    ActiveRecord::Base.transaction do
      if template_category= Admin::KpiCategoryTemplate.find_by_id(params[:category])
        count=KpiCategory.accessible_by(current_ability).where(:name => template_category.name).count
        name = count==0 ? template_category.name : "#{template_category.name}_#{SecureRandom.uuid}"
        category=KpiCategory.new(:name => name, :description => template_category.description)
        category.tenant=current_tenant
        check={}
        params[:kpis].each do |kpi_id|
          t= Admin::KpiTemplate.find_by_id(kpi_id)
          formula=t.formula
          if t.is_calculated
            KpisHelper.parse_formula_items(t.formula).each do |item|
              unless check[item]
                tt=Admin::KpiTemplate.find_by_id(item)
                kpi=generate_kpi_by_template tt, category, nil
                kpi.save
                check[item]=kpi.id
              end
              formula.gsub!(Regexp.new("\\[#{item}\\]"), "[#{check[item]}]")
            end
          end
          kpi= generate_kpi_by_template t, category, formula
          kpi.save
          check[kpi_id]=kpi.id
        end
        category.save
        msg.result=true
        msg.object=category.id
        msg.content=category.name
      end
    end
    render :json => msg
  end

  def template
    @admin_kpi_templates= if category=Admin::KpiCategoryTemplate.find(params[:id])
                            category.admin_kpi_templates
                          else
                            []
                          end
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: @admin_kpi_templates }
    end
  end

  def download_entry_template
    kpis=current_user.kpis
    msg=FileHandler::Excel::KpiHandler.download_entry_template(current_user, kpis)
    send_file msg.content,filename:"#{current_user.first_name}_#{t 'fix.user_template_name'}.xlsx"
  end

  private

  def generate_kpi_by_template t, category, formula
    kpi=Kpi.new(:name => t.name, :description => t.description, :frequency => t.frequency,
                :direction => t.direction, :target_max => t.target, :target_min => t.target, :unit => t.unit,
                :is_calculated => t.is_calculated, :formula_string => t.formula_string, :formula => formula,
                :kpi_category_id => category.id)
    kpi.creator=current_user
    kpi.kpi_category=category
    return kpi
  end

  def kpi_list
    @active_category_id= params[:id].nil? ? (@categories.length>0 ? @categories[0].id : nil) : params[:id].to_i
    get_kpis_by_category(@active_category_id) if @active_category_id
  end
end
