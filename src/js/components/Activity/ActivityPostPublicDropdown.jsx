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
          MenuProps={{
            classes: { paper: classes.menuPaper },
          }}
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

const styles = (theme) => ({
  formControl: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  label: {
    color: DesignTokenColors.neutralUI900,
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '19.5px',
    marginRight: '8px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  selectVisibility: {
    border: 'none',
    boxShadow: 'none',
    color: DesignTokenColors.neutralUI900,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '21.82px',
    outline: 'none',
    padding: 0,
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 32px 0 0',
      fontSize: '14px',
    },
  },
  menuItem: {
    color: DesignTokenColors.neutralUI900,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '21.82px',
    padding: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  menuPaper: {
    '& .MuiMenu-list': {
      padding: 0,
    },
  },
  outlinedInputRoot: {
    padding: 0,
    '& .MuiSelect-select': {
      padding: '0 !important',
    },
  },
});

export default withStyles(styles)(ActivityPostPublicDropdown);
