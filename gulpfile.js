
  //引入gulp
 var gulp = require("gulp");
  //引入gulp-sass  css插件
 var sass =require("gulp-sass");
  //引入gulp-less  css插件
 var less =require("gulp-less");
  //引入服务器
 var  connect =require("gulp-connect");
 gulp.task("server",function(){
      connect.server({
        root:'dist', //服务器访问的目录
        livereload:true //浏览器时实刷新
      });
 })  

  //task添加任务
  // gulp.task("hello",function(){
  // 	console.log("你好我输出了");
  // })
  // gulp.task("basic",["hello"]);  //命令执行 gulp basic

  gulp.task("copy-index",function(){
           //src 拿到文件   复制到 pipe 管道   dest是一个方法 复制到dist文件夹里面
        //connect.reload() 变化时刷新
        return   gulp.src('index.html').pipe(gulp.dest('dist')).pipe(connect.reload()); 

  })

  //gulp.src (就是找到要复制的文件目录)    pipe(gulp.dest（要把复制的文件放在想要放置的文件里面）)
  gulp.task("images", function() {
      //return gulp.src("images/*").pipe(gulp.dest("dist/images"));
      //images 目录下的 {png,jpg}
      //return gulp.src("images/*.{png,jpg}").pipe(gulp.dest("dist/images"));
      //  /*一级目录   /*/*  一级二级目录下的文件 类推下去
      return gulp.src("images/*/*").pipe(gulp.dest("dist/images"));
  });


 gulp.task("data",function(){
      //  !json/secret-*.json  前面加个！就是排除掉后面的文件
      return gulp.src(['xml/*.xml','json/*.json','!json/secret-*.json']).pipe(gulp.dest("dist/data"));
 })

  //建立统一执行(依赖的任务同时执行，然后再执行console.log())
  gulp.task("build",["copy-index","images","data"],function(){
     console.log("编译成功");
  })

  
  //监听文件 gulp watch() 当发生变化的时候就会同步执行 
  gulp.task('watch',function(){
     gulp.watch('index.html',['copy-index']);
     gulp.watch('images/*/*',['images']);
     gulp.watch('xml/*.xml','json/*.json','!json/secret-*.json',['data']);

  })


 // gulp 插件地址 gulpjs.com/plugins   css插件gulp-sass  把sass编译成css
  gulp.task("sass",function(){
     //sass(); 调用sass编译
    return gulp.src("stylesheets/**/*.scss").pipe(sass()).pipe(gulp.dest("dist/css"));

  })

 //gulp-less插件
 gulp.task("less",function(){
    return gulp.src("stylesheets/**/*.less").pipe(less()).pipe(gulp.dest("dist/css"));
 })

 //数据同步执行  实时刷新浏览器 的数据 
 gulp.task("default",['server','watch']);


