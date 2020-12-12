/**
 * Routing resolver for Next.js SPA
 */
import * as path from 'path';
import walkSync from 'walk-sync';

type Route = {
  src: string;
  dest: string;
  dynamic: boolean;
};

const pageToRoute = (page: string): Route => {
  const pathInfo = path.parse(page);
  if (pathInfo.name !== 'index') {
    pathInfo.dir += `/${pathInfo.name}`;
    pathInfo.name = 'index';
  }
  if (!pathInfo.dir.startsWith('/') && pathInfo.dir !== '') {
    pathInfo.dir = `/${pathInfo.dir}`;
  }
  const dirs = pathInfo.dir.split('/');
  return {
    src: `${dirs.map((d) => (d === '[id]' ? '**' : d)).join('/')}`,
    dest: `${pathInfo.dir}/index.html`,
    dynamic: dirs.includes('[id]'),
  };
};

/**
 *
 */
export const makeRoutes = (src: string, extensions: string[]): Route[] => {
  const pages = walkSync(src)
    .filter((p) => !p.endsWith('/'))
    .filter((p) => !p.startsWith('_'))
    .filter((p) => extensions.some((e) => p.endsWith(e)));
  if (pages.length === 0) {
    throw new Error('Next.js pages is not defined');
  }
  return pages.map((p) => pageToRoute(p));
};

/**
 *
 */
export const makeDynamicRoutes = (
  src: string,
  extensions: string[],
): Route[] => {
  return makeRoutes(src, extensions).filter((r) => r.dynamic);
};
