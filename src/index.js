const fs = require('fs');
const path = require('path');

export default function* walk(dir, {
  topDown=true,
  followLinks=false,
  filter=() => true,
} = {}) {
  let ret = {
    path: dir,
    directories: [],
    files: [],
  };

  let followDirs = [];

  for (const file of fs.readdirSync(dir)) {
    const absFilePath = path.resolve(dir, file);
    const fileStats = fs.statSync(absFilePath);

    if (!filter(absFilePath, fileStats)) {
      continue;
    }

    if (fileStats.isDirectory()) {
      const linkStats = fs.lstatSync(absFilePath);
      ret.directories.push(file);
      if (!linkStats.isSymbolicLink() || followLinks) {
        followDirs.push(path.join(dir, file));
      }
    } else {
      ret.files.push(file);
    }
  }

  if (topDown) {
    yield ret;
  }

  for (const followDir of followDirs) {
    yield* walk(followDir, { topDown, followLinks, filter });
  }

  if (!topDown) {
    yield ret;
  }
}
