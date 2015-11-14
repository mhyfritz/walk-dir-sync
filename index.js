'use strict';

const fs = require('fs');
const path = require('path');

function acceptPath(absPath, stats, lstats) {
  return true;
}

export default function* walk(dir, filter=acceptPath, followLinks=false) {
  let ret = {
    path: {
      rel: dir,
      abs: path.resolve(dir)
    },
    directories: [],
    files: []
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
      ret.directories.push(file)
      if (!linkStats.isSymbolicLink() || followLinks) {
        followDirs.push(path.join(dir, file));
      }
    } else {
      ret.files.push(file);
    }
  }

  yield ret;

  for (const followDir of followDirs) {
    yield* walk(followDir, filter, followLinks)
  }
}
