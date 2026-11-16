// MOIMOB shared version script: keep identical in every app.
//
// package.json "version" is the single source. Android gets versionName = that version and
// versionCode = major * 100000 + minor * 1000 + patch (2.4.0 -> 204000), written as literals so fastlane and F-Droid
// can read them from the file.
//
//   npm version <patch|minor|major|x.y.z>   bumps package.json, then runs `sync` (the "version" npm script)
//   node scripts/version.mjs sync           writes android/app/build.gradle (Cordova: config.xml) and creates empty
//                                           Play changelogs fastlane/metadata/android/<lang>/changelogs/<code>.txt
//   node scripts/version.mjs check [--tag v2.4.0]
//                                           fails if anything is out of sync, a changelog is missing, empty or over
//                                           500 characters, or the release tag doesn't match package.json (CI)
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const [mode, ...args] = process.argv.slice(2);
const errors = [];

const fail = (message) => {
  console.error(`✖ ${message}`);
  process.exit(1);
};

const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const parts = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
if (!parts) fail(`package.json version "${version}" must be major.minor.patch (no pre-release suffix)`);
const [major, minor, patch] = parts.slice(1).map(Number);
if (minor > 99 || patch > 999) fail(`${version}: minor must be <= 99 and patch <= 999 for the versionCode formula`);
const code = major * 100000 + minor * 1000 + patch;

// Each target: a file, plus how to read and write its versionName and versionCode.
const targets = [
  {
    file: 'android/app/build.gradle',
    read: (text) => ({
      name: /versionName\s+["']([^"']*)["']/.exec(text)?.[1],
      code: Number(/versionCode\s+(\d+)/.exec(text)?.[1]),
    }),
    write: (text) =>
      text.replace(/(versionName\s+)(["'])[^"']*\2/, `$1$2${version}$2`).replace(/(versionCode\s+)\d+/, `$1${code}`),
  },
  {
    file: 'config.xml',
    read: (text) => {
      const widget = /<widget\b[^>]*>/.exec(text)?.[0] ?? '';
      return {
        name: /\sversion="([^"]*)"/.exec(widget)?.[1],
        code: Number(/\sandroid-versionCode="(\d+)"/.exec(widget)?.[1]),
      };
    },
    write: (text) =>
      text.replace(/<widget\b[^>]*>/, (widget) => {
        const named = widget.replace(/(\sversion=")[^"]*"/, `$1${version}"`);
        return /\sandroid-versionCode="/.test(named)
          ? named.replace(/(\sandroid-versionCode=")\d+"/, `$1${code}"`)
          : named.replace(/(\sversion="[^"]*")/, `$1 android-versionCode="${code}"`);
      }),
  },
].filter((target) => existsSync(join(root, target.file)));

const metadata = join(root, 'fastlane/metadata/android');
const changelogs = existsSync(metadata)
  ? readdirSync(metadata)
      .map((lang) => join('fastlane/metadata/android', lang, 'changelogs'))
      .filter((dir) => existsSync(join(root, dir)))
      .map((dir) => join(dir, `${code}.txt`).replaceAll('\\', '/'))
  : [];

if (mode === 'sync') {
  for (const { file, write } of targets) {
    const path = join(root, file);
    writeFileSync(path, write(readFileSync(path, 'utf8')));
    console.log(`✔ ${file}: ${version} (${code})`);
  }
  for (const file of changelogs) {
    if (existsSync(join(root, file))) continue;
    writeFileSync(join(root, file), '');
    console.log(`✎ ${file}: write the release notes (Play "What's new", max 500 characters)`);
  }
} else if (mode === 'check') {
  for (const { file, read } of targets) {
    const found = read(readFileSync(join(root, file), 'utf8'));
    if (found.name !== version || found.code !== code) {
      errors.push(`${file} has ${found.name} (${found.code}), package.json says ${version} (${code})`);
    }
  }
  for (const file of changelogs) {
    const path = join(root, file);
    const length = existsSync(path) ? readFileSync(path, 'utf8').trim().length : -1;
    if (length < 0) errors.push(`${file} is missing`);
    else if (length === 0) errors.push(`${file} is empty`);
    else if (length > 500) errors.push(`${file} has ${length} characters (Play allows 500)`);
  }
  const tagIndex = args.indexOf('--tag');
  if (tagIndex >= 0) {
    const tag = args[tagIndex + 1] ?? '';
    if (tag.replace(/^v/, '') !== version) errors.push(`release tag "${tag}" doesn't match package.json ${version}`);
  }
  if (errors.length) {
    errors.forEach((error) => console.error(`✖ ${error}`));
    fail(
      'Version: `npm version <x.y.z>` (or edit package.json, then `npm run version:sync`). ' +
        'Changelogs: write Play\'s "What\'s new" in each file.',
    );
  }
  console.log(`✔ ${version} (${code}) in sync`);
} else {
  fail('usage: node scripts/version.mjs sync | check [--tag <tag>]');
}
