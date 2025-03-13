import { join } from 'path';
import { app } from 'electron';
import { Sequelize } from 'sequelize';

// 使用该方法获取缓存目录从而实现软件升级或卸载数据保留
// 比如 windows 下文件存储位置会为 C:\Users\WHOAMI\AppData\Roaming\APP_NAME\data\.db
const basePath = join(app.getPath('appData'), app.getName(), './data/.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: basePath,
});

export default sequelize;
