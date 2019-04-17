import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  Card,
  CardTitle
} from 'reactstrap';

import axios from 'axios';
import SideTemplateCard from './SideTemplateCard';
// import SideMessageInd from './SideMessageInd';
import MessageModalInd from '../MessageModal/MessageModalInd';
import ClickableCard from './ClickableCard';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      orgs: [],
      newGroup: { name: '', org_id: null },
      reminders: [],
      users: [],
      message: '',
      messageModal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
  }

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

  toggleMessage() {
    this.setState(prevState => ({
      messageModal: !prevState.messageModal,
    }));
  }

  getAllOrgs = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/orgs`, this.state.orgs)
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
      this.state.newGroup.name === undefined
        ? this.toggleNested()
        : axios
            .post(
              `${process.env.REACT_APP_BACKEND}/api/groups`,
              this.state.newGroup,
            )
            // axios.post("https://localhost:3333/api/orgs", orgObj)
            .then(res => {
              if (res.status === 200 || res.status === 201) {
                this.setState({ newGroup: { name: '', org_id: null } });
                this.setState(prevState => ({
                  modal: !prevState.modal,
                }));
                this.props.getGroups();
              }
            })
            .catch(err => {
              console.log(err);
            });
  };

  getAllReminders = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/reminders`,
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


  handleInputChange = ev => {
    this.setState({
      newGroup: { name: ev.target.value, org_id: this.props.profile.org_id },
    });
  };

  setOrg() {
    this.setState({
      org_id: this.props.profile.org_id,
    });
  }

  componentDidMount() {
    // console.log('Sidebar mounted.');
    this.getAllOrgs();
    this.getAllReminders();
    this.setOrg();
    //this.getUsersByGroup();
  }

  render() {
    // console.log('PROPS', this.props);
    // console.log('GROUPS', this.props.groups);
    // const { profile } = this.state
    const profileImg =
      'https://tk-assets.lambdaschool.com/ecd33d34-c124-4b75-92d2-e5c52c171ed8_11201517_887808411287357_1307163552_a.jpg';
    console.log('SIDEBAR this.props', this.state, this.props);

    return (
      <div className="sidebarWrapper">
        <section className="profileSection cube">
          <img src={this.props.profile.picture} id="profilePicture" alt="first initial or icon" />
          <div id="profileName">
            {/* This needs to remain {this.props.profile.nickname} in order to render correctly. -Rachel */}
            <span>Hello, {this.props.profile.nickname} </span>
            </div>
        </section>
        <section className="orgSection cube">
        
          <h6>YOUR ORGANIZATION</h6>

          {/*<p> NEED ORG NAME FOR THIS USER </p> */}

          {this.state.orgs.map(org => {
            if (org.id === this.props.profile.org_id) {
              return <ClickableCard key={org.id} name={org.name} />;
            }
          })}
        </section>

        <section className="groupsSection cube">
        
          <h6>YOUR GROUP(s)</h6>
          
         
          {/*<p> NEED GROUP NAME FOR THIS USER </p> */}

          {/* TODO TEAM: Need another if for group id LINK */}
          {this.props.groups.map(group => {
            console.log('PROPS PASSED DOWN FROM DASH', this.props);
            console.log("Group.org_id", group, "Profile", this.props.profile)
            if (group.org_id === this.props.profile.org_id) {
              if (this.props.activeGroup == null) { 
              this.props.setActiveGroup(group.id);
              }
              if (this.props.activeGroup == group.id) {
                // active group
                  return (
                    <Link
                      to="#"
                      onClick={() => {
                        console.log('setActiveGroup Clicked', group.id);
                        this.props.setActiveGroup(group.id);
                        this.props.setActiveGroupName(group.name);
                      }}
                    >
                      {' '}
                      <ClickableCard key={group.id} name={group.name} className="side-template-card-active" />{' '}
                    </Link>
                  );
                } else {
                // inactive group
                  return (
                    <Link
                      to="#"
                      onClick={() => {
                        console.log('setActiveGroup Clicked', group.id);
                        this.props.setActiveGroup(group.id);
                        this.props.setActiveGroupName(group.name);
                      }}
                    >
                      {' '}
                      <ClickableCard key={group.id} name={group.name} className="side-template-card" />{' '}
                    </Link>
                  );

              }
            }
          })}
          
          <NavLink id="createLink" onClick={this.toggle}>
            <i className="fas fa-plus-circle" /> &nbsp; Create A New Group
          </NavLink>
        </section>


        {/* <section className="convSection cube">
          <h6>SCHEDULED MESSAGES</h6>
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
        </section> */}



        {/* ******* This is styling for the mobile group selection portion ******* */}
          <div class="accordion" id="accordionGroups">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    YOUR GROUPS
                  </button>
                </h2>
              </div>

              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
            </div>
          </div>
          </div>


        <section className="convSection cube">
       
          <h6>CONVERSATION</h6>
          {/* <MessageModalInd buttonLabel="Message Individual" /> */}
        <SideTemplateCard className="convo"/>
        </section>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="groupModal"
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>Create a Group</ModalHeader>
          <ModalBody className="modalBody">
            <Form className="createGroup" onSubmit={this.addGroup}>
              <div className="modalProfile">
                <img
                  src="https://i.imgur.com/HanMQyt.png" title="group"
                  alt="philzcoffee's thumbnail"
                  className="userThumb"
                />
                {/* <a href="#">edit icon</a> */}
               
              </div>

              <FormGroup row>
                <Label for="name">Group Name</Label>
                <Col sm={10}>
                  <Input
                    onChange={this.handleInputChange}
                    placeholder="Peru - January Cohort"
                    value={this.state.newGroup.name}
                    name="name"
                    id="name"
                  />
                </Col>
              </FormGroup>

        {/* <FormGroup row>
                <Label for="code">Group Code</Label>
                <Col sm={10}>
                  <Input placeholder="@peru1" name="code" id="code" />
                </Col>
        </FormGroup>*/}

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
