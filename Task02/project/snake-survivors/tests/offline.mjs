import {chromium} from '@playwright/test';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 const context=await browser.newContext({offline:true});
 const page=await context.newPage();const errors=[],network=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
 await page.goto(pathToFileURL(resolve('dist/snake-survivors.html')).href);
 await page.getByRole('button',{name:/雷霆蛇/}).click();
 await page.getByRole('button',{name:/开始生存挑战/}).click();
 await page.getByText('生存目标 10:00').waitFor();
 await page.keyboard.down('d');await page.waitForTimeout(600);await page.keyboard.up('d');
 await page.keyboard.press('Escape');
 await page.getByRole('heading',{name:'荒原静候'}).waitFor();
 await page.getByRole('button',{name:'继续战斗'}).click();
 await page.getByRole('button',{name:/暂停/}).click();
 await page.getByRole('button',{name:'重新开始',exact:true}).click();
 if(errors.length||network.length)throw Error(JSON.stringify({errors,network}));
 console.log('Offline file:// HTML: character selection, start, movement, pause, resume, restart; no HTTP requests or JS errors');
} finally {await browser.close();}
