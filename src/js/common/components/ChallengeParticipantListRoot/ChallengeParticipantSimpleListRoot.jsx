import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import ChallengeParticipantList from './ChallengeParticipantList';
import AppObservableStore, { messageService } from '../../stores/AppObservableStore';
import ChallengeParticipantStore from '../../stores/ChallengeParticipantStore';
import FirstChallengeParticipantListController from './FirstChallengeParticipantListController';

// const FirstChallengeParticipantListController = React.lazy(() => import(/* webpackChunkName: 'FirstChallengeParticipantListController' */ './FirstChallengeParticipantListController'));
const participantListDummyData = [
  { rank: 5340, participant_name: 'Melina H.', points: 142, invitees_who_joined: 3, invitees_count: 10, invitees_who_viewed: 8, invitees_who_viewed_plus: 21, voter_we_vote_id: 'wv02voter1238' },
  { rank: 5341, participant_name: 'David N.', points: 121, invitees_who_joined: 1, invitees_count: 7, invitees_who_viewed: 3, invitees_who_viewed_plus: 18, voter_we_vote_id: 'wv02voter1237' },
  { rank: 5342, participant_name: 'Anusha G.', points: 118, invitees_who_joined: 1, invitees_count: 5, invitees_who_viewed: 2, invitees_who_viewed_plus: 15, voter_we_vote_id: 'wv02voter1236' },

];


const ChallengeParticipantSimpleListRoot = ({ challengeWeVoteId, classes, uniqueExternalId, showSimpleList }) => {
  // eslint-disable-next-line no-unused-vars
  const [participantList, setParticipantList] = React.useState([]);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [rankOfVoter, setRankOfVoter] = React.useState(0);

  const onAppObservableStoreChange = () => {
    setRankOfVoter(AppObservableStore.getChallengeParticipantRankOfVoterByChallengeWeVoteId(challengeWeVoteId));
  };

  const onChallengeParticipantStoreChange = () => {
    const sortedParticipantsWithRank = ChallengeParticipantStore.getChallengeParticipantList(challengeWeVoteId);
    setParticipantList(sortedParticipantsWithRank);
    setParticipantsCount(sortedParticipantsWithRank.length);
  };

  React.useEffect(() => {
    // console.log('Fetching participants for:', challengeWeVoteId);
    const appStateSubscription = messageService.getMessage().subscribe(() => onAppObservableStoreChange());
    onAppObservableStoreChange();
    const challengeParticipantStoreListener = ChallengeParticipantStore.addListener(onChallengeParticipantStoreChange);
    onChallengeParticipantStoreChange();

    return () => {
      appStateSubscription.unsubscribe();
      challengeParticipantStoreListener.remove();
    };
  }, [challengeWeVoteId]);
  return (
    <ChallengeParticipantListRootContainer>
      <ChallengeParticipantList
        // participantList={participantList}
        participantList={participantListDummyData}
        uniqueExternalId={uniqueExternalId}
        showSimpleList={showSimpleList}
      />
      <Suspense fallback={<></>}>
        <FirstChallengeParticipantListController challengeWeVoteId={challengeWeVoteId} searchText="SEARCH TEXT HERE" />
      </Suspense>
    </ChallengeParticipantListRootContainer>
  );
};
ChallengeParticipantSimpleListRoot.propTypes = {
  classes: PropTypes.object.isRequired,
  // clearSearchFunction: PropTypes.func.isRequired,
  // searchFunction: PropTypes.func.isRequired,
  challengeWeVoteId: PropTypes.string,
  uniqueExternalId: PropTypes.string,
  showSimpleList: PropTypes.bool,
};

const styles = () => ({
  buttonDesktop: {
    padding: '2px 6px',
    borderRadius: 5,
    fontSize: 14,
  },
  searchButton: {
    borderRadius: 50,
  },
});

const ChallengeParticipantListRootContainer = styled.div`
  max-width: 100vw;
  margin: 0 auto;
`;
export default withStyles(styles)(ChallengeParticipantSimpleListRoot);
