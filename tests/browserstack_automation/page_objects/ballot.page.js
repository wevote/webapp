import { $ } from '@wdio/globals';
import Page from './page';


class BallotPage extends Page {
  constructor () {
    super().title = 'Ballot - WeVote';
  }

  get getViewBallotElement () {
    return $('(//button[contains(@id, "viewUpcomingBallot")])[1]');
  }

  get getBallotTopElement () {
    return $('#ballotTabHeaderBar');
  }

  get getBallotAddressElement () {
    return $('  #ballotTitleBallotAddress span');
  }

  get getBallotModalTitleElement () {
    return $('#SelectBallotModalTitleId');
  }

  get getBallotModalCloseElement () {
    return $('#profileCloseSelectBallotModal');
  }

  get getBallotModalInputElement () {
    return $('#entryBox');
  }

  get getBallotModalSaveElement () {
    return $('#addressBoxModalSaveButton');
  }

  get getBallotModalCancelElement () {
    return $('#addressBoxModalCancelButton');
  }
}
export default new BallotPage();
