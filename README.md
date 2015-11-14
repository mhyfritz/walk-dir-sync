# walk-dir-sync

> Traverse a directory tree synchronously

work in progress

```js
function* walk(dir, filter=acceptPath, followLinks=false)
```

## example

```bash
# (shortened output)
$ ls -RalF dir1 dir2
dir1:
.hidden/
dir1-level1-dir1/
dir1-level1-file1
dir1-level1-file2
dir2 -> ../dir2/

dir1/.hidden:
hidden-file

dir1/dir1-level1-dir1:
dir1-level2-file1
dir1-level2-file2
dir1-level2-file3

dir2:
dir2-level1-file1
```

```js
import walk from './index';
const path = require('path');

function ignoreHiddenDirs(absPath, stats, lstats) {
  if (stats.isDirectory() && path.basename(absPath).startsWith('.')) {
    return false;
  }
  return true;
}

for (const dir of walk('dir1', ignoreHiddenDirs, true)) {
  console.log(JSON.stringify(dir, null, 2));
}

// --- output ---
{
  "path": {
    "rel": "dir1",
    "abs": "/Users/mhyf/projects/walk-dir-sync/dir1"
  },
  "directories": [
    "dir1-level1-dir1",
    "dir2"
  ],
  "files": [
    "dir1-level1-file1",
    "dir1-level1-file2"
  ]
}
{
  "path": {
    "rel": "dir1/dir1-level1-dir1",
    "abs": "/Users/mhyf/projects/walk-dir-sync/dir1/dir1-level1-dir1"
  },
  "directories": [],
  "files": [
    "dir1-level2-file1",
    "dir1-level2-file2",
    "dir1-level2-file3"
  ]
}
{
  "path": {
    "rel": "dir1/dir2",
    "abs": "/Users/mhyf/projects/walk-dir-sync/dir1/dir2"
  },
  "directories": [],
  "files": [
    "dir2-level1-file1"
  ]
}
```
