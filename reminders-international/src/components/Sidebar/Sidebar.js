import React, { Component } from 'react';
import {
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  Col,
<<<<<<< HEAD
=======
  Panel,
  ControlLabel,
  Glyphicon,
>>>>>>> a2d50d233cc42a5062fe0dc1760b72dc95ec81e3
} from 'reactstrap';
import axios from 'axios';
import SideTemplateCard from './SideTemplateCard';
import ClickableCard from './ClickableCard';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      orgs: [],
      groups: [],
      reminders: [],
      users: [],
      message: '',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    // this.getAllReminders = this.getAllReminders.bind(this);
    // this.getAllGroups = this.getAllGroups.bind(this);
    // this.getAllOrgs = this.getAllOrgs.bind(this);
    // this.getProfile = this.getProfile.bind(this);
  }

  // componentWillMount() {
  //   this.setState({ profile: {} });
  //   const { userProfile, getProfile } = this.props.auth;
  //   if (!userProfile) {
  //     getProfile((err, profile) => {
  //       this.setState({ profile });
  //     });
  //   } else {
  //     this.setState({ profile: userProfile });
  //   }
  // }

  getProfile = cb => {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;

        // TODO Remove once the user table is linked to Auth0

        this.userProfile.user_id = 1;
      }
      cb(err, profile);
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
    });
  }

  getOrgGroups = () => {
    console.log('***********************');
    console.log('Calling for group list');
    console.log(this.props.profile);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/orgs/${
          this.props.profile.org_id
        }/groups`,
      )
      .then(res => {
        console.log('list of all groups', res);
        this.setState({
          groups: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllOrgs = () => {
    axios
      .get(
        'https://reminders-international.herokuapp.com/api/orgs',
        this.state.orgs,
      )
      // axios.get("https://localhost:3333/api/orgs", this.state.orgs)
      .then(res => {
        this.setState({
          orgs: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addGroup = event => {
    event.preventDefault();
    const { name } = this.state.groups;
    const groupObj = {
      name: name,
    };
    // const { group_code, organization, country } = this.state.todos;
    console.log('groupObj', groupObj);
    console.log('name', name);
    // console.log("this.state.todos", group_code)
    {
      name === undefined
        ? this.toggleNested()
        : axios
            .post(
              'https://reminders-international.herokuapp.com/api/groups',
              groupObj,
            )
            // axios.post("https://localhost:3333/api/orgs", orgObj)
            .then(res => {
              if (res.status === 200 || res.status === 201) {
                this.setState({ groups: { ...groupObj } });
                this.setState(prevState => ({
                  modal: !prevState.modal,
                }));
              }
            })
            .catch(err => {
              console.log(err);
            });
    }
  };

  getAllReminders = () => {
    axios
      .get(
        'https://reminders-international.herokuapp.com/api/reminders',
        this.state.reminders,
      )
      .then(res => {
        //  console.log('list of all reminders', res.data);
        this.setState({
          reminders: res.data,
        });
        //  console.log('getAllReminders this.state.reminders', this.state.reminders);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ groups: { ...this.state.groups, [name]: value } });
  };

  componentDidMount() {
    this.getAllOrgs();
    this.getAllReminders();
  }

  componentWillReceiveProps() {
    this.getOrgGroups();
  }

  render() {
    // const { profile } = this.state
    const profileImg =
      'https://tk-assets.lambdaschool.com/ecd33d34-c124-4b75-92d2-e5c52c171ed8_11201517_887808411287357_1307163552_a.jpg';
    console.log('SIDEBAR this.props', this.state, this.props);
    return (
      <div className="sidebarWrapper">
        <section className="profileSection cube">
          <img src={this.props.profile.picture} id="profilePicture" />
          <div id="profileName">
<<<<<<< HEAD
                  {/* This needs to remain {this.props.profile.nickname} in order to render correctly. -Rachel */}
            <span>Hello, {this.props.profile.nickname} </span>  

=======
            <span>Hello, {this.props.profile.given_name} </span>
>>>>>>> a2d50d233cc42a5062fe0dc1760b72dc95ec81e3
          </div>
        </section>
        <section className="orgSection cube">
          <h6>YOUR ORGANIZATION</h6>

          {/*<p> NEED ORG NAME FOR THIS USER </p> */}

         {this.state.orgs.map(org => {
            if (org.id === this.props.profile.org_id) {
            return (
              <ClickableCard 
                key={org.id}
                name={org.name}
              />
            )}
          })}
        </section>

        <section className="groupsSection cube">
          <h6>YOUR GROUPS</h6>

          <NavLink id="createLink" onClick={this.toggle}>
            <i className="fas fa-plus-circle" /> &nbsp; Create Group
          </NavLink>

          {/*<p> NEED GROUP NAME FOR THIS USER </p> */}
<<<<<<< HEAD
          
         
            {this.state.groups.map(group => {
              return (
                <ClickableCard
                  key={group.id}
                  name={group.name}
                />
              )
            })}
         

=======

          <div>Group Name List</div>
>>>>>>> a2d50d233cc42a5062fe0dc1760b72dc95ec81e3
        </section>
        <section className="convSection cube">
          <h6>Scheduled Messages</h6>
          {this.state.reminders.map(reminder => {
            return (
              <SideTemplateCard
                key={reminder.id}
                name={reminder.name}
                description={reminder.description}
                created_at={reminder.created_at}
                group_id={reminder.group_id}
                user_id={reminder.user_id}
                scheduled={reminder.scheduled}
                draft={reminder.draft}
                template={reminder.template}
              />
            );
          })}
          {/* <div>User Name</div>
          <div>User Name</div>
          <div>User Name</div> */}
        </section>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="groupModal"
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>
            <h5>Create a Group</h5>
          </ModalHeader>
          <ModalBody className="modalBody">
            <Form className="createGroup" onSubmit={this.addGroup}>
              <div className="modalProfile">
                <img
                  src={profileImg}
                  alt="philzcoffee's thumbnail"
                  className="userThumb"
                />
                {/* <a href="#">edit icon</a> */}
                <p>edit icon</p>
              </div>

              <FormGroup row>
                <Label for="name">Group Name</Label>
                <Col sm={10}>
                  <Input
                    onChange={this.handleInputChange}
                    placeholder="Peru - January Cohort"
                    value={this.state.groups.name}
                    name="name"
                    id="name"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="code">Group Code</Label>
                <Col sm={10}>
                  <Input placeholder="@peru1" name="code" id="code" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="org">Organization</Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    placeholder="Select Organization"
                    name="org"
                    id="org"
                  >
                    <option> --&nbsp; Select Organization</option>
                    {this.state.orgs.map(org => (
                      <option key={org.id}>{org.name}</option>
                    ))}{' '}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="country">Country</Label>
                <Col sm={10}>
                  <Input placeholder="Country" name="country" id="country" />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.addGroup}>
              Create
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* Nested modal for error alert popup */}
        <Modal
          id="alertModalWrap"
          isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
        >
          <ModalBody id="alertModal">An input is Required!</ModalBody>
          <ModalFooter id="alertModalFooter">
            <Button color="danger" onClick={this.toggleNested}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
