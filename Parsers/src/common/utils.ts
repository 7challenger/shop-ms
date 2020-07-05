import puppeteer from 'puppeteer';
import { NavigateOnPageArgsType } from './createParser';

export interface IPageBrowser {
  page: puppeteer.Page,
  browser: puppeteer.Browser,
}

export type NavigateType = Promise<undefined>;

export type SelectorGroup = { [k: string]: string }

export type BrowserOpts = {
  width: number,
  height: number,
  headless: boolean,
};

export const initBrowser = async (url: string /* opts: BrowserOpts */): Promise<IPageBrowser> => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      // `--ash-host-window-bounds=2000`,
      // `--window-size=2000,2000`,
      '--window-position=0,0',
    ],
  });

  const [page] = await browser.pages();
  // await page.setViewport({ width: 2000, height: 2000 });
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  return { page, browser };
};

// export const delay = (ms: number): NavigateType => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// };

export const navigate = async ({ page, selectorGroup }: NavigateOnPageArgsType): NavigateType => {
  console.log(page, selectorGroup);
  return undefined;
};

