import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChallengeParticipantListItem from './ChallengeParticipantListItem';
import VoterStore from '../../../stores/VoterStore';

const ChallengeParticipantList = ({ participantList, uniqueExternalId, showSimpleList }) => {
  const [voterWeVoteID, setVoterWeVoteID] = React.useState('');

  const handleVoterStoreChange = () => {
    const voterID = VoterStore.getVoterWeVoteId();
    setVoterWeVoteID(voterID);
  };

  React.useEffect(() => {
    handleVoterStoreChange();
    const storeListener = VoterStore.addListener(handleVoterStoreChange);
    return () => {
      storeListener.remove();
    };
  }, []);

  const sortedParticipantList = [...participantList].sort((a, b) => a.rank - b.rank);

  const currentUser = sortedParticipantList.find(
    (participant) => participant.voter_we_vote_id === voterWeVoteID,
  );

  let simpleParticipantList = [];
  if (currentUser) {
    const currentUsersRank = currentUser.rank;

    // Create a list with only the current user, one above, and one below if they exist
    simpleParticipantList = sortedParticipantList.filter((participant) => {
      const { rank } = participant;

      // Always include the current user
      if (rank === currentUsersRank) {
        return true;
      }

      // Include the participant above the current user if it exists
      if (rank === currentUsersRank - 1 && rank > 0) {
        return true;
      }

      // Include the participant below the current user if it exists within bounds
      if (rank === currentUsersRank + 1 && rank <= sortedParticipantList.length) {
        return true;
      }

      return false;
    });
  }

  console.log(simpleParticipantList);


  return (
    <LeaderboardListContainer>
      {showSimpleList && simpleParticipantList.map((participant) => (
        <ChallengeParticipantListItem
          key={`participantKey-${participant.voter_we_vote_id}-${uniqueExternalId}`}
          participant={participant}
          isCurrentUser={participant.voter_we_vote_id === voterWeVoteID}
          showSimpleList={showSimpleList}
        />
      ))}
      {!showSimpleList && participantList.map((participant) => (
        <ChallengeParticipantListItem
          key={`participantKey-${participant.voter_we_vote_id}-${uniqueExternalId}`}
          participant={participant}
          isCurrentUser={participant.voter_we_vote_id === voterWeVoteID}
          showSimpleList={showSimpleList}
        />
      ))}
    </LeaderboardListContainer>
  );
};

ChallengeParticipantList.propTypes = {
  participantList: PropTypes.array,
  uniqueExternalId: PropTypes.string,
  showSimpleList: PropTypes.bool,
};

const LeaderboardListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100vh - 270px);
  padding: 10px;
`;

export default ChallengeParticipantList;
