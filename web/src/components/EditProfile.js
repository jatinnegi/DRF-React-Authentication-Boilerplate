import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { updateProfile } from "../actions/auth";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  container: {
    padding: "30px 0",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditProfile = ({ updateProfile }) => {
  const classes = styles();

  const [formData, setFormData] = useState({ first_name: "", last_name: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(formData);
  };

  const { first_name, last_name } = formData;

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="off"
            name="first_name"
            variant="outlined"
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            value={first_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="off"
            name="last_name"
            variant="outlined"
            fullWidth
            id="lastName"
            label="Last Name"
            value={last_name}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Edit Profile
      </Button>
    </Container>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(EditProfile);
