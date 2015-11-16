# walk-dir-sync

> Traverse a directory tree synchronously. Inspired by Python's `os.walk`

**Work in progress**

### function* walk(dir, { topDown=true, followLinks=false, filter=acceptAnyPath } = {})

## install

```bash
$ npm install --save walk-dir-sync
```

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
const walkDirSync = require('walk-dir-sync').default;
const path = require('path');

function ignoreHiddenDirs(absPath, stats, lstats) {
  if (stats.isDirectory() && path.basename(absPath).startsWith('.')) {
    return false;
  }
  return true;
}

for (const dir of walkDirSync('dir1', {
  filter: ignoreHiddenDirs,
  followLinks: true,
  topDown: true
})) {
  console.log(JSON.stringify(dir, null, 2));
}
```

outputs

```js
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
