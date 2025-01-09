import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl } from '@mui/material';
import { withStyles } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DesignTokenColors from '../../common/components/Style/DesignTokenColors';

const ActivityPostPublicDropdown = (props) => {
  const { visibilityIsPublic, onVisibilityChange, classes } = props;

  const handleVisibilityChange = (event) => {
    const value = event.target.value;
    onVisibilityChange(value === 'Public');
  };

  return (
    <div className={classes.container}>
      <span className={classes.label}>Opinion visible to:</span>
      <FormControl className={classes.formControl}>
        <Select
          value={visibilityIsPublic ? 'Public' : 'Friends Only'}
          onChange={handleVisibilityChange}
          className={classes.selectVisibility}
          disableUnderline
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem value="Public" className={classes.menuItem}>
            Public
          </MenuItem>
          <MenuItem value="Friends Only" className={classes.menuItem}>
            My friends
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

ActivityPostPublicDropdown.propTypes = {
  visibilityIsPublic: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '19.5px',
    textAlign: 'left',
    color: 'var(--Neutral-900, #2A2A2C)',
  },
  formControl: {
    minWidth: '120px',
  },
  selectVisibility: {
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '21.82px',
    color: DesignTokenColors.neutralUI900,
    padding: '0 8px',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  menuItem: {
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '21.82px',
    color: DesignTokenColors.neutralUI900,
  },
});

export default withStyles(styles)(ActivityPostPublicDropdown);
