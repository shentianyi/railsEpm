#encoding: utf-8
class KpisController < ApplicationController
  # before_filter :get_ability_category,:only=>[:index,:assign],:if=>lambda{|c|   action_name=="assign" ? request.get?  : true}
  before_filter :get_ability_category,:only=>:index
  before_filter :get_kpis_by_category,:only=>:categoried
  def index
    @active_category_id= params[:id].nil? ? ( @categories.length>0 ? @categories[0].id : nil ) : params[:id].to_i
    (get_kpis_by_category @active_category_id) if @active_category_id
    @units=KpiUnit.all
    @frequencies=KpiFrequency.all
    @directions=KpiDirection.all
    @base_kpis=Kpi.base_kpis  current_ability
  end

  # create kpi
  def create
    msg=Message.new
    @kpi=Kpi.new(params[:kpi])
    @kpi.creator=current_user
    if @kpi.save
      temp = {}
      msg.result=true
      temp[:id] = @kpi.id
      temp[:name]=@kpi.name
      temp[:is_calculated] = @kpi.is_calculated
      temp[:formula_string] = @kpi.formula_string
      temp[:interval] = KpiFrequency.get_desc_by_value(@kpi.frequency)
      temp[:trend] = KpiDirection.get_desc_by_value(@kpi.direction)
      temp[:target_max] = KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_max)
      temp[:target_min] = KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_min)
      temp[:section] = KpiUnit.get_entry_unit_sym(@kpi.unit)
      temp[:desc] = @kpi.description
    msg.object=temp.as_json
    else
      @kpi.errors.messages[:result]="添加失败"
      msg.content=@kpi.errors.messages.values.join('; ')
    end
    render :json=>msg
  end

  # edit kpi
  def edit
    @kpi=Kpi.ability_find_by_id(params[:id],current_ability)
  end

  # update kpi
  def update
    if @kpi=Kpi.ability_find_by_id(params[:kpi].delete(:id),current_ability)
      render :json=>@kpi.update_attributes(params[:kpi])
    end
  end

  # delete kpi
  def destroy
    msg=Message.new
    if @kpi=Kpi.accessible_by(current_ability).find_by_id(params[:id])
      if @kpi.kpi_parent_items.count==0
      msg.result=@kpi.destroy
      else
        msg.content='can not destroy, as basci kpi'
      end
    end
    render :json=>msg
  end

  def assign
    render :json=> KpisHelper.assign_kpi_to_user_by_id( params[:kpi],params[:user],current_ability)
  end

  def categoried
    render :json=>get_kpis_by_category(params[:id])
  end

  def user
    @user_kpis=KpisHelper.get_kpis_by_user_id params[:id],current_ability
    render :partial=>'user'
  end

  def list
    get_kpis_by_category  params[:id]
    render :partial=>'list'
  end

  def import
    msg=Message.new
    ActiveRecord::Base.transaction do
      if template_category= Admin::KpiCategoryTemplate.find_by_id(params[:category])
        count=KpiCategory.accessible_by(current_ability).where(:name=>template_category.name).count
        name = count==0 ? template_category.name : "#{template_category.name}_#{SecureRandom.uuid}"
        category=KpiCategory.new(:name=>name,:description=>template_category.description)
        category.tenant=current_tenant
        check={}
        params[:kpis].each do |kpi_id|
          t= Admin::KpiTemplate.find_by_id(kpi_id)
          formula=t.formula
          if t.is_calculated
            KpisHelper.parse_formula_items(t.formula).each do |item|
              unless check[item]
                tt=Admin::KpiTemplate.find_by_id(item)
                kpi=generate_kpi_by_template tt,category,nil
              kpi.save
              check[item]=kpi.id
              end
              formula.gsub!(Regexp.new("\\[#{item}\\]"),"[#{check[item]}]")
            end
          end
          kpi= generate_kpi_by_template t,category,formula
          kpi.save
          check[kpi_id]=kpi.id
        end
      category.save
      msg.result=true
      msg.object=category.id
      msg.content=category.name
      end
    end
    render :json=>msg
  end

  def template
    @admin_kpi_templates= if category=Admin::KpiCategoryTemplate.find(params[:id])
          category.admin_kpi_templates
        else
          []
    end
    respond_to do |format|
      format.html {render 'index'}
      format.json { render json: @admin_kpi_templates }
    end
  end

  private

  def generate_kpi_by_template t,category,formula
    kpi=Kpi.new(:name=>t.name,:description=>t.description,:frequency=>t.frequency,
    :direction=>t.direction,:target_max=>t.target_max,:target_min=>t.target_min,:unit=>t.unit,
    :is_calculated=>t.is_calculated,:formula_string=>t.formula_string,:formula=>formula,
    :kpi_category_id=>category.id)
    kpi.creator=current_user
    kpi.kpi_category=category
    return kpi
  end
end