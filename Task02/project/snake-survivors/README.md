# 蛇境 · Snake Survivors

React + Canvas 的生存 Roguelike。当前交付阶段 **V1 核心试炼**，90 秒一局；V2/V3 尚未实现。

## 运行

Node.js 20.19+（本地验证版本 23.11），npm 10+。

```sh
cd Task02/project/snake-survivors
npm ci
npm run dev
```

打开终端打印的本地地址。`npm test` 运行引擎测试，`npm run build` 输出静态文件到 dist，可部署到任意静态托管。

WASD / 方向键移动，自动攻击；ESC / 暂停按钮暂停继续。移动端拖动左下角摇杆。绿色经验晶石会在靠近时吸附；升级时游戏冻结，选一项继续。蛇身造成接触伤害。失焦自动暂停。

## 当前内容

赤焰蛇、轨迹插值蛇身、史莱姆/疾行兽/骷髅、追踪火焰弹、经验与五类限次升级、胜负结算、重启、响应式 HUD。无 API、无账户、无服务器和敏感配置。

架构和后续数值见 [技术方案](docs/ARCHITECTURE.md)，阶段结果见 [迭代记录](docs/CHANGELOG.md)。

## 截图

![开始界面](docs/menu.png)
![战斗界面](docs/battle.png)

## 浏览器验收

`node tests/browser.mjs` 需要本机 Chrome（脚本使用 macOS 默认路径）及正在运行的 dev 服务；其他系统请调整 executablePath。浏览器测试使用虚拟时钟推进游戏，不修改引擎生命或战斗数值。

## 未完成

V2：另外两角色、其余武器、进化、远程毒雾虫、精英、多阶段 Boss、Combo/Fever。
V3：音效及静音、性能压力测试、完整移动设备验收和 10 分钟数值平衡。
