import withStyles from '@mui/styles/withStyles';
import { EventOutlined, CampaignOutlined, EmojiEventsOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import DesignTokenColors from '../Style/DesignTokenColors';
import { renderLog } from '../../utils/logging';
import ChallengeParticipantStore from '../../stores/ChallengeParticipantStore';
import ChallengeStore from '../../stores/ChallengeStore';
import AppObservableStore, { messageService } from '../../stores/AppObservableStore';
import normalizedImagePath from '../../utils/normalizedImagePath';

import rocketShipNoThrust from '../../../../img/global/svg-icons/rocket-ship-no-thrust.svg';

function ChallengeAbout ({ challengeWeVoteId, showDaysLeft }) {
  renderLog('ChallengeAbout');
  const [challengeOwners, setChallengeOwners] = React.useState([]);
  const [challengeInviteesCount, setChallengeInviteesCount] = React.useState(0);
  const [challengeParticipantCount, setChallengeParticipantCount] = React.useState(0);
  const [daysLeft, setDaysLeft] = React.useState(0);
  const [participantNameWithHighestRank, setParticipantNameWithHighestRank] = React.useState('');

  const onAppObservableStoreChange = () => {
    setParticipantNameWithHighestRank(AppObservableStore.getChallengeParticipantNameWithHighestRankByChallengeWeVoteId(challengeWeVoteId));
  };

  const onChallengeStoreChange = () => {
    if (challengeInviteesCount < ChallengeStore.getNumberOfInviteesInChallenge(challengeWeVoteId)) {
      setChallengeInviteesCount(ChallengeStore.getNumberOfInviteesInChallenge(challengeWeVoteId));
    }
    if (challengeParticipantCount < ChallengeStore.getNumberOfParticipantsInChallenge(challengeWeVoteId)) {
      setChallengeParticipantCount(ChallengeStore.getNumberOfParticipantsInChallenge(challengeWeVoteId));
    }
    setDaysLeft(ChallengeStore.getDaysUntilChallengeEnds(challengeWeVoteId));
    setChallengeOwners(ChallengeStore.getChallengeOwnerList(challengeWeVoteId));
  };
  const onChallengeParticipantStoreChange = () => {
    if (challengeParticipantCount < ChallengeParticipantStore.getNumberOfParticipantsInChallenge(challengeWeVoteId)) {
      setChallengeParticipantCount(ChallengeParticipantStore.getNumberOfParticipantsInChallenge(challengeWeVoteId));
    }
  };

  React.useEffect(() => {
    const appStateSubscription = messageService.getMessage().subscribe(() => onAppObservableStoreChange());
    onAppObservableStoreChange();
    const challengeParticipantStoreListener = ChallengeParticipantStore.addListener(onChallengeParticipantStoreChange);
    onChallengeParticipantStoreChange();
    const challengeStoreListener = ChallengeStore.addListener(onChallengeStoreChange);
    onChallengeStoreChange();

    return () => {
      appStateSubscription.unsubscribe();
      challengeParticipantStoreListener.remove();
      challengeStoreListener.remove();
    };
  }, [challengeWeVoteId]);

  // Variables to hold dummy data
  const challengeDates = (
    <span>
      {showDaysLeft && (
        <>
          {/* Jan 20, 24 - Sep 10, 24 · */}
          Ends Nov 5, 2024
          <ShowDaysLeftText>
            {' '}
            ·
            {' '}
            {daysLeft > 0 ? `${daysLeft} days left` : 'Challenge Ended'}
          </ShowDaysLeftText>
        </>
      )}
    </span>
  );
  const remindFriends = 'Remind as many friends as you can about the date of the election, and let them know you will be voting.';
  const currentLeader = `Current leader: ${participantNameWithHighestRank}`;
  const friendsInvited = (
    <span>
      {challengeParticipantCount}
      {' '}
      participants have invited
      {' '}
      {challengeInviteesCount}
      {' '}
      friends
    </span>
  );

  const showStartedBy = false;
  return (
    <ChallengeAboutWrapper>
      <CardRowsWrapper>
        <CardForListRow>
          <Suspense fallback={<></>}>
            {remindFriends && (
              <FlexDivLeft>
                <SvgImageWrapper>
                  <CampaignOutlinedStyled />
                </SvgImageWrapper>
                <RemindFriendsDiv>{remindFriends}</RemindFriendsDiv>
              </FlexDivLeft>
            )}
          </Suspense>
        </CardForListRow>
        {(challengeDates && showDaysLeft) && (
          <CardForListRow>
            <FlexDivLeft>
              <SvgImageWrapper>
                <EventOutlinedStyled />
              </SvgImageWrapper>
              <ChallengeDatesDiv>{challengeDates}</ChallengeDatesDiv>
            </FlexDivLeft>
          </CardForListRow>
        )}
        <CardForListRow>
          <Suspense fallback={<></>}>
            <FlexDivLeft>
              <SvgImageWrapper>
                <EmojiEventsOutlinedStyled />
              </SvgImageWrapper>
              <ChallengeLeaderWrapper>
                {/* <FriendsInvitedDiv>Your #5341</FriendsInvitedDiv> */}
                {!!(participantNameWithHighestRank) && (
                  <CurrentLeaderDiv>{currentLeader}</CurrentLeaderDiv>
                )}
                <FriendsInvitedDiv>{friendsInvited}</FriendsInvitedDiv>
              </ChallengeLeaderWrapper>
            </FlexDivLeft>
          </Suspense>
        </CardForListRow>
        {showStartedBy && (
          <CardForListRow>
            <Suspense fallback={<></>}>
              {challengeOwners && (
                <FlexDivLeft>
                  <SvgImageWrapper style={{ paddingTop: '3px' }}>
                    <ReactSVG
                      src={normalizedImagePath(rocketShipNoThrust)}
                      alt="Rocket Ship"
                      beforeInjection={(svg) => svg.setAttribute('style', { padding: '1px 1px 1px 0px' })}
                    />
                  </SvgImageWrapper>
                  <ChallengeOwnersDiv>
                    <ChallengeOwnersText>
                      Challenge started by
                      {' '}
                      {challengeOwners.map((owner) => <ChallengeOwnersSpan key={owner.organization_we_vote_id}>{owner.organization_name}</ChallengeOwnersSpan>)}
                    </ChallengeOwnersText>
                  </ChallengeOwnersDiv>
                </FlexDivLeft>
              )}
            </Suspense>
          </CardForListRow>
        )}
      </CardRowsWrapper>
    </ChallengeAboutWrapper>
  );
}
ChallengeAbout.propTypes = {
  challengeWeVoteId: PropTypes.string,
  showDaysLeft: PropTypes.bool,
};

const styles = () => ({
  howToVoteRoot: {
    color: '#999',
    height: 18,
    width: 18,
  },
});

export const CampaignOutlinedStyled = styled(CampaignOutlined)`
  font-size: 30px;
`;

export const EmojiEventsOutlinedStyled = styled(EmojiEventsOutlined)`
  margin-top: 2px;
`;

export const EventOutlinedStyled = styled(EventOutlined)`
  font-size: 25px;
`;

export const CardForListRow = styled('div')`
  color: ${DesignTokenColors.neutral500};
  font-size: 16px;
  padding: 3px 0;
  margin-bottom: 3px;
`;

export const CardRowsWrapper = styled('div')`
  margin-top: 2px;
`;

const ChallengeAboutWrapper = styled('div')`
  white-space: normal;
`;

const ChallengeOwnersDiv = styled('div')`
`;

const ChallengeOwnersText = styled('p')`
`;

const ChallengeOwnersSpan = styled('span')`
  font-weight: 500;
  color: ${DesignTokenColors.neutral600};
`;

export const FlexDivLeft = styled('div')`
  align-items: flex-start;
  display: flex;
  justify-content: start;
`;

export const SvgImageWrapper = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 35px;
  min-width: 35px;
  width: 35px;
  margin-right: 5px;
  margin-top: -4px;
`;

export const ChallengeDatesDiv = styled('div')`
`;

export const RemindFriendsDiv = styled('div')`
  font-weight: 600;
`;

export const ChallengeLeaderWrapper = styled('div')`
`;

export const CurrentLeaderDiv = styled('div')`
`;

export const FriendsInvitedDiv = styled('div')`
  margin-bottom: 15px;
`;

const ShowDaysLeftText = styled('span')`
  font-weight: 500;
  color: ${DesignTokenColors.neutral600};
`;

export default withStyles(styles)(ChallengeAbout);
