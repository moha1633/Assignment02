import chalk from 'chalk';
import fs from 'fs/promises';
import {formatDistanceToNow, parse, format, set, isLeapYear, isValid, isAfter, isBefore, isToday} from 'date-fns';
import { Command } from 'commander';
import getGitVersion from './src/getGitVersion.js';

let gitVersion = await getGitVersion();

let first = 'Mohamd'
let last = 'abdi'
let name = `${chalk.bgRedBright(first)} ${chalk.bgGreenBright(last)}`;
let today = format(new Date(), 'yyyy-MM-dd HH:mm:ss z');
let startOfCourse = new Date(2023, 3, 0);
let daysFromCourseStart = formatDistanceToNow(startOfCourse);
let argumentparser = new Command();
argumentparser.option('--date');
argumentparser.parse();

let dateStringSentAsArgument = argumentparser.args[0];
let dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date());
let currentDate = set (new Date (), {hours: 0 , minutes: 0,seconds:0,milliseconds:0})


console.log(name);

let LeapYearTest = isLeapYear(dateSentAsArgument);
let isBeforeTest = isBefore(dateSentAsArgument, currentDate);
let isTodayTest = isToday(dateSentAsArgument);
let isAfterTest = isAfter(dateSentAsArgument, currentDate);

let datevaliditycheck = isValid(dateSentAsArgument);
if (!datevaliditycheck) {
    console.log('Test an alternative "npm run start --date" showing date in the format of');
} else {
    checkDate(dateSentAsArgument);
    isDateLeaoYear(dateSentAsArgument);
}

 function checkDate(){
    if(isBeforeTest)
    {
        console.log('The specified date is in the past compared to todays date ');
        return;
    }
    if(isTodayTest) {
        console.log('The date is before todays date');
        return;
    }
    if(isAfterTest){
        console.log('data is after today');
        return;
    }
 }


  function isDateLeaoYear(){
    if(LeapYearTest) {
        console.log ('this date occurs under a leap year');

    }else {
        console.log('This date doesnt occur under a leap year');
    } 
  }



let  fileContent = `
date:${today}
name : ${first} ${last}
npm $ node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}
days since course start:${daysFromCourseStart}

`;
let htmlcontent = `
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Assignment 02 npm node (javascript framework)</title>
   <link rel="stylesheet" href="./src/style.css">
</head>
<body>
  <head>
   <h1 class="page-title">Html file</h1>
  </head>

  <main>
   <div class="content">
       <p>file run last on</p>
       <p class="content-date">2203-04-26 23:45:09 GMT+1 </p>
   </div>

   <div class="content">
       <p>The JS Framework course started 55 day ago</p>
   </div>

   <div class="content">
       <p>create</p>
       <p >Mohamed abdi </p>
   </div>

   <div class="content">
       <p >Local version specifications:</p>
       <p ">npm $ node: npm/9.5.1 node/v19.8.1 darwin arm64 workspaces/false</p>
       <p>git version 2.39.2</p>
   </div>
   <div class="content">
       <p>take a look terminal and run the index.js file</p>
   </div>
  </main>

  <footer>
   <h2>&copy; Mohamed</h2>
  </footer>
</body>
</html>



`;
await fs.writeFile('index.md', fileContent);
await fs.writeFile('index.html', htmlcontent);




