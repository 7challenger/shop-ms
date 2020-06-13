import mongoose from 'mongoose';
import graylog2 from 'graylog2';
// import { DiffDOM } from 'diff-dom';
import getEnvConfig from 'Utils/getEnvConfig';
import validateError from 'Utils/validateError';

import sitesCollection, { SiteSchema } from './SiteSchema';
import type { Site, SiteData } from './getSiteData';
import logger from 'Utils/logger-ax';

const serviceName = 'SiteChecker::mongo';
const onFound = async (error: Error, foundSite: mongoose.Document | null, site: any, siteData: SiteData) => {
  validateError(error, serviceName);

  if (foundSite) {
    await logger.log(['foundSite', foundSite], serviceName);
    return;
  }

  await sitesCollection.create({
    name: site.name,
    htmlContent: siteData.pageContent,
    // screenShot: siteData.screenShot,
  });
};


const getHasMarkupChanged = async (site: Site, siteData: SiteData): Promise<boolean> => {
  const envConfig = getEnvConfig();

  if (mongoose.connection.readyState === 0) {
    await logger.log('connecting to mongo; readyState === 0', serviceName);
    await mongoose.connect(
      `${envConfig.mongo.host}/${envConfig.mongo.sitesDb.name}`,
      envConfig.mongo.sitesDb.opts,
    );
  }

  await sitesCollection
    .findOne({ name: site.name }, 'name htmlContent', (error, foundSite) => {
      onFound(error, foundSite, site, siteData);
    });

  // await mongoose.disconnect();

  return false;
};

export default getHasMarkupChanged;
