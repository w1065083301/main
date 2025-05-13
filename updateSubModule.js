const { execSync } = require('child_process');
const MAIN_REPO_PATH = '/Users/wangshihao/Desktop/github/main';  // 本地主仓路径
execSync('git pull', { cwd: MAIN_REPO_PATH, stdio: 'inherit' });
execSync('git submodule update --recursive', { cwd: MAIN_REPO_PATH, stdio: 'inherit' });
execSync('git commit -am "Update submodules to latest commit"', { cwd: MAIN_REPO_PATH, stdio: 'inherit' });
console.log('Submodules updated and changes committed.');