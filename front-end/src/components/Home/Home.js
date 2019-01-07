import React, {
  Component,
} from 'react';
import {
  Panel,
  ControlLabel,
  Glyphicon,
} from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    const {
      auth,
    } = this.props;
    const {
      userProfile,
      getProfile,
    } = auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile,
        });
      });
    } else {
      this.setState({
        profile: userProfile,
      });
    }
  }

  render() {
    const {
      profile,
    } = this.state;
    return (
      <div className="container">
        <div>
          <h1>Welcome to Tasks Manager!</h1>
          <h3>{profile.name}</h3>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel>
                <Glyphicon glyph="user" />
                {' '}
                Nickname
              </ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Home;
