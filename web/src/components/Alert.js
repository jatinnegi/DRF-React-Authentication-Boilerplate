import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(3),
  },
}));

/*
    Types of alerts
    1 error
    2 warning
    3 info
    4 success
*/

function SimpleAlerts({ alerts }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth={"xs"}>
      {alerts.length > 0 &&
        alerts.map((alert, index) => (
          <Alert
            key={index}
            severity={`${alert.type}`}
            className={classes.alert}
          >
            {alert.msg}
          </Alert>
        ))}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

SimpleAlerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(SimpleAlerts);
