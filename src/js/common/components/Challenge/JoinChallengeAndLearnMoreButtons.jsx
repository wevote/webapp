import React, { Suspense } from 'react';
import { Button } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import JoinChallengeButton from './JoinChallengeButton';

const JoinChallengeButton = React.lazy(() => import(/* webpackChunkName: 'JoinChallengeButton' */ '../../components/Challenge/JoinChallengeButton'));

const JoinChallengeAndLearnMoreButtons = ({ challengeSEOFriendlyPath, challengeWeVoteId, classes }) => {
  return (
    <JoinChallengeButtonWrapper>
      <Suspense fallback={<></>}>
        <JoinChallengeButton
          // challengeSEOFriendlyPath={challengeSEOFriendlyPathForDisplay}
          challengeSEOFriendlyPath={challengeSEOFriendlyPath}
          challengeWeVoteId={challengeWeVoteId}
        />
      </Suspense>
      <Button
        classes={{ root: classes.learnMoreButton }}
        color="secondary"
        id={`challengeLearnMore-${challengeWeVoteId}`}
        variant="outlined"
      >
        Learn More
      </Button>
    </JoinChallengeButtonWrapper>
  );
};

const styles = () => ({
  joinChallengeButton: {
    borderRadius: 45,
    maxWidth: 300,
    marginRight: '10px',
    marginTop: '10px',
  },
  learnMoreButton:{
    borderRadius: 45,
    maxWidth: 300,
    marginTop: '10px',
  },
});

const JoinChallengeButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex;
`;

JoinChallengeAndLearnMoreButtons.propTypes = {
  challengeWeVoteId: PropTypes.string,
  classes: PropTypes.object.isRequired,
  seoFriendlyPath: PropTypes.string,
};

export default withStyles(styles)(JoinChallengeAndLearnMoreButtons);


