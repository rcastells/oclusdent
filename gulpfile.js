var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var beep = require('beepbeep');
var colors = require('colors');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var ghPages = require('gulp-gh-pages');
var include = require('gulp-include');
 
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

var onError = function(err) {
  beep([200, 200]);
  console.log(
    '\n\n****************************************************\n'.bold.gray +
    '*****************'.bold.gray + ' \(╯°□°)╯'.bold.red + ' ︵ '.bold.gray +'ɹoɹɹǝ '.bold.blue + '*****************'.bold.gray +
    '\n****************************************************\n\n'.bold.gray +
    String(err) +
    '\n\n*******************************************************\n\n'.bold.gray );
  this.emit('end');
};


var input = 'src/SCSS/*.scss';
var output = 'dist/css';

gulp.task("scripts", function() {
  console.log("-- gulp is running task 'scripts'");
 
  gulp.src("src/js/scrolling-nav.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output));
});

gulp.task('css', function() {
return gulp.src('src/SCSS/*.scss')
	.pipe(plumber({
		errorHandler: onError
	}))
	.pipe(sass())
	.pipe(autoprefixer({
		browsers:[
		'last 2 versions',
		'>1%'
		]
	}))
	.pipe(gulp.dest('dist/css'))
});

gulp.task('html', function(){
return gulp.src('src/*.html')
	.pipe(gulp.dest('dist'))
});

gulp.task('img', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('default', ['css','html'], function() {
    browserSync.init({
        server: {baseDir: "./dist"}, 
        files:['./dist/css/main.css','./dist/*.html']
    });
    gulp.watch('src/scss/**/*.scss',['css']);
    gulp.watch('src/*.html',['html']);
    gulp.watch('src/js/*.js',['scripts']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload)
});



