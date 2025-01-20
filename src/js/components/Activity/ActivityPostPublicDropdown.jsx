import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DesignTokenColors from '../../common/components/Style/DesignTokenColors';

const ActivityPostPublicDropdown = (props) => {
  const { visibilityIsPublic, onVisibilityChange, classes } = props;

  const handleVisibilityChange = (event) => {
    const { value } = event.target;
    onVisibilityChange(value === 'Public');
  };

  return (
    <FormControl className={classes.formControl} aria-labelledby="opinion-visibility-label">
      <div className={classes.container}>
        <Typography
          id="opinion-visibility-label"
          className={classes.label}
          component="label"
        >
          Opinion visible to:
        </Typography>
        <Select
          value={visibilityIsPublic ? 'Public' : 'Friends Only'}
          onChange={handleVisibilityChange}
          className={classes.selectVisibility}
          disableUnderline
          IconComponent={ArrowDropDownIcon}
          aria-label="Select visibility for your opinion"
        >
          <MenuItem value="Public" className={classes.menuItem}>
            Public
          </MenuItem>
          <MenuItem value="Friends Only" className={classes.menuItem}>
            My friends
          </MenuItem>
        </Select>
      </div>
    </FormControl>
  );
};

ActivityPostPublicDropdown.propTypes = {
  visibilityIsPublic: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = () => ({
  formControl: {
    width: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '19.5px',
    color: DesignTokenColors.neutralUI900,
    marginRight: '8px',
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
