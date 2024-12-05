import { $ } from '@wdio/globals';
import Page from './page';
import { driver, expect } from '@wdio/globals';

class HowItWorks extends Page {

  get howItWorksTitle () {
    return $('div>h3[class~="gNNNpX"]');
  }
  get howItWorksDescription () {
    return $('div>p[class~="ejpinv"]');
  }

  get howItWorksImage () {
    return $('div>img').getAttribute('src')
  }
  get howItWorksLink () {
    return $('#footerLinkHowItWorks');
  }

  get findFirstNextButtonHowItWorksWindow () {
    return $('#annotatedSlideShowStep1Next');
  }

  get findSecondNextButtonHowItWorksWindow () {
    return $('#annotatedSlideShowStep2Next');
  }

  get findThirdNextButtonHowItWorksWindow () {
    return $('#annotatedSlideShowStep3Next');
  }

  get findFourthNextButtonHowItWorksWindow () {
    return $('#annotatedSlideShowStep4Next');
  }

  get findBackButtonHowItWorksWindow () {
    return $('//button[text() = "Back"]');
  }

  get getTitleSignUpPopUp () {
    return $('.u-f3');
  }

  get getStartedButton () {
    return $('#howItWorksGetStartedDesktopButton');
  }

  get enterVoterEmailAddressTextBox () {
    return $('#enterVoterEmailAddress');
  }

  get cancelEmailButton () {
    return $('#cancelEmailButton');
  }

  get cancelMobilePhoneNumberButton(){
    return $('#cancelVoterPhoneSendSMS')
  }

  get enterMobilePhoneNumber() {
    return $('#enterVoterPhone');
  }

  get enterSignInWithApple() {
    return $('#appleLogo');
  }

  get enterSignInWithTwitter () {
    return $('.csbvaL');
  }

  get cancelTwitterSignin(){
  return $('#cancel')
  }

  get gotoWeVoteBallotGuide() {
    return $('*=homepage')
  }

  get enterSendVerificationCode() {
    return $('#desktopSmsSendCode')
  }

  get enterSendEmailVerificationCode() {
    return $('#voterEmailAddressEntrySendCode')
  }

  get enterVerifyButton(){
    return $('#emailVerifyButton')
  }

  get enterProfileAvatar(){
    return $('#profileAvatarHeaderBar')
  }

  get phoneNumberHelperText(){
    return $('#enterVoterPhone-helper-text')
  }

  get emailAddressHelperText() {
    return $('#enterVoterEmailAddress-helper-text')
  }

  get backArrow() {
    return $('#emailVerificationBackButton')
  }

  get deleteIcon() {
    return $('svg[data-testid="DeleteIcon"]')
  }

  get alertMessage() {
    return $('.MuiAlert-message')
  }

  async enterDigit(num){
  if (num === 0) {
      return $('#digit1')
    }else if (num === 1) {
      return $('#digit2')
    } else if (num === 2) {
      return $('#digit3')
    } else if (num === 3) {
      return $('#digit4')
    } else if (num == 4) {
      return $('#digit5')
    } else{
      return $('#digit6')
    }

  }

  async clickButton(element){
    await element.findAndClick()
  }

  async scrollToView(element) {
   await element.scrollIntoView()
  }

  async clickHowItWorksLink () {
    await this.howItWorksLink .click();
  }

  async clickNextButtonFourTimes () {
    for (let i = 1; i <= 4; i++) {
      if (i == 1) {
        await this.findFirstNextButtonHowItWorksWindow.click();
      }else if (i ==2){
        await this.findSecondNextButtonHowItWorksWindow.click();
      }else if (i ==3){
        await this.findThirdNextButtonHowItWorksWindow.click();
      }else {
        await this.findFourthNextButtonHowItWorksWindow.click();
      }
    }
  }

  async clickNextButton (i) {
      if (i == 1) {
        await this.findFirstNextButtonHowItWorksWindow.click();
      }else if (i ==2){
        await this.findSecondNextButtonHowItWorksWindow.click();
      }else if (i ==3){
        await this.findThirdNextButtonHowItWorksWindow.click();
      }else {
        await this.findFourthNextButtonHowItWorksWindow.click();
      }
    }


  async checkDescriptionOfHowItWorksWindow (num) {
    if (num === 1) {
      return 'Follow topics that interest you. We will suggest endorsements based on your interests.';
    }else if (num === 2) {
      return 'Learn from the people you trust. Their recommendations are highlighted on your ballot.';
    } else if (num === 3) {
      return 'Your personalized score for a candidate is the number of people who support the candidate, from among the people you follow.';
    } else if (num === 4) {
      return 'WeVote is fast, mobile, and helps you decide on the go. Vote with confidence!';
    } else {
      return 'Are your family and friends feeling lost when it\'s time to vote? Be their hero, no matter which state they vote in.';
    }
  }

  async checkBrokenImagesUsingResponseCode() {
    const imageSrc = await this.howItWorksImage
    const response = await fetch(imageSrc);
    if (response.status == 200){
      console.log("Image loaded");
     } else{
      console.log('Image is not loaded');
     }
  }

   async clickBackButtonFourTimes () {
    for (let i = 1; i <= 4; i++) {
      await this.findBackButtonHowItWorksWindow.click();
    }
  }

  async checkTitleOfHowItWorksWindow (num) {
    if (num === 1) {
      return '1. Choose your interests';
    }else if (num === 2) {
      return '2. Follow organizations and people you trust';
    } else if (num === 3) {
      return '3. See who endorsed each choice on your ballot';
    } else if (num === 4) {
      return '4. Complete your ballot with confidence';
    } else {
      return '5. Share with friends who could use a guide';
    }
  }
}

export default new HowItWorks();
