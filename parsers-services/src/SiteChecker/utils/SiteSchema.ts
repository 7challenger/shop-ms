import mongoose from 'mongoose';

export type SiteSchema = {
  name: string,
  htmlContent: string,
  // screenShot: string,
}

const siteSchema = new mongoose.Schema({
  name: String,
  htmlContent: String,
  // screenShot: String,
});

export default mongoose.model('sites', siteSchema);
