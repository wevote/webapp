import { $, $$ } from '@wdio/globals';
import Page from './page';
import { driver } from '@wdio/globals';
import TopNavigation from '../page_objects/topnavigation';

class CandidatesPage extends Page {
 /* constructor () {
    super().title = 'Ready to Vote? - WeVote';
  }*/

  async load () {
      await super.open('');
      await TopNavigation.toggleCandidatesTab(); 
    }
  
  get stateSelect () {
    return $("//select[@id='outlined-age-native-simple']");
  }

  get stateSelectOptions()
  {
    return $$("//select[@id='outlined-age-native-simple']//option")
  }
  get pageHeaders(){
   //return $$("//div[contains(@class,'WhatIsHappeningSection-sc-1uico8x-1')]//h2");
     return $$("h2#WhatIsHappeningTitle");
  }

  get searchBox(){
    return $("input[type='search']") 
  }

  get CandidateCardList(){
    return $$("//div[contains(@id,'cardForListBodyWrapper')]");
  }

  async getCandidateCardCandidateName(cardId){
    console.log ("Card Id in func: " +cardId);
    let candidate=await $(`//div[@id='${cardId}']//a[@id='candidateCardDisplayName']`);
    let candidateName=await candidate.getText();
    return candidateName;
}

async getCandidateCardState(cardId){
  console.log ("Card Id in func: " +cardId);
  let candidate=await $(`//div[@id='${cardId}']//div[contains(@id,'stateName')]`);
  let stateText=await candidate.getText();
  return stateText;
}

async getCandidateCardPartyName(cardId){
  console.log ("Card Id in func: " +cardId);
  let candidateParty=await $(`//div[@id='${cardId}']//div[contains(@class,'PoliticalParty')]`);
  let partyText=await candidate.getText();
  return partyText;
}

async getCandidateCardOffice(cardId){
  //await console.log ("Card Id in func: " +cardId);
  let candidateOffice=await $(`//div[@id='${cardId}']//div[contains(@class,'OfficeNameWrapper')]/div`);
  let officeText=candidateOffice.getText();
  return officeText;
}


}

export default new CandidatesPage();