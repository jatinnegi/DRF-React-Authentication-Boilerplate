import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  userBox: {
    boxShadow: "0px 0px 5px #333",
    padding: "10px 40px",
  },
  container: {
    padding: "30px 0",
  },
}));

const PrivatePage = ({ auth: { user } }) => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.userBox}>
        <h1>User Details</h1>
        <h3>ID: {user ? user.id : null}</h3>
        <h3>Username: {user ? user.username : null}</h3>
        <h3>Email: {user ? user.email : null}</h3>
        <h3>Full Name: {user ? user.get_full_name : null}</h3>
        <h3>
          Is superuser? : {user ? (user.is_superuser ? "True" : "False") : null}
        </h3>
      </div>
    </Container>
  );
};

PrivatePage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivatePage);
