var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var del = require("del");
var webpack = require("webpack");
var browserSync = require("browser-sync").create();
var runSequence = require("run-sequence");
var minimist = require("minimist");


// Environment variables
var knownOptions = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development"
  }
};

var options = minimist(process.argv.slice(2), knownOptions);
global.isProduction = options.env === "production";


gulp.task("bs", function(cb){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./dist"
    }
  });
  cb();
});


gulp.task("bs:reload", function(cb){
  browserSync.reload();
  cb();
});


gulp.task("clean", function(cb){
  del([
    "./dist"
  ], cb);
});


gulp.task("copy-assets", function(){
  gulp.src("./assets/**/*", {base: "./assets/"})
  .pipe(gulp.dest("./dist"))
  .pipe(browserSync.stream());
});


gulp.task("jade", function(){
  gulp.src([
    "./src/jade/**/*.jade",
    "!./src/jade/**/_*.jade"
  ])
  .pipe($.plumber())
  .pipe($.data(function(){
    return require("./src/jade/config.json");
  }))
  .pipe($.jade({pretty: true}))
  .pipe(gulp.dest("./dist"))
  .pipe(browserSync.stream());
});


gulp.task("webpack", function(cb){
  webpack(require("./webpack.config.js"), function(err, stats){
    if( err ) throw new $.util.PluginError("webapck", err);
    $.util.log("[webpack]", stats.toString());
    browserSync.reload();
    cb();
  });
});


gulp.task("uglify", function(){
  gulp.src("./dist/js/**/*.js")
  .pipe($.uglify({preserveComments: "some"}))
  .pipe(gulp.dest("./dist/js"))
  .pipe(browserSync.stream());
});


gulp.task("sass", function(){
  var params = {};
  if( global.isProduction ){
    params.outputStyle = "compressed";
  }else{
    params.outputStyle = "expanded";
  }

  gulp.src("./src/sass/**/*.scss")
  .pipe($.plumber())
  .pipe($.sass.sync(params).on("error", $.sass.logError))
  .pipe($.autoprefixer({
    browsers: [
      "last 4 versions",
      "ie 9",
      "iOS 6",
      "Android 4"
    ]
  }))
  .pipe(gulp.dest("./dist/css"))
  .pipe(browserSync.stream());
});


gulp.task("build", function(cb){
  runSequence(
    "clean",
    "copy-assets",
    ["webpack", "sass", "jade"],
    "uglify",
    cb
  );
});


gulp.task("watch", function(cb){
  runSequence(
    "build",
    "bs",
    function(){
      $.watch("./assets/**/*", function(){
        gulp.start("copy-assets");
      });

      $.watch("./src/jade/**/*", function(){
        gulp.start("jade");
      });

      $.watch("./src/sass/**/*", function(){
        gulp.start("sass");
      });

      $.watch("./src/js/**/*", function(){
        gulp.start("webpack");
      });

      cb();
    }
  );
});


gulp.task("default", function(){
  gulp.start("watch");
});