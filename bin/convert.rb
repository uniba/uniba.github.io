
require 'csv'
require 'json'

class Converter

  def initialize
    @data_dir =  File.dirname(File.expand_path(__FILE__)) + '/../data'
  end

  def exec
    Dir.glob("#{@data_dir}/*.csv") do |path|
      csv = CSV.open(path, return_headers: false, headers: :first_row)
      basename = File.basename(path, '.csv')
      method = "convert_#{basename}".to_sym
      result = (self.send(method, csv) rescue puts "WARNING: #{method} is undefined.")
      json_path = "#{@data_dir}/#{basename}.json"
      File.write(json_path, JSON.pretty_generate(result))
    end
  end

  def convert_events(csv)
    csv.to_a.map do |row|
      {
        publish: row[0],
        date: row[1],
        thumb_url: row[2],
        primary_url: row[3],
        title: row[4],
        description: row[5],
        # urls: row[6..9].select { |url| url =~ /^https?:\/\// }
      }
    end
  end

end

converter = Converter.new
converter.exec