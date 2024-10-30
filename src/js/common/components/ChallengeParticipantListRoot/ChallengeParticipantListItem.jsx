import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import DesignTokenColors from '../Style/DesignTokenColors';
import speakerDisplayNameToInitials from '../../utils/speakerDisplayNameToInitials';
import { getChallengeValuesFromIdentifiers } from '../../utils/challengeUtils';

const ChallengeParticipantListItem = ({ challengeWeVoteId, participant, isCurrentUser }) => {
  let avatarJsx;
  if (participant && participant.we_vote_hosted_profile_image_url_medium) {
    avatarJsx = <AvatarStyled src={participant.we_vote_hosted_profile_image_url_medium} alt={participant.participant_name} />;
  } else {
    const { sx, children } = speakerDisplayNameToInitials(participant.participant_name);
    avatarJsx = <AvatarStyled sx={sx}>{children}</AvatarStyled>;
  }

  function getChallengeBasePath () {
    const {
      challengeSEOFriendlyPath,
    } = getChallengeValuesFromIdentifiers('', challengeWeVoteId);
    let challengeBasePath;
    if (challengeSEOFriendlyPath) {
      challengeBasePath = `/${challengeSEOFriendlyPath}/+/`;
    } else {
      challengeBasePath = `/+/${challengeWeVoteId}/`;
    }
    return challengeBasePath;
  }

  return (
    <ParticipantItem isCurrentUser={isCurrentUser}>
      <ParticipantRow>
        <Rank>{`#${participant.rank}`}</Rank>
        <ParticipantName>
          {avatarJsx}
          {participant.participant_name}
        </ParticipantName>
        <Points>{participant.points}</Points>
        <FriendsJoined makeBold={participant.invitees_who_joined > 0}>{participant.invitees_who_joined}</FriendsJoined>
      </ParticipantRow>
      <Details>
        {participant.invitees_count > 0 && `${participant.invitees_count} invited`}
        {(participant.invitees_count > 0 && participant.invitees_who_viewed > 0) ? ', ' : ''}
        {participant.invitees_who_viewed > 0 && `${participant.invitees_who_viewed} viewed challenge`}
        {(participant.invitees_who_viewed_plus > 0 && participant.invitees_who_viewed !== participant.invitees_who_viewed_plus) && (
          <>
            {' '}
            {`- ${participant.invitees_who_viewed_plus} total views`}
          </>
        )}
        {(isCurrentUser && challengeWeVoteId) && (
          <>
            {' '}
            <Link
              className="u-link-color u-link-underline"
              id="boostYourScore"
              to={`${getChallengeBasePath()}invite-friends`}
            >
              boost your score
            </Link>
          </>
        )}
      </Details>
    </ParticipantItem>
  );
};
ChallengeParticipantListItem.propTypes = {
  challengeWeVoteId: PropTypes.string,
  isCurrentUser: PropTypes.bool,
  participant: PropTypes.object,
};

const AvatarStyled = styled(Avatar)`
`;

const Details = styled('div')`
  color: ${DesignTokenColors.neutral900};
  font-size: 14px;
  margin-top: 8px;
  text-align: left;
`;

const FriendsJoined = styled('div', {
  shouldForwardProp: (prop) => !['makeBold'].includes(prop),
})(({ makeBold }) => (`
  color: ${DesignTokenColors.neutral900};
  font-size: 14px;
  ${makeBold ? 'font-weight: bold;' : ''}
  text-align: center;
  width: 76px;
`));

const ParticipantItem = styled('div', {
  shouldForwardProp: (prop) => !['isCurrentUser'].includes(prop),
})(({ isCurrentUser }) => (`
  background-color: ${isCurrentUser ? '#f9e79f' : '#fff'};
  padding: 15px 0 15px 7px;
  border-bottom: 1px solid ${DesignTokenColors.neutral100};
`));

const ParticipantName = styled('div')`
  align-items: center;
  color: ${DesignTokenColors.neutral900};
  display: flex;
  flex: 1;
  font-weight: bold;
  gap: 10px;
  margin-left: 10px;
`;

const ParticipantRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Points = styled('div')`
  color: ${DesignTokenColors.neutral900};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  width: 80px;
`;

const Rank = styled('div')`
  font-weight: bold;
  color: ${DesignTokenColors.neutral900};
  width: 35px; /* Adjust width as needed */
`;

export default ChallengeParticipantListItem;
