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
   if contactable=row["Model"].constantize.find_by_id(row["ID"])
     contactable.update_attributes(:description=>row["Description"]) unless row["Description"].blank?
     contactable.update_attributes(:code=>row["Code"]) unless row["Code"].blank? if ["EntityGroup"].include?(row["Model"])
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
     # check contactable contact
     unless contactable_contact=contactable.entity_contacts.where(contact_id:contact.id).first
       contactable_contact=contactable.entity_contacts.build
       # contactable_contact.contactable=contactable
       contactable_contact.contact=contact
       contactable_contact.tenant=tenant
       contactable_contact.save
     end
   end
  end
  puts "imported: #{f}"
end

