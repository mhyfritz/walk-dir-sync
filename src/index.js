const fs = require('fs');
const path = require('path');

function acceptAnyPath(absPath, stats, lstats) {
  return true;
}

export default function* walk(dir, {
  topDown=true,
  followLinks=false,
  filter=acceptAnyPath,
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
    const linkStats = fs.lstatSync(absFilePath);

    if (!filter(absFilePath, fileStats, linkStats)) {
      continue;
    }

    if (fileStats.isDirectory()) {
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
    yield* walk(followDir, {
      topDown: topDown,
      followLinks: followLinks,
      filter: filter,
    });
  }

  if (!topDown) {
    yield ret;
  }
}
