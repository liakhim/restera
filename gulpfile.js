let preprocessor = 'sass';

const { src, dest, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

function styles(method=null) {
    let b = src(['src/scss/main.scss']) // источник
        .pipe(eval(preprocessor)()) // преобразуем значение переменной "preprocessor" в функцию
        .pipe(concat('app.min.css')) // конкатенируем в файл app.min.js
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // префиксы
        // TODO: расскоментировать для сжатия
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
        .pipe(dest('dist/css/')); // папка выгрузки
    return b;
    // return compress(b, method)
    //     .pipe(dest('assets/css/'))
    //     // .pipe(browserSync.stream()) // перезагружаем
}
function startwatch() {
    watch('src/scss/**/*').on('change', styles);
}
exports.default = parallel(styles, startwatch);
