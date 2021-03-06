/**
 * Routing resolver for Next.js SPA
 */
import * as path from 'path';
import walkSync from 'walk-sync';

export type Route = {
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
  const hasDynamic = dirs.find(d => d.match(/\[.+\]/)) !== undefined;
  return {
    src: `${dirs.map((d) => (d.match(/\[.+\]/) ? '**' : d)).join('/')}`,
    dest: `${pathInfo.dir}/index.html`,
    dynamic: hasDynamic,
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
