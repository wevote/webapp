import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Button } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import withTheme from '@mui/styles/withTheme';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { hasIPhoneNotch, isAndroidSizeWide } from '../../common/utils/cordovaUtils';
import { isAndroid, isCordova } from '../../common/utils/isCordovaOrWebApp';
import { renderLog } from '../../common/utils/logging';
import DesignTokenColors from '../../common/components/Style/DesignTokenColors';


class ModalDisplayTemplateB extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    renderLog('ModalDisplayTemplateB');  // Set LOG_RENDER_EVENTS to log all renders
    const {
      classes, dialogTitleJSX, externalUniqueId, show, tallMode, textFieldJSX,
    } = this.props;
    let dialogPaperCombined;
    if (tallMode) {
      dialogPaperCombined = { ...classes.dialogPaper, ...classes.dialogPaperAdditionTall };
    } else {
      dialogPaperCombined = classes.dialogPaper;
    }
    // This template is used by other components like ActivityPostModal, and PositionStatementModal
    return (
      <Dialog
        classes={{ paper: dialogPaperCombined }}
        onClose={() => this.props.toggleModal()}
        open={show}
        style={{ paddingTop: `${isCordova() ? '75px' : 'undefined'}` }}
      >
        <DialogTitle classes={{ root: classes.dialogTitle }}>
          <DialogTitleInnerWrapper>
            <Title>
              {dialogTitleJSX || <>&nbsp;</>}
            </Title>
            <IconButton
              aria-label="Close"
              classes={{ root: classes.closeButton }}
              onClick={() => this.props.toggleModal()}
              id={`closeModalDisplayTemplateB${externalUniqueId}`}
              size="large"
            >
              <Close />
            </IconButton>
          </DialogTitleInnerWrapper>
          <Divider />
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <DialogContentInnerWrapper>
            {textFieldJSX}
          </DialogContentInnerWrapper>
        </DialogContent>
      </Dialog>
    );
  }
}
ModalDisplayTemplateB.propTypes = {
  classes: PropTypes.object,
  dialogTitleJSX: PropTypes.object,
  externalUniqueId: PropTypes.string,
  show: PropTypes.bool,
  tallMode: PropTypes.bool,
  textFieldJSX: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
};

export const templateBStyles = (theme) => ({
  dialogTitle: {
    padding: isAndroid() ? 8 : 'inherit',
    fontFamily: 'Nunito, Arial, sans-serif',
  },
  opposingLabel: {
    margin: '0 8px',
    padding: '4px 8px',
  },
  editIcon: {
    alignItems: 'center',
    backgroundColor: '#E6F3FF',
    borderRadius: '50%',
    color: '#848484',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '24px',
    marginTop: '25px',
    padding: '5px',
    position: 'relative',
  },

  dialogPaper: {
    border: `1px solid ${DesignTokenColors.neutral100}`,
    borderRadius: '30px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginTop: hasIPhoneNotch() ? 68 : 48,
    minHeight: isAndroid() ? '257px' : '200px',
    width: '90%',
    maxWidth: '600px',
    top: '0',
    transform: isAndroid() ? 'translate(0%, -18%)' : 'translate(0%, -20%)',
    [theme.breakpoints.down('xs')]: {
      minWidth: '95%',
      maxWidth: '95%',
      width: '95%',
      minHeight: isAndroid() ? '237px' : '200px',
      maxHeight: '330px',
      height: '70%',
      margin: '0 auto',
      transform: 'translate(0%, -30%)',
      fontFamily: 'Nunito, sans-serif',
    },
  },
  dialogPaperAdditionTall: {
    maxHeight: '550px',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '530px',
    },
  },
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  padding: '16px',
  closeButton: {
    height: '24px',
    position: 'absolute',
    right: '16px',
    width: '24.55px',
    textAlign: 'left',
    fontFamily: 'Nunito, sans-serif',
  },
  formStyles: {
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginTop: 16,
  },
  inputMultiline: {
    fontSize: 20,
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  inputStyles: {
    flex: '1 1 0',
    fontSize: 18,
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  select: {
    padding: '12px 12px',
    margin: '0 1px',
  },
  saveButtonRoot: {
    borderRadius: '30px',
    marginTop: '18px',
    height: '40px',
    color: 'white',
    width: '100%',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',

    '&.Mui-disabled': {
      backgroundColor: DesignTokenColors.neutral100,
      color: DesignTokenColors.whiteUI,
      opacity: 0.6,
    },
  },
  radioLabel: {
    margin: '0 16px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '22px',
    fontFamily: 'Nunito, Arial, sans-serif',
    color: DesignTokenColors.neutral900,
  },
  radioRoot: {
    color: DesignTokenColors.neutral900,
  },
  radioChecked: {
    color: DesignTokenColors.primary600,
  },
});

const DialogContentInnerWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DialogTitleInnerWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
`;

export const horizontalEllipsis = '\u2026';

export const TextFieldDiv = styled('div')`
  align-items: flex-start;
  font-size: 16px;
  border: 1px solid ${DesignTokenColors.primary600};
  border-radius: 16px;
  display: flex;
  margin-bottom: 0;
  padding: ${isAndroidSizeWide() ? '12px 12px 0 12px' : '12px'};
`;

export const TextFieldForm = styled('form')`
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TextFieldWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled('div')`
  font-size: 18px;
  font-weight: bold;
  line-height: 24.55px;
  margin: 0;
  text-align: left;
  padding-left: 16px;
  fontFamily: 'Nunito, sans-serif',
  
`;

export const VoterAvatarImg = styled('img')`
  border-radius: 6px;
  width: 43px;
  height: 43px;
  display: block;
  margin-left: 14px;

`;

export const UserInfoWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;

export const UserInfoText = styled('div')`
  margin-left: 24px;
  fontFamily: 'Nunito, sans-serif',
`;
export const UserName = styled('div')`
  color: DesignTokenColors.neutralUI900;  
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  fontFamily: 'Nunito, Arial, sans-serif',
`;

export const VisibilityText = styled('div')`
  color: DesignTokenColors.neutral900;
  font-size: 13px;
  line-height: 20px;
  margin-top: 4px;
`;

export const OpinionButtonsWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
`;

export const OpinionButton = styled(Button)`
  border-radius: 16px;  
  flex: 1;
  fontFamily: 'Nunito, sans-serif',
  font-size: 16px;
  font-weight: 400;
  font-weight: bold;
  line-height: 22px;
  margin: 0 4px;
  text-transform: capitalize;
  color: ${(props) => (props.selected ? DesignTokenColors.whiteUI : DesignTokenColors.primary600)};
  background-color: ${(props) => (props.selected ? DesignTokenColors.primary600 : 'transparent')};
  &:hover {
  background-color: ${(props) => (props.selected ? DesignTokenColors.primary600 : 'transparent')};
    background-color: ${(props) => (props.selected ? DesignTokenColors.primary600 : DesignTokenColors.primary50)};
  }
`;
export const radioGroup = styled('div')`
  display: flex;
  justify-content: space-around;
  padding: 25px;
  background-color: red;
`;
export default withTheme(withStyles(templateBStyles)(ModalDisplayTemplateB));
