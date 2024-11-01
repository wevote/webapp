import React, { useState, useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import withTheme from '@mui/styles/withTheme';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DesignTokenColors from '../Style/DesignTokenColors';
import ModalDisplayTemplateA, { templateAStyles, TextFieldWrapper } from '../../../components/Widgets/ModalDisplayTemplateA';
import ChallengeInviteeStore from '../../stores/ChallengeInviteeStore';

const ViewInviteeDetails = ({ inviteeId, show, setShow, setAnchorEl }) => {
  const [inviteeData, setInviteeData] = useState(null);

  useEffect(() => {
    const fetchInviteeData = async () => {
      const data = await ChallengeInviteeStore.getChallengeInviteeById(inviteeId);
      setInviteeData(data);
    };
      if (inviteeId) {
        fetchInviteeData();
        }
      }, [inviteeId]);

  const handleClose = () => {
    setShow(false);
    setAnchorEl(null);
  };

  const formatDate = (dateString, customMessage = "Unavailable") => {
    if (!dateString) return customMessage;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

  // Format the time portion as 'h:mm a' (e.g., '6:50 PM')
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate} - ${formattedTime}`;
  }

  const dialogTitleText = inviteeData ? `${inviteeData.invitee_name}'s Invitation History` : null;

  console.log(inviteeData)
  const textFieldJSX = (
    <TableContainer components={Paper} sx={{ paddingBottom: '5px' }}>
      <TableWrapper>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableHeaderCell>STATUS</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">DATE</StyledTableHeaderCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableBodyCellLeft component="th" scope="row">
                Invitation sent
              </StyledTableBodyCellLeft>
              <StyledTableBodyCellRight align="right">{inviteeData ? formatDate(inviteeData.date_invite_sent) : null}</StyledTableBodyCellRight>
            </TableRow>
            <TableRow>
              <StyledTableBodyCellLeft component="th" scope="row">
                Challenge viewed
              </StyledTableBodyCellLeft>
              <StyledTableBodyCellRight align="right">{inviteeData ? formatDate(inviteeData.date_invite_viewed, 'Invitation has not been viewed') : 'Invitation has not been viewed'}</StyledTableBodyCellRight>
            </TableRow>
            <StyledTableRow>
              <StyledTableBodyCellLeft component="th" scope="row" styled={{fontFamily: 'inherit'}}>
                Challenge joined
              </StyledTableBodyCellLeft>
              <StyledTableBodyCellRight align="right">{inviteeData ? formatDate(inviteeData.date_challenge_joined, 'Invitation has not been joined') : 'Invitation has not been joined'}</StyledTableBodyCellRight>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );

  return (
    <ModalDisplayTemplateA
      dialogTitleJSX={<TitleWrapper>{dialogTitleText}</TitleWrapper>}
      textFieldJSX={textFieldJSX}
      show={show}
      tallMode
      toggleModal={handleClose}
    />
  );
};
ViewInviteeDetails.propTypes = {
  inviteeId: PropTypes.string,
  setShow: PropTypes.func,
  setAnchorEl: PropTypes.func,
  show: PropTypes.bool,
  uniqueExternalId: PropTypes.string,
};

const StyledTableHeaderCell = styled(TableCell)`
  color: ${DesignTokenColors.neutral900};
  font-size: 10px;
  font-weight: bold;
  font-family: inherit;
  padding: 8px 4px 4px 4px;
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  };
  border-color: ${DesignTokenColors.neutral100};
`;

const StyledTableBodyCellLeft = styled(TableCell)`
  font-family: inherit;
  padding: 4px;
  padding-left: none;
  padding-right: 70px;
`;

const StyledTableBodyCellRight = styled(TableCell)`
  font-family: inherit;
  padding: 4px;
  padding-right: none;
`;

const TitleWrapper = styled('div')`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 4px;
  padding-left: 4px;
  text-align: center;
  font-family: inherit;
`;

const TableWrapper = styled('div')`
  border-top: 1px solid ${DesignTokenColors.neutral100};
  margin-top: 4px; /* Adjust to give space below the title */
  margin-bottom: 4px;
  min-width: 300px;
  overflow-x: auto;
`;

export default withTheme(withStyles(templateAStyles)(ViewInviteeDetails));
