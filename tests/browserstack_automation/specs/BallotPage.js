/* eslint-disable no-unused-vars */

import { driver, expect, browser } from '@wdio/globals';



import ReadyPage from '../page_objects/ready.page';
import BallotPage from '../page_objects/ballot.page';


const { describe, it } = require('mocha');

const waitTime = 5000;
const verifyAddressModal = async () => {
  await (BallotPage.getBallotAddressElement).click();
  await driver.pause(waitTime);

  await expect(BallotPage.getBallotModalTitleElement).toHaveText('Enter Your Address');
};
beforeEach(async function () {
  if (this.currentTest.title !== 'verifyBallotPageLinksNavigations') {
    // Skip for the specific test case
    await ReadyPage.load();
    await driver.maximizeWindow();
    await driver.pause(waitTime);
  }
});

describe('Ballot Page', async () => {
  it('verifyBallotPageLinksNavigations', async () => {
    await ReadyPage.load();
    await driver.maximizeWindow();
    await expect(BallotPage.getViewBallotElement).toBeClickable();
    await (BallotPage.getViewBallotElement).click();

    await expect(browser).toHaveUrl(expect.stringContaining('ballot'));
    await expect(BallotPage.getBallotTopElement).toBeClickable();
    await expect(browser).toHaveUrl(expect.stringContaining('ballot'));
  });

  it('verifyBallotAddressLinks', async () => {
    await verifyAddressModal();
    await (BallotPage.getBallotModalCloseElement).click();
    await (await BallotPage.getBallotTopElement).click();
    await verifyAddressModal();
  });

  it('validateBallotModalUIComponents', async () => {
    await (await BallotPage.getBallotAddressElement).click();


    await expect(BallotPage.getBallotModalInputElement).toBeDisplayed();
    await (await BallotPage.getBallotModalInputElement).click();
    await expect(await BallotPage.getBallotModalInputElement.getAttribute('placeholder')).toBe('Street number, full address and ZIP...');
    await expect(await BallotPage.getBallotModalSaveElement).toBeClickable();
    await expect(await BallotPage.getBallotModalCancelElement).toBeClickable();

  });
});
