require 'csv'
# args: 
# 0: file path
# 1: update contact flag, default: false

module SavePhoto
 def self.save_photo src,file
   puts "photo:#{src}---------------#{file}#{File.exist?(src)}"
  if File.exist?(src)
    uuidName=SecureRandom.uuid+File.extname(file)
    target=File.join(Rails.root,$AVATARPATH,uuidName)
       puts "photo:#{target}---------------------------------"
    FileUtils.cp(src,target)
    return File.join($AVATARPATH,uuidName)
  end
 end
end

Dir["#{ARGV[0]}/*.csv"].each do |f|
  #update_desc=ARGV[1]||0
  update_contact= ARGV[1].nil? ?  false : ARGV[1]=="1" 
  
  puts "importing: #{f}, update contact:#{update_contact},#{ARGV[1]}"
  tenant=Tenant.first
  CSV.foreach(f,:headers=>true,:col_sep=>';') do |row|
   if entity=Entity.find_by_id(row["EntityID"])
     entity.update_attributes(:description=>row["Description"]) unless row["Description"].blank?
     params={name:row["Name"],email:row["Email"],phone:row["Phone"],tel:row["Tel"],title:row["Title"]}
     avatar_path=File.join(ARGV[0],"avatar",row["Avatar"])
     # check contact
     if contact=Contact.find_by_email(row["Email"])
       # update contact
       if update_contact 
	    if avartar=SavePhoto.save_photo(avatar_path,row["Avatar"])
	       params[:image_url]=avartar
	end
	contact.update_attributes(params)
       end
     else 
	    if avartar=SavePhoto.save_photo(avatar_path,row["Avatar"])
	       params[:image_url]=avartar
	    end
       contact=Contact.new(params)
       contact.tenant=tenant
       contact.save
     end
     # check entity contact
     unless entity_contact=entity.entity_contacts.where(contact_id:contact.id).first
       entity_contact=EntityContact.new
       entity_contact.entity=entity
       entity_contact.contact=contact
       entity_contact.tenant=tenant
       entity_contact.save
     end
   end
  end
  puts "imported: #{f}"
end

