#!/usr/bin/env node

const clone = require('git-clone');
const program = require('commander');
const shell = require('shelljs');
const logger = require('tracer').colorConsole({
  format : [
            "{{timestamp}} {{message}}", //default format
            {
              error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
            }
  ],
  dateformat : "HH:MM:ss.L",
  preprocess :  function(data){
      data.title = data.title.toUpperCase();
  }
})

program
  .version('1.0.0', '-v, --version')
  .description('初始化webpack打包的react项目')
program
  .command('* <project>')
  .action(function(project) {
    logger.log('🍺  正在初始化工程...：')
    if (project) {
      let pwd = shell.pwd()
      logger.log('🚂  工程即将被写入：' + pwd + '/' + project);
      clone(`https://github.com/treadpit/init-react-program.git`, pwd + '/' + project, null, function() {
        shell.rm('-rf', pwd + '/' + project + '/.git');
        logger.trace('👏  工程初始化完成');
        logger.info('🎉  请依次执行：\n  - cd /' + project + '\n  - npm i');
      })
    } else {
      logger.error('🚫 正确命令例子：ireact myproject');
    }
  })
program.parse(process.argv)