import { Button } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import React, { Suspense, useEffect, useState } from 'react';
import { useReward } from 'react-rewards'; // react-rewards is a library for rewarding users with confetti
import styled from 'styled-components';
import DesignTokenColors from '../Style/DesignTokenColors';
import arrow from '../../../../img/global/icons/ph_arrow-up-bold.png';
import arrow1 from '../../../../img/global/icons/ph_arrow-up-bold_1.png';
import YourRankModal from './YourRankModal';
import AppObservableStore, { messageService } from '../../stores/AppObservableStore';
import ChallengeParticipantStore from '../../stores/ChallengeParticipantStore';
import FirstChallengeParticipantListController from '../ChallengeParticipantListRoot/FirstChallengeParticipantListController';

const YourRank = ({ classes, challengeWeVoteId }) => {
  const [clicked, setClicked] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [points, setPoints] = useState(0);
  // const [note, setNote] = useState("");
  const [arrowImage, setArrowImage] = useState(arrow);
  const [openYourRankModal, setOpenYourRankModal] = useState(false);
  const [rankOfVoter, setRankOfVoter] = React.useState(0);

  const { reward: triggerConfetti } = useReward('confettiReward', 'confetti', {
    elementCount: 50, // Number of confetti pieces
    spread: 80, // How far the confetti spreads
    elementSize: 8, // Size of the confetti
    zIndex: 10, // Z-index of the canvas
    springAnimation: true, // Should the confetti fall like spring animation
    colors: [
      DesignTokenColors.primary600, // Blue
      DesignTokenColors.caution800, // Yellow
      DesignTokenColors.confirmation700, // Green
      DesignTokenColors.accent500, // Orange
    ], // Colors of the confetti
    startVelocity: 20, // Higher velocity for a higher explosion
    decay: 0.9, // How quickly confetti falls back
    angle: 90, // Confetti moves straight up
  });

  const onAppObservableStoreChange = () => {
    setRankOfVoter(AppObservableStore.getChallengeParticipantRankOfVoterByChallengeWeVoteId(challengeWeVoteId));
  };

  const onChallengeParticipantStoreChange = () => {
    const sortedParticipantsWithRank = ChallengeParticipantStore.getChallengeParticipantList(challengeWeVoteId);
    setParticipantsCount(sortedParticipantsWithRank.length);
  };

  const handleClick = () => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints + 1;
      setClicked(true);
      setArrowImage(arrow1);

      // triggerConfetti(); // Show confetti when the button is clicked (uncomment this line to show confetti when the button rank is clicked)

      setTimeout(() => {
        setClicked(false);
        setArrowImage(arrow);
      }, 3000);
      return newPoints;
    });
    setOpenYourRankModal(!openYourRankModal);
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

  // Show confetti when the component mounts
  useEffect(() => {
    triggerConfetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <YourRankOuterWrapper>
      <YourRankInnerWrapper>
        <YourRankText>
          Your rank in the challenge:
        </YourRankText>
        <YourRankButtonWrapper clicked={clicked}>
          <Button
            id="confettiReward"
            onClick={handleClick}
            classes={{ root: classes.buttonDesktop }}
            style={{
              backgroundColor: clicked ? DesignTokenColors.accent500 : DesignTokenColors.whiteUI,
              color: clicked ? DesignTokenColors.whiteUI : DesignTokenColors.accent500,
            }}
          >
            #
            {rankOfVoter}
            {' '}
            <StyledArrowContainer>
              <ArrowImg src={arrowImage} alt="arrow" />
            </StyledArrowContainer>
          </Button>
        </YourRankButtonWrapper>
      </YourRankInnerWrapper>
      <Suspense fallback={<></>}>
        <FirstChallengeParticipantListController challengeWeVoteId={challengeWeVoteId} searchText="SEARCH TEXT HERE" />
      </Suspense>
      <Suspense fallback={<></>}>
        <YourRankModal
          challengeWeVoteId={challengeWeVoteId}
          show={openYourRankModal}
          toggleModal={() => setOpenYourRankModal(!openYourRankModal)}
        />
      </Suspense>
    </YourRankOuterWrapper>
  );
};
const styles = (theme) => ({
  buttonDesktop: {
    boxShadow: 'none !important',
    border: `1px solid ${DesignTokenColors.accent500}`,
    borderRadius: '20px 20px 20px 20px',
    color: DesignTokenColors.accent500,
    height: '34px',
    transition: 'color 0.3s ease',
    textTransform: 'none',
    width: '105px',
  },
  desktopSimpleLink: {
    border: `2px solid ${DesignTokenColors.accent500}`,
    boxShadow: 'none !important',
    color: DesignTokenColors.neutral500,
    marginTop: 10,
    padding: '0 20px',
    textTransform: 'none',
    width: 250,
  },
  mobileSimpleLink: {
    '&:hover': {
      color: DesignTokenColors.primary500,
      textDecoration: 'underline',
    },
    boxShadow: 'none !important',
    color: DesignTokenColors.neutral500,
    marginTop: 10,
    padding: '0 20px',
    textTransform: 'none',
    width: '100%',
  },
});

const YourRankInnerWrapper = styled('div')`
  align-items: center;
  display: flex;
  height: 70px;
  justify-content: center;
`;

const YourRankOuterWrapper = styled('div')`
  background-color: ${DesignTokenColors.neutralUI50};
  z-index: 100;
`;

const YourRankButtonWrapper = styled('div', {
  shouldForwardProp: (prop) => !['clicked'].includes(prop),
})(({ clicked }) => `
  align-items: center;
  background-color: ${clicked ? DesignTokenColors.accent500 : DesignTokenColors.whiteUI};
  border: 1px solid ${DesignTokenColors.accent500};
  border-radius: 20px;
  display: flex;
  gap: 0;
  height: 34px;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 105px;
`);

const YourRankText = styled('div')`
  margin-right: 10px;
`;

const StyledArrowContainer = styled('div')`
  angle: -90deg,
  gap: 0,
  height: 12.5px,
  left: 14.25px,
  opacity: 0,
  top: 2.75px,
  width: 10.5px,
`;

const ArrowImg = styled('img')`
  height: 12.5px;
  width: 10.5px;
`;

export default withStyles(styles)(YourRank);
