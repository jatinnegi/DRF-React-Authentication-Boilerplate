import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userDetail: { fontSize: "14px", marginRight: theme.spacing(2) },
}));

function ButtonAppBar({ auth: { isAuthenticated, user }, logout }) {
  const classes = useStyles();

  const guestLinks = (
    <>
      <Button color="inherit">
        <Link to="/register" className="link">
          Register
        </Link>
      </Button>
      <Button color="inherit">
        <Link to="/login" className="link">
          Login
        </Link>
      </Button>
    </>
  );

  const authLinks = (
    <>
      <Typography className={classes.userDetail}>
        {user ? user.username : null}
      </Typography>
      <Typography className={classes.userDetail}>
        {user ? user.email : null}
      </Typography>
      <Button color="inherit">
        <Link to="/edit" className="link">
          Edit
        </Link>
      </Button>
      <Button color="inherit" onClick={() => logout()}>
        Logout
      </Button>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className="link">
              Django-Auth
            </Link>
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(ButtonAppBar);
