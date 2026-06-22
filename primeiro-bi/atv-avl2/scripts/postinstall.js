import { spawnSync } from 'child_process';

if (process.env.NETLIFY || process.env.CI) {
  process.exit(0);
}

try {
  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawnSync(cmd, ['rebuild', '--update-binary'], { stdio: 'inherit' });
} catch (e) {}

process.exit(0);
