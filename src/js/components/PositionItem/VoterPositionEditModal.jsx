import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DesignTokenColors from '../../common/components/Style/DesignTokenColors';
import ModalDisplayTemplateA from '../Widgets/ModalDisplayTemplateA';

const VoterPositionEditModal = (props) => {
  const [opinionVisibility, setOpinionVisibility] = useState('Everyone');
  const [endorseOption, setEndorseOption] = useState('Neutral');
  const [opinionText, setOpinionText] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { showVoterEdit, setShowVoterEdit, candidateName, voter } = props;
  const {voter_photo_url_medium, first_name, last_name, full_name} = voter;

  const visibilityOptions = ['My friends', 'Everyone'];
  const endorsesOptions = ['Endorsing', 'Opposing', 'Neutral'];

  const handleChangeVisibility = (e) => {
    setOpinionVisibility(e.target.value);
  };

  const handleChangeEndorses = (e) => {
    setEndorseOption(e.target.value);
  };

  const handleChangeOpinionText = (e) => {
    setOpinionText(e.target.value);
  };

  useEffect(() => {
    const checkIsFormValid = () => {
      if (endorseOption !== 'Neutral') {
        setIsFormValid(true);
      }
      if (opinionText !== '') {
        setIsFormValid(true);
      }
      if (endorseOption === 'Neutral' && opinionText === '') {
        setIsFormValid(false);
      }
    };
    checkIsFormValid();
  }, [endorseOption, opinionText]);



  const visibilityOptionsMap = visibilityOptions.map((option) => <OptionSelect key={option} value={option}>{option}</OptionSelect>);

  const endorsesOptionsMap = endorsesOptions.map((option) => (
    <EndorsesOption key={option}>
      <EndorsesRadio
        type="radio"
        value={option}
        checked={endorseOption === option}
        onChange={handleChangeEndorses}
        name={option}
      />
      <EndorsesLabel>
        {option}
      </EndorsesLabel>
    </EndorsesOption>
  ));

  const dialogTitleJSX = (
    <VoterPositionTitle>
      Create opinion about
      {' '}
      {candidateName || 'Candidate'}
    </VoterPositionTitle>
  );

  const textFieldJSX = (
    <VoterPositionTextFieldWrapper>
      <VoterPositionAvatarVisibilityWrapper>
        <VoterAvatarWrapper>
          <VoterAvatar>
            {voter.voter_photo_url_medium ?
              <VoterImage src={voter_photo_url_medium} alt="Voter" /> :
              (
                <>
                  <VoterFirstName>
                    {first_name[0]}
                  </VoterFirstName>
                  <VoterLastName>
                    {last_name?.[0]}
                  </VoterLastName>
                </>
              )}
          </VoterAvatar>
          <VoterEdit>
            <EditIcon />
          </VoterEdit>
        </VoterAvatarWrapper>
        <VoterNameVisibilityWrapper>
          <VoterFullName>
            {full_name}
          </VoterFullName>
          <VoterVisibilityWrapper>
            <OpinionOptionDescription
              htmlFor="visibility_option"
            >
              Opinion visibile to:
            </OpinionOptionDescription>
            <OpinionVisibility
              onChange={handleChangeVisibility}
              value={opinionVisibility}
              id="visibility_option"
            >
              {visibilityOptionsMap}
            </OpinionVisibility>
          </VoterVisibilityWrapper>
        </VoterNameVisibilityWrapper>
      </VoterPositionAvatarVisibilityWrapper>
      <VoterEndoreOpposeNeutralWrapper>
        {endorsesOptionsMap}
      </VoterEndoreOpposeNeutralWrapper>
      <VoterOpinionTextWrapper>
        <VoterOpinionText
          placeholder="What's your opinion?"
          onChange={handleChangeOpinionText}
        />
      </VoterOpinionTextWrapper>
      <VoterPositionSubmitWrapper>
        <VoterPostionSubmit disabled={!isFormValid}>
          Add Opinion
        </VoterPostionSubmit>
      </VoterPositionSubmitWrapper>
    </VoterPositionTextFieldWrapper>
  );

  return (
    <ModalDisplayTemplateA
      dialogTitleJSX={dialogTitleJSX}
      show={showVoterEdit}
      toggleModal={() => setShowVoterEdit(!showVoterEdit)}
      textFieldJSX={textFieldJSX}
      tallMode
    />
  );
};

const VoterPositionTitle = styled('div')`
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const VoterPositionTextFieldWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${DesignTokenColors.neutral100};
  margin-top: 12px;
`;

const VoterPositionAvatarVisibilityWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin: 0 0 12px 0;
`;

const VoterAvatarWrapper = styled('div')`
  margin-top: 16px;
`;

const VoterAvatar = styled('div')`
  height: 43px;
  width: 43px;
  border-radius: 50%;
  background-color: ${DesignTokenColors.info600};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const VoterImage = styled('img')`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const VoterFirstName = styled('p')`
  color: white;
  margin: 0;
  padding: 0;
  font-size: 16px;
`;

const VoterLastName = styled('p')`
  color: white;
  margin-bottom: -4px;
  padding: 0;
  font-size: 11px;
`;

const VoterEdit = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background-color: ${DesignTokenColors.primary50};
  margin-top: -16px;
  margin-left: 30px;
`;

const EditIcon = styled(CreateOutlinedIcon)`
  transform: scale(.65);
  color: ${DesignTokenColors.neutral400};
`;

const VoterNameVisibilityWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 6px 0 0 6px;
`;

const VoterFullName = styled('h1')`
  color: ${DesignTokenColors.neutral900};
  font-size: 18px;
  margin: 8px 0 0 0;
`;

const VoterVisibilityWrapper = styled('div')`
  font-size: 13px;
`;

const OpinionOptionDescription = styled('label')``;

const OpinionVisibility = styled('select')`
  margin-left: 4px;
  border: none;
  cursor: pointer;
`;

const OptionSelect = styled('option')``;

const VoterEndoreOpposeNeutralWrapper = styled('div')`
  display: flex;
  margin: 0 0 8px 0;
`;

const EndorsesOption = styled('div')`
  display: flex;
  align-items: center;
`;

const EndorsesRadio = styled('input')`
  appearance: none;
  width: 19px;
  height: 19px;
  border: 1px solid ${DesignTokenColors.neutral900};
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  :checked {
    background-color: ${DesignTokenColors.primary600}
  }

  :focus {
    outline: 2px solid ${DesignTokenColors.primary600};
  }
`;

const EndorsesLabel = styled('label')`
  margin: 1px 16px 0 4px;
  cursor: pointer;
`;

const VoterOpinionTextWrapper = styled('div')``;

const VoterOpinionText = styled('textarea')`
  height: 108px;
  width: 414px;
  border: 1px solid ${DesignTokenColors.primary600};
  border-radius: 16px;
  color: ${DesignTokenColors.neutral900};
  padding: 4px 0 0 8px;
  resize: none;
`;

const VoterPositionSubmitWrapper = styled('div')`
  margin: 10px 0 16px 0;
`;

const VoterPostionSubmit = styled('button')`
  height: 40px;
  width: 417px;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? DesignTokenColors.neutral100 : DesignTokenColors.primary500)};
  color: ${DesignTokenColors.whiteUI};
`;

VoterPositionEditModal.propTypes = {
  showVoterEdit: PropTypes.bool,
  setShowVoterEdit: PropTypes.func,
  candidateName: PropTypes.string,
  voter: PropTypes.object,
};

export default VoterPositionEditModal;
