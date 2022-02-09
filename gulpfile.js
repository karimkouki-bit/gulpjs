// npm init
// npm i gulp -g
// npm i --save-dev gulp 
// npm i --save-dev gulp-concat
// npm i --save-dev gulp-autoprefixer
// npm i --save-dev gulp-sass
// npm i --save-dev gulp-pug
// npm i --save static-server
// npm i --save-dev gulp-livereload
// npm i --save-dev gulp-sourcemaps
// npm i vinyl-ftp --save-dev

// your first task
var gulp = require('gulp');
var concat = require('gulp-concat')
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass')
var pug = require('gulp-pug');
var livereload = require('gulp-livereload')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify');
var zip = require('gulp-zip')
// html task
gulp.task('html', function(){
    
    return gulp.src('project/index.pug')
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest('dist'))
            .pipe(livereload())
})

gulp.task('karim', function(){
    return gulp.src(['project/contact.html', 'project/main.css']) /** return gulp.src('project/*.html'), return gulp.src(['project/contact.html', 'project/main.css'])*/
           .pipe(gulp.dest('dist'))
})

gulp.task('css', function(){
    return gulp.src('project/footer.css')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(prefix('last 2 versions'))
           .pipe(concat('main.css'))
           .pipe(sourcemaps.write())
           .pipe(gulp.dest('dist'))
           .pipe(livereload())
})

gulp.task('js', function(){
    return gulp.src('project/js/*.js')
             .pipe(concat('all.js'))
             .pipe(uglify())
             .pipe(gulp.dest('dist/js'))
             .pipe(livereload())
})
// compress file
gulp.task('compress', function(){
    return gulp.src('dist/**/*.*')
           .pipe(zip('website.zip'))
           .pipe(gulp.dest('.'))
})
gulp.task('watch', function(){
    require('./server');
    livereload.listen();
    gulp.watch('project/index.pug', gulp.series['html'])
    gulp.watch('project/js/*.js', gulp.series['js'])
})