#encoding: utf-8
module KpisHelper
	# get kpi formula items
	def self.get_formula_item formula
        	formula.scan(/\[\d+\]/).map{|item| /\d+/.match(item).to_s}
	end
end
