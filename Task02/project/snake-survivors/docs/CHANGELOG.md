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
