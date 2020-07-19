import cherrio from 'cheerio';
import flow from 'lodash/flow';

type IFlowed = (siteContent: CheerioStatic) => CheerioStatic;

const removeTagsNatively = (tag: string): IFlowed => {
  return (siteContent: CheerioStatic): CheerioStatic => {
    siteContent(tag).remove();

    return siteContent;
  };
};

const isComment = (index: number, node: CheerioElement) => {
  return node.type === 'comment'
}

const removeComments = (siteContent: CheerioStatic): CheerioStatic => {
  siteContent.root().find('*').contents().filter(isComment).remove();
  return siteContent;
};

const isEmptyTag = (index: number, node: CheerioElement) => {
  return node.data?.trim() === '';
}

const removeEmptyTags = (siteContent: CheerioStatic): CheerioStatic => {
  siteContent.root().find('*').contents().filter(isEmptyTag).remove();
  return siteContent;
};

const removeGs = removeTagsNatively('g');
const removeSvgs = removeTagsNatively('svg');
const removePaths = removeTagsNatively('path');
const removePolygons = removeTagsNatively('polygon');

const removeLinks = removeTagsNatively('link');
const removeHeads = removeTagsNatively('head');
const removeMetas = removeTagsNatively('meta');
const removeStyles = removeTagsNatively('style');
const removeFooters = removeTagsNatively('footer');
const removeHeaders = removeTagsNatively('header');
const removeIframes = removeTagsNatively('iframe');
const removeScripts = removeTagsNatively('script');
const removeNoScripts = removeTagsNatively('noscript');
const removeInvisible = removeTagsNatively('[style="display:none"]');

export const flowedNormalize: IFlowed = flow([
  removeGs,
  removeSvgs,
  removePaths,
  removePolygons,

  removeLinks,
  removeHeads,
  removeMetas,
  removeStyles,
  removeIframes,
  removeFooters,
  removeHeaders,
  removeScripts,
  removeNoScripts,
  removeInvisible,

  removeComments,
  removeEmptyTags,
]);
