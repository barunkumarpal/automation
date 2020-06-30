var themename = 'eshop_woo';

// You can declare multiple variables with one statement by starting with var and seperate the variables with a comma and span multiple lines.
// Below are all the Gulp Plugins we're using.
var gulp          = require('gulp'),  
      autoprefixer = require( 'gulp-autoprefixer' ),
      browserSync  = require( 'browser-sync' ).create(),
      reload  = browserSync.reload,      
      sass  = require( 'gulp-sass' ),
      concat  = require( 'gulp-concat' ),
      cleanCSS  = require( 'gulp-clean-css' ),
      sourcemaps  = require( 'gulp-sourcemaps' ),
      uglify  = require( 'gulp-uglify' ),
      lineec  = require( 'gulp-line-ending-corrector' );
        

    var root                 =  './' + themename + '/',
        cssRoot              = root + 'css/',  
        // allCss                = root + '**/*.css';      
         // concatCSSfile    = root + 'css/*.css'; 
        // concatCSSfile        = [
        //                         cssRoot + 'all_styles.css'      
        //                         ],
        jsRoot               = root + 'js/',        
        scssRoot             = root + 'scss/',
        all_scss             = scssRoot + '**/*.scss',
        concatScssfile       = [
                                  scssRoot + 'all_scss.scss'
                                ],
       phpWatchFiles         = root + '**/*.php';
      

    // Minifying Css

    // function concatCSS() {
    //   return gulp.src(concatCSSfile)  
    //   .pipe(concat('style.min.css'))
    //   .pipe(cleanCSS()) 
    //   .pipe(lineec()) 
    //   .pipe(gulp.dest(cssRoot));
    // }

    // Minifying Css end

    // For Scss testing
    var concatCSSfile        = [
      root + 'test_scss/all_scss.css'      
      ];
    function concatCSS() {
      return gulp.src(concatCSSfile)        
      .pipe(concat('all_min.css'))      
      .pipe(cleanCSS())       
      .pipe(lineec()) 
      .pipe(gulp.dest([root + 'test_scss']));
    }
    function convert_scss() {
      return gulp.src(concatScssfile)           
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer('last 2 versions'))       
      .pipe(lineec())
      .pipe(gulp.dest([root + 'test_scss']));
    }
    
    // For Scss testing end 
      
 var  all_Js = [
                jsRoot + 'jquery.min.js',
                jsRoot + 'jquery-migrate-3.0.0.js',
                jsRoot + 'jquery-ui.min.js',
                jsRoot + 'popper.min.js',
                jsRoot + 'bootstrap.min.js',
                //jsRoot + 'colors.js',
                jsRoot + 'slicknav.min.js',
                jsRoot + 'owl-carousel.js',
                jsRoot + 'magnific-popup.js',
                jsRoot + 'waypoints.min.js',
                jsRoot + 'finalcountdown.min.js',
                jsRoot + 'nicesellect.js',
                jsRoot + 'flex-slider.js',
                jsRoot + 'scrollup.js',
                jsRoot + 'onepage-nav.min.js',
                jsRoot + 'easing.js',
                jsRoot + 'active.js'      
              ];

     function concatJS() {
      return gulp.src(all_Js)
      .pipe(concat('all.min.js'))
      .pipe(uglify())
      .pipe(lineec())
      .pipe(gulp.dest(jsRoot));
    }
    
     

function watch() {
    browserSync.init({
      open: 'external',
      proxy: 'http://localhost/eshop_wootheme_custom/',
    });

    gulp.watch(all_scss, gulp.series([convert_scss, concatCSS])); // Scss to Css and then Css to minify
   // gulp.watch(concatCSSfile, concatCSS); // Only Css Minify
    gulp.watch(all_Js, concatJS); // JS Minify
    gulp.watch([phpWatchFiles, cssRoot+'style.min.css', jsRoot + 'all.min.js']).on('change', reload);
}

exports.css = convert_scss;
exports.concatCSS = concatCSS;
exports.javascript = concatJS;
exports.watch = watch;

//const build = gulp.series(watch);
var build = gulp.parallel(watch);
gulp.task('default', build);
