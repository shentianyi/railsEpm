#encoding: utf-8

config=YAML.load(File.open("#{Rails.root}/config/config.yaml"))
# load format
format_config=config['format']
$CSVSP=format_config[:csv_splitor] # csv splitor
$UPMARKER=format_config[:update_marker]
$FILE_MAX_SIZE=format_config[:file_max_size]
#load path
path_config=config['path']
$UPDATAPATH=path_config[:updata_file_path]
$DOWNLOADPATH=path_config[:download_file_path]
$TEMPLATEPATH=path_config[:template_file_path]
$KPI_ENTRY_PATH=path_config[:kpi_entry_file_path]
$AVATARPATH=path_config[:avatar_file_path]
$EMAILATTACHPATH=path_config[:email_file_path]
$AttachTmpPath=path_config[:attach_tmp_path]
$AttachPath=path_config[:attach_path]

$DEFAULT_TIME_ZONE='+08:00'
$ZONE_HOUR_OFFSET=Time.zone_offset($DEFAULT_TIME_ZONE)/(3600)

$BACKGROUND_TASK=BackgroundTaskType::SIDEKIQ

$tmp_file_path=path_config[:tmp_file_path]

$APP_ID='Spider Man'

$API_AUTH=false