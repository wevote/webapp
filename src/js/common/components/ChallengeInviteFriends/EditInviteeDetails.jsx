import React, { useState, useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import withTheme from '@mui/styles/withTheme';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { DialogTitle, Button } from '@mui/material';
import DesignTokenColors from '../Style/DesignTokenColors';
import ModalDisplayTemplateA, { templateAStyles, TextFieldWrapper } from '../../../components/Widgets/ModalDisplayTemplateA';
import ChallengeInviteeStore from '../../stores/ChallengeInviteeStore';

const EditInviteeDetails = ({ inviteeId, show, setShow, setAnchorEl }) => {
  const [inviteeData, setInviteeData] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedMessage, setEditedMessage] = useState('');

  useEffect(() => {
    const fetchInviteeData = async () => {
      const data = await ChallengeInviteeStore.getChallengeInviteeById(inviteeId);
      setInviteeData(data);
      setEditedName(data?.invitee_name || '');
      setEditedMessage(data?.message || '');
    };
    if (inviteeId) {
      fetchInviteeData();
    }
  }, [inviteeId]);

  const handleClose = () => {
    setShow(false);
    setAnchorEl(null);
  };

  const handleSave = () => {
    console.log('Saving edited details:', { name: editedName, message: editedMessage });
    // Add save logic here
    handleClose();
  };

  const dialogTitleText = inviteeData ? `Edit ${inviteeData.invitee_name}'s Details` : 'Edit Invitee Details';

  const textFieldJSX = (
    <div>
      <TextFieldWrapper>
        <Label>Your friend’s name</Label>
        <StyledInput
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <Label>
          Message to
          {' '}
          {editedName || 'your friend'}
        </Label>
        <StyledTextarea
          rows="4"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
      </TextFieldWrapper>
      <UniqueLink>
        [Jane’s unique link]
      </UniqueLink>
      <ButtonContainer>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">Save Changes</Button>
      </ButtonContainer>
    </div>
  );

  return (
    <ModalDisplayTemplateA
      dialogTitleJSX={<DialogTitle>{dialogTitleText}</DialogTitle>}
      textFieldJSX={textFieldJSX}
      show={show}
      tallMode
      toggleModal={handleClose}
    />
  );
};

EditInviteeDetails.propTypes = {
  inviteeId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};

const UniqueLink = styled('div')`
  margin-top: 10px;
  font-size: 12px;
  color: ${DesignTokenColors.neutral600};
`;

const ButtonContainer = styled('div')`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled('label')`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: ${DesignTokenColors.neutral900};
`;

const StyledInput = styled('input')`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid ${DesignTokenColors.neutral300};
  border-radius: 4px;
  font-size: 14px;
  color: ${DesignTokenColors.neutral900};
  box-sizing: border-box;
`;

const StyledTextarea = styled('textarea')`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid ${DesignTokenColors.neutral300};
  border-radius: 4px;
  font-size: 14px;
  color: ${DesignTokenColors.neutral900};
  box-sizing: border-box;
`;

export default withTheme(withStyles(templateAStyles)(EditInviteeDetails));
