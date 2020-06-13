import cherrio from 'cheerio';
import initBrowserSession from 'Utils/initBrowserSession';


export type Site = {
  name: string,
  url: string,
}

export type SiteData = {
  $: CheerioStatic,
  pageContent: string,
  screenShot: string,
}

const getSiteData = async (site: Site): Promise<SiteData> => {
  const { browser, page, screenShot } = await initBrowserSession(site.url);

  const pageContent = await page.content();
  await browser.close();

  const $ = cherrio.load(pageContent);

  return { $, pageContent, screenShot };
};

export default getSiteData;
