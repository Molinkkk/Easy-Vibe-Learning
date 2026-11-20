# 迭代记录

## 2026-11-20 · V1 核心试炼

### 修改文件

- package.json、package-lock.json、index.html、.gitignore：独立 React/Vite 项目与锁定依赖。
- src/game/config.js：地图、敌人、升级配置。
- src/game/player.js：移动、边界、蛇身路径插值。
- src/game/enemies.js：生成、追踪、冲刺、碰撞。
- src/game/weapons.js：自动索敌、火焰追踪与命中。
- src/game/drops.js：经验吸附与拾取。
- src/game/engine.js：状态机、战斗、死亡掉落、升级与重启。
- src/game/renderer.js：程序绘制和视觉反馈。
- src/main.jsx、src/style.css：游戏界面、独立 RAF、键盘/触屏、低频 HUD。
- tests/engine.test.js、tests/browser.mjs：自动化测试与 Chrome 流程验证。
- README.md、docs/ARCHITECTURE.md、docs/CHANGELOG.md、docs/*.png：文档与截图。

### 实现

90 秒核心闭环，单角色、三敌人、一武器、五类限次升级，真实蛇身伤害；暂停、死亡/存活结算与重启。菜单、战斗 HUD、伤害数字、晶石吸附和击杀粒子。

### 验证

- npm test：9/9 通过，覆盖帧率一致性、边界、蛇身弧长间距、生成距离、追踪与接触攻击、火焰命中和掉落、经验升级暂停、状态恢复与重启、胜负和升级上限。
- npm run build：通过，Vite 6.4.6。
- Chrome + Playwright：开始→移动→暂停→继续→重启→虚拟时钟推进真实战斗→死亡结算→再次重启，通过；页面无 JavaScript 错误。虚拟时钟只推进 RAF，未注入生命或伤害修改。
- docs/menu.png、battle.png、result.png：真实浏览器截图。菜单截图后修复了初始蛇身尚未建立的问题。

### 未解决问题

- 本地初始仓库为空，未绑定远程；目标 GitHub HEAD b0b28834aaa84147de80674bf64a4dfb349a57f9 已读取，但 clone 最终 SSL 超时。因此尚未读取远程约定或上传，不能声称已进入目标 GitHub。
- V2/V3 功能尚未实现，不能作为完整产品验收。
- 存活胜利路径由引擎测试覆盖，浏览器完整流程走死亡结算路径；触屏输入尚缺真机验收。
- 急转弯可能形成蛇身自交；当前允许自交，不造成自伤。长蛇后续需要限制最小转弯半径。

### 下一阶段

先核对目标仓库约定；进入 V2，实现三角色、五武器、配置式进化、毒雾虫、精英、预警 Boss、Combo/Fever 与高级奖励；为新增系统增加自动化与浏览器胜利流程。随后 V3 完成音效静音、性能和移动设备验收。

## 2026-11-20 · V2 战斗成长系统

V1 独立提交 `091da22` 已推送目标 main。V2 在此基础上开发。

### 修改文件

- 新增 src/game/progression.js：三角色、五武器、进化配方、核心与 Combo 配置。
- 修改 config.js、engine.js：10 分钟流程、限次属性、Fever、精英与 Boss 时间表、击退/暴击/减伤、结算统计。
- 修改 weapons.js：五种真实攻击、武器等级、三种进化效果。
- 修改 enemies.js、drops.js：远程毒弹、精英落点攻击、Boss 阶段弹幕和预警、稀有核心奖励。
- 修改 renderer.js、main.jsx、style.css：角色选择、武器与进化 HUD、Combo/Fever 倒计时、Boss 血条、区域/链雷/旋刃/分身效果。
- 新增 tests/progression.test.js，更新 engine.test.js 和 browser.mjs。
- 更新 README、Task02/README 及界面截图，新增 mobile.png。

### 实现功能

三角色初始属性/武器/被动不同；五武器最高 Lv.5；核心与满级武器自动触发配置进化。升级包括攻击/攻速/暴击/暴伤/生命/恢复/护甲/移速/经验/蛇长/武器/核心。精英掉落核心选择；Boss 具有三个阶段、红圈预警与弹幕。Combo 提升经验倍率；Fever 6 秒增加伤害与攻速。结算显示生存时间、击杀、等级、最高连杀、总伤害和 Boss 状态。

### 测试结果

17/17 引擎测试通过；Vite 生产构建通过；git diff --check 通过。Chrome 实际运行基础死亡结算闭环、三角色切换、预置进化与 Boss 预警/胜利场景及移动视口布局，无 pageerror。截图已人工查看。

### 未解决与边界

浏览器 Boss 验收是预置满级构筑的场景测试，并非自然游玩到第 9 分钟。尚未做自然成长的完整 10 分钟通关、低端设备性能或真实手机触控实测。武器美术使用程序化图形，音效/静音尚未实现。

### 下一阶段

V3：音效与静音、自然成长长局平衡、真实移动端验证、粒子与掉落性能优化。
