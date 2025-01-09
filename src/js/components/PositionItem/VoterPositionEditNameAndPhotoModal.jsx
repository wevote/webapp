import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, IconButton } from '@mui/material';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@mui/icons-material';
import DesignTokenColors from '../../common/components/Style/DesignTokenColors';

const styles = {
  modalContent: {
    padding: '20px',
  },
  uploadSection: {
    alignItems: 'center',
    border: `3px dashed ${DesignTokenColors.neutral100}`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    padding: '20px',
  },
  profilePhoto: {
    alignItems: 'center',
    backgroundColor: DesignTokenColors.neutral50,
    borderRadius: '50%',
    display: 'flex',
    height: '80px',
    justifyContent: 'center',
    marginBottom: '10px',
    width: '80px',
  },
  formField: {
    color: DesignTokenColors.neutral100,
    marginBottom: '15px',
  },
  a: {
    color: DesignTokenColors.primary500,
  },
  closeButton: {
    color: DesignTokenColors.neutral100,
    position: 'absolute',
    right: '8px',
    top: '8px',
  },
};

const VoterPositionEditNameAndPhotoModal = ({ show, toggleModal, classes }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert('First and Last name are required.');
      return;
    }
    if (website && !website.startsWith('http')) {
      alert('Please enter a valid URL starting with http or https.');
      return;
    }
    // Add logic to save details
    toggleModal();
  };

  return (
    <Dialog open={show} onClose={toggleModal} maxWidth="sm" fullWidth>
      <DialogTitle>
        Name & Photo Settings
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={toggleModal}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.modalContent}>
        <p>
          We are serious about protecting your information. We are non-profit and never sell information.
          {' '}
          <a href="/frequently-asked-questions" target="_blank" rel="noopener noreferrer" className={classes.a}>
            Frequently Asked Questions.
          </a>
        </p>
        <div className={classes.uploadSection}>
          <div className={classes.profilePhoto}>
            {photo ? <img src={photo} alt="Profile" style={{ width: '100%', borderRadius: '50%' }} /> : 'Upload'}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
            id="upload-photo"
          />
          <label htmlFor="upload-photo">
            <Button variant="outlined" component="span">
              Upload Profile Photo
            </Button>
          </label>
        </div>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          variant="outlined"
          className={classes.formField}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          variant="outlined"
          className={classes.formField}
        />
        <TextField
          label="Name Shown with Endorsements"
          value={`${firstName} ${lastName}`}
          fullWidth
          variant="outlined"
          className={classes.formField}
          disabled
        />
        <TextField
          label="Your Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          fullWidth
          variant="outlined"
          className={classes.formField}
        />
        <TextField
          label="Description Shown with Endorsements"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          className={classes.formField}
          multiline
          rows={3}
        />
        <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

VoterPositionEditNameAndPhotoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VoterPositionEditNameAndPhotoModal);
