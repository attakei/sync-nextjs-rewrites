import { Route } from './nextjs-pages-mapper';

type RewriteRule = {
  source: string;
  destination?: string;
};

type RewriteRuleMap = Map<string, RewriteRule>;

export const parseRewriteRuleMap = (arry: RewriteRule[]): RewriteRuleMap => {
  const rules = new Map();
  arry.forEach((r) => {
    rules.set(r.source, r);
  });
  return rules;
};

export const convertToRuleList = (rules: RewriteRuleMap): RewriteRule[] => {
  const cmpRule = (a: RewriteRule, b: RewriteRule): number => {
    const sourceA = a.source.toUpperCase();
    const sourceB = b.source.toUpperCase();
    if (sourceA < sourceB) {
      return -1;
    }
    if (sourceA > sourceB) {
      return 1;
    }
    return 0;
  };
  return [...rules.values()].sort(cmpRule).reverse();
};

export const appendRules = (
  rules: RewriteRuleMap,
  routes: Route[],
): RewriteRuleMap => {
  routes.forEach((r) => {
    rules.set(r.src, {
      source: r.src,
      destination: r.dest,
    });
  });
  return rules;
};
