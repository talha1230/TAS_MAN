import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { authLogout } from '../../redux/userRelated/userSlice';
import {
  Button,
  TextField,
  Typography,
  Collapse,
  Box,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Delete, Edit } from '@mui/icons-material';

const AdminProfile = () => {
  const [showTab, setShowTab] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const address = 'Admin';

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState(currentUser.schoolName);

  const fields = password === '' ? { name, email, schoolName } : { name, email, password, schoolName };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, currentUser._id, address));
  };

  const deleteHandler = () => {
    try {
      dispatch(deleteUser(currentUser._id, 'Students'));
      dispatch(deleteUser(currentUser._id, address));
      dispatch(authLogout());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Admin Profile
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {currentUser.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {currentUser.email}
        </Typography>
        <Typography variant="body1">
          <strong>School:</strong> {currentUser.schoolName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={deleteHandler}
          sx={styles.button}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          onClick={() => setShowTab(!showTab)}
          sx={styles.button}
        >
          {showTab ? 'Cancel' : 'Edit Profile'}
        </Button>
      </CardActions>
      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <Box component="form" onSubmit={submitHandler} sx={styles.form}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            label="School"
            variant="outlined"
            fullWidth
            margin="normal"
            value={schoolName}
            onChange={(event) => setSchoolName(event.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={styles.submitButton}
          >
            Update
          </Button>
        </Box>
      </Collapse>
    </Card>
  );
};

export default AdminProfile;

const styles = {
  card: {
    maxWidth: 600,
    margin: 'auto',
    mt: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
  },
  button: {
    marginLeft: 'auto',
  },
  form: {
    padding: 2,
    mt: 2,
  },
  submitButton: {
    mt: 2,
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
};
