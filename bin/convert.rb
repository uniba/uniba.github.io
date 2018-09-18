
require 'csv'
require 'json'

class Converter

  def initialize
    @data_dir =  File.dirname(File.expand_path(__FILE__)) + '/../data'
  end

  def exec
    Dir.glob("#{@data_dir}/*.csv") do |path|
      csv = CSV.open(path, return_headers: false, headers: true)
      basename = File.basename(path, '.csv')
      method = "convert_#{basename}".to_sym
      result = (self.send(method, csv) rescue puts "WARNING: #{method} is undefined.")
      json_path = "#{@data_dir}/#{basename}.json"
      File.write(json_path, JSON.pretty_generate(result))
      puts "convert done."
    end
  end

  def convert_events(csv)
    csv.to_a.map do |row|
      {
        published: row[0],
        date: row[1],
        thumb_url: row[2],
        primary_url: row[3],
        title: row[4],
        description: row[5],
        documents: [
          { title: row[6], url: row[7] },
          { title: row[8], url: row[9] },
          { title: row[10], url: row[11] }
        ]
      }
    end
  end

end

converter = Converter.new
converter.exec