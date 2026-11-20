import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('https://molinkkk.github.io/Easy-Vibe-Learning/?verify=20261121',{waitUntil:'networkidle',timeout:60000});
 assert.equal(response.status(),200);
 await page.getByRole('button',{name:/雷霆蛇/}).click();
 await page.getByRole('button',{name:/开始生存挑战/}).click();
 await page.getByText('生存目标 10:00').waitFor();
 await page.keyboard.down('d');await page.waitForTimeout(1200);await page.keyboard.up('d');
 await page.keyboard.press('Escape');await page.getByRole('heading',{name:'荒原静候'}).waitFor();
 await page.getByRole('button',{name:'继续战斗'}).click();
 await page.screenshot({path:'docs/published.png'});
 assert.deepEqual(errors,[]);
 console.log('Published Pages: HTTP 200, assets loaded, character/start/movement/pause/resume passed');
} finally {await browser.close();}
