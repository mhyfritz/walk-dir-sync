# walk-dir-sync

> Traverse a directory tree synchronously. Inspired by Python's `os.walk`

**Work in progress**

### function* walk(dir, filter=acceptPath, followLinks=false)

## example

```bash
$ tree -a dir1 dir2
dir1
├── .hidden/
│   └── hidden-file
├── dir1-level1-dir1/
│   ├── dir1-level2-file1
│   ├── dir1-level2-file2
│   └── dir1-level2-file3
├── dir1-level1-file1
├── dir1-level1-file2
└── dir2 -> ../dir2/
dir2
└── dir2-level1-file1
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
  "path": "dir1",
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
  "path": "dir1/dir1-level1-dir1",
  "directories": [],
  "files": [
    "dir1-level2-file1",
    "dir1-level2-file2",
    "dir1-level2-file3"
  ]
}
{
  "path": "dir1/dir2",
  "directories": [],
  "files": [
    "dir2-level1-file1"
  ]
}
```
