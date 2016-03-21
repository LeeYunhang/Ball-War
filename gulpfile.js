"use strict";

var gulp =  require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var watch = require('gulp-watch');
var Server = require('karma').Server;
$.runSequence = require('run-sequence');
$.connectServer = require('gulp-connect');
$.openURL = require('open');

let config = {
  app:'app',
  dist: 'dist',
  port: 9003,
  mainScript: 'app.js',
  mainCss: 'main.css'
};

let paths = {
  scripts: config.app + '/scripts/**/*.js',
  html: config.app + '/**/*.html',
  views: config.app + '/views/.html',
  build: {
    script: config.dist + '/scripts',
    style: config.dist + '/styles',
    view: config.dist + '/views'
  },
  styles: config.app + '/styles/**/*.css',
  tmp: './.tmp'
}

let lintScripts = ()=> {
  return gulp.src(paths.build.scripts + '/' + config.mainScript)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
};

gulp.task('lint:scripts', ()=> {
  return lintScripts();
});

gulp.task('default', () => {
  console.log('这是一个默认的任务');
});

gulp.task('start:server', ()=> {
  $.connectServer.server({
    root: [config.dist, 'bower_components'],
    livereload: true,
    port: config.port
  });
});

gulp.task('concat', ()=> {
  return gulp.src([paths.scripts, `!${config.app}/scripts/hilo/**/*.js`])
    .pipe($.concat(config.mainScript))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('styles', ()=> {
  return gulp.src(paths.styles)
    .pipe($.concat(config.mainCss))
    .pipe(gulp.dest(paths.build.style));
});

gulp.task('move:views', ()=> {
    return gulp.src(paths.views)
      .pipe(gulp.dest(paths.build.view));
});

gulp.task('move:index', ()=> {
    return gulp.src(           config.app + '/index.html')
      .pipe(gulp.dest(config.dist));
});

gulp.task('start:client', ['start:server'], ()=> {
    $.openURL('http://localhost:' + config.port);
});

gulp.task('angular', ()=> {
  return gulp.src('bower_components/angular/angular.min.js').pipe(gulp.dest(paths.build.script));
});

//--------------------bootstrap ---begin
gulp.task('bootstrap:', ()=> {
    gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest(paths.build.style));
});

gulp.task('jquery', ()=> {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
      .pipe(gulp.dest(paths.build.script));
});

gulp.task('bootstrap:js', ()=> {
    gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest(paths.build.script));
});
//--------------------bootstrap ---end



//babel任务, 用于将ES6的代码编译成ES5的JS代码 并且压缩
gulp.task('babel', ()=>gulp.src(paths.tmp + '/app.js')
    .pipe($.babel({presets:['es2015']}))
    //.pipe($.uglify())
    .pipe(gulp.dest(paths.build.script)));

  gulp.task('copy:imgs', ()=> {
    gulp.src(config.app + '/')
  });

gulp.task('copy:hilo', ()=> {
  gulp.src(`${config.app}/scripts/hilo/**/*.js`)
    .pipe(gulp.dest(`${paths.build.script}/hilo`));
});

gulp.task('clean:tmp', ()=> fs.unlink(paths.tmp + '/' + config.mainScript, (err, text)=> {}));
gulp.task('clean:dist', ()=> fs.unlink(paths.build.script + '/' + config.mainScript, (err, text)=> {}));

//清理项目  检查脚本  链接   压缩   编译成ES5代码
gulp.task('build',
    cb=> $.runSequence(['clean:tmp', 'clean:dist'],
        ['concat', 'move:views', 'move:index', 'styles', 'bootstrap:', 'bootstrap:js', 'jquery', 'copy:hilo'],
        'babel', 'lint:scripts', 'angular', cb));

gulp.task('refresh', ()=> {
  gulp.src([paths.styles, paths.html, paths.scripts]).pipe($.connectServer.reload());
});

gulp.task('watch', ()=> {
  gulp.watch([paths.styles, paths.html, paths.scripts], ['build', 'refresh']);
});

gulp.task('serve', cb => $.runSequence('build', 'start:client', 'watch', cb));

gulp.task('test', done=> {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    files: [
      __dirname + '/bower_components/angular/angular.js',
      __dirname + '/dist/scripts/app.js',
      __dirname + '/bower_components/angular-mocks/angular-mocks.js',
      __dirname + '/test/test.js',

      // __dirname + '/dist/scripts/**/!(angular.min.).js'
    ],
  }, done).start();
});
