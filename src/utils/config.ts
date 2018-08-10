import { config } from 'dotenv';

const configLoaded = config();

if (configLoaded.error) {
  // console.log('jbga', configLoaded.error);
  throw configLoaded.error;
}

// console.log('Config loded:', configLoaded);

export const WA_TEST_BASEURL = String(process.env.WA_TEST_BASEURL);
export const WA_TEST_USER = String(process.env.WA_TEST_USER);
export const WA_TEST_PASS = String(process.env.WA_TEST_PASS);
