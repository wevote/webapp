import { browser, driver, expect } from '@wdio/globals';
import CandidatesPage from '../page_objects/candidates.page';
import { Key } from 'webdriverio';

const testDataPath="tests/browserstack_automation/capabilities/";
const fs=require('fs');
const assert = require('assert');
const titleStr=" Candiates - weVote";
const waitTime = 8000;

describe('Candidates Page', () => {
  
  it('verifyAllStateNamesPresentforChooseState', async () => {
    await CandidatesPage.load();
    await driver.pause(waitTime);
    await CandidatesPage.stateSelect.click();
    const options=await CandidatesPage.stateSelectOptions;
    const expectedStates=readTestData_States(0,"all");
    console.log("Expected: "+expectedStates);
    let actualStates=[];
    await options.forEach(async (option)=>{
      let stateName=await option.getText();
      if (! stateName.includes("Choose state")){
          actualStates.push(stateName);
        }
    });
    await expectedStates.forEach((state)=>{
          assert(actualStates.includes(state),"State -> '"+state +"'  .. not found on the Choose state Dropdown Options .");
          });
  });

   //Candidates_001
    let stateNames=readTestData_States(3,"random");
    console.log("verifyTitleWhenStateSelected -> "+ stateNames);
    stateNames.forEach((stateText) => {
    it('verifyTitleWhenStateSelected', async () => {
        await CandidatesPage.load();
        await CandidatesPage.stateSelect.selectByVisibleText(stateText);
        const expectedTitle=stateText+titleStr;
        let actualTitle=await driver.getTitle();
        expect(actualTitle.match(expectedTitle));
    });
  });


    //Candidates_007
    const stateNamesRandomTC7=readTestData_States(3,"random");
    const possibleHeaders=readTestData_AllPossibleHeaders();
    stateNamesRandomTC7.forEach((stateText) => {
    it('verifyHeadersMatchPossibleHeaders', async () => {
        console.log("Running verifyHeadersMatchPossibleHeaders -> Using sate: "+stateText);
        CandidatesPage.load();
        await driver.pause(waitTime);
        await CandidatesPage.stateSelect.selectByVisibleText(stateText);
        await driver.pause(waitTime);
        let actualHeaders=await CandidatesPage.pageHeaders;
        await actualHeaders.forEach(async (header)=>{
                let headerText=await header.getText();
                assert(possibleHeaders.includes(headerText),"Header section -> '"+headerText +"'  .. does not match with any of the expected Headers."); 
                });      
        });
    });

    //Candidates_008
    const stateNamesRandomTC8=readTestData_States(3,"random");
    const MandatoryHeaders=readTestData_MandatoryHeaders();
    stateNamesRandomTC8.forEach((stateText) => {
    it('verifyMandatoryHeaderPresent', async () => {
        console.log("Running verifyMandatoryHeaderPresent -> Using sate: "+stateText);
        CandidatesPage.load();
        await driver.pause(waitTime);
        await CandidatesPage.stateSelect.selectByVisibleText(stateText);
        await driver.pause(waitTime);
        const actualHeaders=await CandidatesPage.pageHeaders;
        const actualHeadersText=[];
        await actualHeaders.forEach(async (header)=>{
            actualHeadersText.push(await header.getText());
        });
        console.log(actualHeaders);
        MandatoryHeaders.forEach((mandatoryHeader)=>{
                assert(actualHeadersText.includes(mandatoryHeader),"Mandatory Header section -> '"+mandatoryHeader +"'  .. not found on the page..");            
                });  
        });
    });


    //verfiy Candidate cards have Candidate Name displayed
   it('verifycandidateCardHasNameDisplayed', async () => {
      await CandidatesPage.load();
      await driver.pause(waitTime);
      /*remove this after defect 371 fix
      await CandidatesPage.searchBox.setValue("Kevin");
      await driver.pause(waitTime);
      // end */
      let candidateCards=await CandidatesPage.CandidateCardList;
       console.log("Total cards: "+candidateCards.length);
      await candidateCards.forEach(async (card) => {
        let cardId=await card.getAttribute('id');
         console.log("Card id: "+cardId);
       let state=await CandidatesPage.getCandidateCardCandidateName(cardId);
        console.log("Name Text: "+state);
        });

    });



        //verfiy text in Candidate cards have state displayed
   it('verifycandidateCardHasStateDisplayed', async () => {
    await CandidatesPage.load();
    await driver.pause(waitTime);
    let candidateCards=await CandidatesPage.CandidateCardList;
     console.log("Total cards: "+candidateCards.length);
    await candidateCards.forEach(async (card) => {
      let cardId=await card.getAttribute('id');
       console.log("Card id: "+cardId);
     let state=await CandidatesPage.getCandidateCardState(cardId);
      console.log("State Text: "+state);
      });
  });

        //verfiy text in Candidate cards have Party Name displayed
        it('verifycandidateCardHasPartyNameDisplayed', async () => {
          await CandidatesPage.load();
          await driver.pause(waitTime);
          let candidateCards=await CandidatesPage.CandidateCardList;
           console.log("Total cards: "+candidateCards.length);
          await candidateCards.forEach(async (card) => {
            let cardId=await card.getAttribute('id');
             console.log("Card id: "+cardId);
           let state=await CandidatesPage.getCandidateCardPartyName(cardId);
            console.log("party Text: "+state);
            });
        });

   //verfiy text in Candidate cards have Party Name displayed
   it('verifycandidateCardHasOfficeDisplayed', async () => {
    await CandidatesPage.load();
    await driver.pause(waitTime);
    let candidateCards=await CandidatesPage.CandidateCardList;
     console.log("Total cards: "+candidateCards.length);
    for await (const card of candidateCards ){
      let cardId=await card.getAttribute('id');
      // console.log("Card id: "+cardId);
     let office=(await CandidatesPage.getCandidateCardOffice(cardId));
      await console.log("C: "+cardId+" Office Text: "+office);
      };
  });



    //read All Possible Headers from candidatesPage_TC001.json
    function readTestData_AllPossibleHeaders(){
            let jsonObjH=JSON.parse(fs.readFileSync(testDataPath+'candidatesPage_TC001.json'));
            let possibleHeaders=jsonObjH.map(i=> i.HeaderText);
            return possibleHeaders;
   }
   //read Mandatory Headers from candidatesPage_TC001.json
   function readTestData_MandatoryHeaders(){
            let jsonObjH=JSON.parse(fs.readFileSync(testDataPath+'candidatesPage_TC001.json'));
            let MandatoryHeaders=(jsonObjH.filter(header => header.Mandatory=='Y')).map(i=> i.HeaderText);
            return MandatoryHeaders;
   }  
   //read stateNames from candidatesPage_TC002.json, return 5 random states for test run
    function readTestData_States(count,type){
            let jsonObjSt=JSON.parse(fs.readFileSync(testDataPath+'candidatesPage_TC002.json'));
            const allStateNames=(jsonObjSt[0])["States"];
            if (type=="all"){
                return allStateNames;
            }
            else if (type=="random"){
                let states=[];
                for (let cnt=0;cnt<count;cnt++){
                    states.push(allStateNames[Math.floor(Math.random()*allStateNames.length)]);
                    
            }
               // console.log("X:: "+states);
                return states; 
                                 }   
    }

});