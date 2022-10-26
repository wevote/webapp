import withStyles from '@mui/styles/withStyles';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import styled from 'styled-components';
import FriendActions from '../../actions/FriendActions';
import BallotActions from '../../actions/BallotActions';
import VoterActions from '../../actions/VoterActions';
import apiCalming from '../../common/utils/apiCalming';
import { isCordovaWide } from '../../common/utils/cordovaUtils';
import { isWebApp } from '../../common/utils/isCordovaOrWebApp';
import { renderLog } from '../../common/utils/logging';
import normalizedImagePath from '../../common/utils/normalizedImagePath';
import DownloadAppsButtons from './DownloadAppsButtons';
import Reassurance from '../SetUpAccount/Reassurance';
import { reassuranceTextRemindContacts } from './reassuranceTextRemindContacts';
import VoterStore from '../../stores/VoterStore';
import {
  DesktopNextButtonsInnerWrapper, DesktopNextButtonsOuterWrapperUShowDesktopTablet,
  MobileStaticNextButtonsInnerWrapper, MobileStaticNextButtonsOuterWrapperUShowMobile,
} from '../Style/NextButtonStyles';
import { RemindContactsImportText, RemindMainImageImg } from '../Style/RemindStyles';
import {
  SetUpAccountContactsTextWrapper,
  SetUpAccountTitle,
} from '../Style/SetUpAccountStyles';
import SuggestedContactListWithController from '../Friends/SuggestedContactListWithController';
import historyPush from "../../common/utils/historyPush";

const AddContactsFromGoogleButton = React.lazy(() => import(/* webpackChunkName: 'AddContactsFromGoogleButton' */ '../SetUpAccount/AddContactsFromGoogleButton'));

const addressBookSVG = '../../../img/get-started/address-book.svg';


class RemindContactsStart extends Component {
  constructor (props) {
    super(props);
    this.state = {
      voterContactEmailListCount: 0,
    };
  }

  componentDidMount () {
    this.onVoterStoreChange();
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
    if (apiCalming('friendListsAll', 30000)) {
      FriendActions.friendListsAll();
    }
    if (apiCalming('voterBallotItemsRetrieve', 120000)) {
      BallotActions.voterBallotItemsRetrieve();
    }
    if (apiCalming('voterContactListRetrieve', 20000)) {
      VoterActions.voterContactListRetrieve();
    }
  }

  componentWillUnmount () {
    this.voterStoreListener.remove();
  }

  onVoterStoreChange () {
    const voterContactEmailListCount = VoterStore.getVoterContactEmailListCount();
    this.setState({
      voterContactEmailListCount,
    });
  }

  goToSkipForNow = () => {
    historyPush('/remind/addcontacts');
  }

  render () {
    renderLog('RemindContactsStart');  // Set LOG_RENDER_EVENTS to log all renders
    const { classes } = this.props;
    const { voterContactEmailListCount } = this.state;
    const addressBookSVGSrc = normalizedImagePath(addressBookSVG);

    const desktopInlineButtonsOnInMobile = true;
    let desktopInlineButtonsOnBreakValue;
    if (desktopInlineButtonsOnInMobile) {
      desktopInlineButtonsOnBreakValue = 1;
    } else {
      desktopInlineButtonsOnBreakValue = isCordovaWide() ? 1000 : 'sm';
    }
    const pigsCanFly = false;
    return (
      <>
        {(voterContactEmailListCount > 0) ? (
          <RemindContactsStartWithContactsWrapper>
            <SetUpAccountTitle>
              Remind 5 of your friends
              {' '}
              <span className="u-no-break">
                to vote today
              </span>
            </SetUpAccountTitle>
            <div>
              <SuggestedContactListWithController remindMode />
            </div>
          </RemindContactsStartWithContactsWrapper>
        ) : (
          <RemindContactsStartWrapper>
            <SetUpAccountTitle>
              Remind 5 of your friends
              {' '}
              <span className="u-no-break">
                to vote today
              </span>
            </SetUpAccountTitle>
            <SetUpAccountContactsTextWrapper>
              <RemindContactsImportText>
                Polls predict fewer than 50% of eligible Americans will vote in the next election.
                {' '}
                <span className="u-no-break">
                  Let&apos;s change that!
                </span>
              </RemindContactsImportText>
            </SetUpAccountContactsTextWrapper>
            <ImageOuterWrapper>
              <MainImageWrapper>
                <div>
                  <RemindMainImageImg src={addressBookSVGSrc} alt="" />
                </div>
              </MainImageWrapper>
            </ImageOuterWrapper>
            <div>
              <Suspense fallback={<></>}>
                <AddContactsFromGoogleButton darkButton />
              </Suspense>
            </div>
            <Reassurance displayState={1} reassuranceText={reassuranceTextRemindContacts} />
            <DesktopNextButtonsOuterWrapperUShowDesktopTablet breakValue={desktopInlineButtonsOnBreakValue}>
              <DesktopNextButtonsInnerWrapper>
                <Button
                  classes={{ root: classes.addFriendsManuallyLink }}
                  onClick={this.goToSkipForNow}
                >
                  Or, add friends manually
                </Button>
              </DesktopNextButtonsInnerWrapper>
            </DesktopNextButtonsOuterWrapperUShowDesktopTablet>
            {(isWebApp() && pigsCanFly) && (
              <DownloadAppsButtons />
            )}
          </RemindContactsStartWrapper>
        )}
      </>
    );
  }
}
RemindContactsStart.propTypes = {
  classes: PropTypes.object,
};

const styles = () => ({
  addFriendsManuallyLink: {
    boxShadow: 'none !important',
    color: '#065FD4',
    marginTop: 10,
    padding: '0 20px',
    textTransform: 'none',
    width: 250,
    '&:hover': {
      color: '#4371cc',
      textDecoration: 'underline',
    },
  },
});

const MainImageWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

const ImageOuterWrapper = styled('div')`
  margin-bottom: 24px;
  margin-top: 24px;
  width: 100%;
`;

const RemindContactsStartWithContactsWrapper = styled('div')`
  margin-bottom: 48px;
  margin-top: 36px;
`;

const RemindContactsStartWrapper = styled('div')`
  margin-bottom: 48px;
  margin-top: 36px;
`;

export default withStyles(styles)(RemindContactsStart);