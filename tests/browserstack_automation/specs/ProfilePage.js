import { driver, expect } from '@wdio/globals';
import ReadyPage from '../page_objects/ready.page';
import ProfilePage from '../page_objects/profile.page';


const waitTime = 5000;


/* eslint-disable no-undef */
// This eslint-disable turns off warnings for describe() and it()
// We don't need those warnings, because describe() and it() are available at runtime
// https://webdriver.io/docs/pageobjects


describe('ProfilePage', () => {
 // Ready_001
  it('verifyProfilePageLoads', async () => {
   await ReadyPage.login();
   await ReadyPage.load();
   await driver.pause(waitTime);
   await driver.waitUntil(async () => (ReadyPage.getProfileIconElement.isClickable()));
   await ReadyPage.getProfileIconElement.click();
   await driver.waitUntil(async () => {
     // Add condition to check for the expected URL
     const currentUrl = await driver.getUrl();
     console.log(currentUrl);
     return currentUrl.includes('settings/profile');
   }, {
     timeout: 10000,
     timeoutMsg: 'Expected URL to contain "settings/profile" not found, timeout after 10000ms',
   });

 });
 });




