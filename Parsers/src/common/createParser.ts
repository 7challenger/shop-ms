import cherrio from 'cheerio';
import type { Page }  from 'puppeteer';
import { navigate as navigateDefault, initBrowser } from './utils';
import type { SelectorGroup, NavigateType } from './utils';


export type GetElementsArgsType = { $: CheerioStatic, selectorGroup: SelectorGroup }
export type NavigateOnPageArgsType = { page: Page, selectorGroup: SelectorGroup }

export type ForEachElementType<El> = (element: El) => void;
export type GetElementsType<El> = ({ $, selectorGroup }: GetElementsArgsType) => El[];
export type NavigateOnPageType = ({ page, selectorGroup }: NavigateOnPageArgsType) => NavigateType;


export interface IParserArgs<El> {
  getElements: GetElementsType<El>,
  selectorGroup: SelectorGroup,
  forEachElement: ForEachElementType<El>,

  navigateOnPage: NavigateOnPageType,
}

type Parser = {
  parse: (url: string) => Promise<void>
}

export const getParser = <El>(
  { getElements, selectorGroup, forEachElement, navigateOnPage = navigateDefault }: IParserArgs<El>
): Parser => {
  const parse = async (url: string) => {
    const { browser, page } = await initBrowser(url);

    await navigateOnPage({ page, selectorGroup });

    const pageContent = await page.content();
    await browser.close();

    const $ = cherrio.load(pageContent);
    const elementsSrcs = getElements({ $, selectorGroup });

    elementsSrcs.forEach(forEachElement);
  };

  return { parse };
};

