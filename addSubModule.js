const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MAIN_REPO_PATH = '/Users/wangshihao/Desktop/github/main';  // 本地主仓路径

// 检查主仓库是否存在
if (!fs.existsSync(path.join(MAIN_REPO_PATH, '.git'))) {
  console.error('Main repository does not exist or is not a valid Git directory.');
  return;
}

// 检查系统是否对应
const SYSTEM = 'admin'; // 系统名称
if (process.argv[2] !== SYSTEM) {
  console.error('System name does not match.');
  return;
}
const moduleName = process.argv[3]; // 模块名
const repositoryName = process.argv[4]; // 仓库名
const repositoryUrl = `https://github.com/w1065083301/${repositoryName}.git`; // 仓库地址

// 目标模块路径
const targetPath = moduleName === 'main' ? MAIN_REPO_PATH : `${MAIN_REPO_PATH}/${moduleName}`;
// 检查目标模块是否存在
if (!fs.existsSync(path.join(targetPath, '.git'))) {
  console.error('Module repository does not exist or is not a valid Git directory.');
  return;
}

// 检查远程仓库是否存在
try {
  execSync(`git ls-remote ${repositoryUrl}`, { stdio: 'pipe' });
} catch (error) {
  console.error(error.message);
  return;
}

// 添加子模块
try {
  execSync(`cd ${targetPath} && git submodule add ${repositoryUrl}`, { cwd: MAIN_REPO_PATH, stdio: 'inherit' });
} catch (error) {
  console.error(error.message);
  return;
}
console.log(`${repositoryName} added to ${moduleName} repository.`);