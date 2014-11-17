# Piperun 0.1.2 needed

pipeline 'styles', 'www' do
  parallel do
    run do
      match '*.sass', '*.scss'
      sass
    end

    run do
      match '*.css'
    end
  end
end

pipeline 'scripts', 'www' do
  match '*.js'
end
