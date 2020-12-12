# sync-nextjs-rewrites

Sync rewrites rules of Firebase Hosting from Next.js SPA.

## Installation

```
npm i --save-dev @attakei/sync-nextjs-rewrites
```

```
yarn add -D @attakei/sync-nextjs-rewrites
```

## Usage

Standard usage.

```
$ ls -l
firebase.json pages
$ yarn sync-nextjs-rewrites
```

For management sources in `src` directory.

```
$ yarn sync-nextjs-rewrites --pages src/pages
```

## License

Apache-2.0. See [it](./LICENSE).
