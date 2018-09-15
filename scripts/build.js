// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

const { log, error, info, warn } = console

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});



var chalk = require('chalk');
var fs = require('fs-extra');
var path = require('path');
var pathExists = require('path-exists');
var filesize = require('filesize');
var gzipSize = require('gzip-size').sync;
var webpack = require('webpack');
var config = require('../config/webpack.config.prod');
var paths = require('../config/paths');
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
var recursive = require('recursive-readdir');
var stripAnsi = require('strip-ansi');

var useYarn = pathExists.sync(paths.yarnLockFile);

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Input: /User/dan/app/build/static/js/main.82be8.js
// Output: /static/js/main.js
function removeFileNameHash(fileName) {
  return fileName
    .replace(paths.appBuild, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize, previousSize) {
  var FIFTY_KILOBYTES = 1024 * 50;
  var difference = currentSize - previousSize;
  var fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red('+' + fileSize);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow('+' + fileSize);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
recursive(paths.appBuild, (err, fileNames) => {
  var previousSizeMap = (fileNames || [])
    .filter(fileName => /\.(js|css)$/.test(fileName))
    .reduce((memo, fileName) => {
      var contents = fs.readFileSync(fileName);
      var key = removeFileNameHash(fileName);
      memo[key] = gzipSize(contents);
      return memo;
    }, {});

  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  fs.emptyDirSync(paths.appBuild);

  // Start the webpack build
  build(previousSizeMap);

  // Merge with the public folder
  copyPublicFolder();
});

// Print a detailed summary of build files.
function printFileSizes(stats, previousSizeMap) {
  var assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name);
      var size = gzipSize(fileContents);
      var previousSize = previousSizeMap[removeFileNameHash(asset.name)];
      var difference = getDifferenceLabel(size, previousSize);
      return {
        folder: path.join('build_webpack', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size) + (difference ? ' (' + difference + ')' : '')
      };
    });
  assets.sort((a, b) => b.size - a.size);
  var longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => stripAnsi(a.sizeLabel).length)
  );
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel;
    var sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    log(
      '  ' + sizeLabel +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    );
  });
}

// Print out errors
function printErrors(summary, errors) {
  log(chalk.red(summary));
  log();
  errors.forEach(err => {
    log(err.message || err);
    log();
  });
}

// Create the production build and print the deployment instructions.
function build(previousSizeMap) {
  log('Creating an optimized production build...');
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (process.env.CI && stats.compilation.warnings.length) {
     printErrors('Failed to compile.', stats.compilation.warnings);
     process.exit(1);
   }

    log(chalk.green('Compiled successfully.'));
    log();

    log('File sizes after gzip:');
    log();
    printFileSizes(stats, previousSizeMap);
    log();

    var openCommand = process.platform === 'win32' ? 'start' : 'open';
    var appPackage  = require(paths.appPackageJson);
    var homepagePath = appPackage.homepage;
    var publicPath = config.output.publicPath;
    if (homepagePath && homepagePath.indexOf('.github.io/') !== -1) {
      // "homepage": "http://user.github.io/project"
      log('The project was built assuming it is hosted at ' + chalk.green(publicPath) + '.');
      log('You can control this with the ' + chalk.green('homepage') + ' field in your '  + chalk.cyan('package.json') + '.');
      log();
      log('The ' + chalk.cyan('build_webpack') + ' folder is ready to be deployed.');
      log('To publish it at ' + chalk.green(homepagePath) + ', run:');
      // If script deploy has been added to package.json, skip the instructions
      if (typeof appPackage.scripts.deploy === 'undefined') {
        log();
        if (useYarn) {
          log('  ' + chalk.cyan('yarn') +  ' add --dev gh-pages');
        } else {
          log('  ' + chalk.cyan('npm') +  ' install --save-dev gh-pages');
        }
        log();
        log('Add the following script in your ' + chalk.cyan('package.json') + '.');
        log();
        log('    ' + chalk.dim('// ...'));
        log('    ' + chalk.yellow('"scripts"') + ': {');
        log('      ' + chalk.dim('// ...'));
        log('      ' + chalk.yellow('"deploy"') + ': ' + chalk.yellow('"npm run build&&gh-pages -d build"'));
        log('    }');
        log();
        log('Then run:');
      }
      log();
      log('  ' + chalk.cyan(useYarn ? 'yarn' : 'npm') +  ' run deploy');
      log();
    } else if (publicPath !== '/') {
      // "homepage": "http://mywebsite.com/project"
      log('The project was built assuming it is hosted at ' + chalk.green(publicPath) + '.');
      log('You can control this with the ' + chalk.green('homepage') + ' field in your '  + chalk.cyan('package.json') + '.');
      log();
      log('The ' + chalk.cyan('build_webpack') + ' folder is ready to be deployed.');
      log();
    } else {
      // no homepage or "homepage": "http://mywebsite.com"
      log('The project was built assuming it is hosted at the server root.');
      if (homepagePath) {
        // "homepage": "http://mywebsite.com"
        log('You can control this with the ' + chalk.green('homepage') + ' field in your '  + chalk.cyan('package.json') + '.');
        log();
      } else {
        // no homepage
        log('To override this, specify the ' + chalk.green('homepage') + ' in your '  + chalk.cyan('package.json') + '.');
        log('For example, add this to build it for GitHub Pages:')
        log();
        log('  ' + chalk.green('"homepage"') + chalk.cyan(': ') + chalk.green('"http://myname.github.io/myapp"') + chalk.cyan(','));
        log();
      }
      log('The ' + chalk.cyan('build_webpack') + ' folder is ready to be deployed.');
      log('You may also serve it locally with a static server:')
      log();
      if (useYarn) {
        log('  ' + chalk.cyan('yarn') +  ' global add pushstate-server');
      } else {
        log('  ' + chalk.cyan('npm') +  ' install -g pushstate-server');
      }
      log('  ' + chalk.cyan('pushstate-server') + ' build');
      log('  ' + chalk.cyan(openCommand) + ' http://localhost:9000');
      log();
    }
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}
