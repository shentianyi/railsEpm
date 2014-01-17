#ecnoding: utf-8
class PdfService
  def self.generate_analysis_pdf datas
    WickedPdf.new.pdf_from_string(ActionController::Base.new().render_to_string('templates/analysis_pdf',
                                                                                :layout => "pdfs/analysis",
                                                                                :locals => {:datas => datas}
                                                                                ))
  end
end
