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

  yui_css
end

pipeline 'scripts', 'www' do
  match '*.js'

  yui_js
end

pipeline 'assets', 'www' do
  match '*.png'
end
