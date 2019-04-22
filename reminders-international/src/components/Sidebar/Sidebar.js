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
  CardTitle,
  CardBody,
  Collapse,
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
      collapse: false,
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
    this.toggleMobileGroups = this.toggleMobileGroups.bind(this);
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

  toggleMobileGroups() {
    this.setState(state => ({ collapse: !state.collapse }));
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
            <i className="fas fa-plus-circle" /> &nbsp; Create New Group
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



        {/* ******* This is styling for the mobile group section ******* */}
        <div className="mobileGroups">
        <Button color="primary" onClick={this.toggleMobileGroups} style={{ marginBottom: '1rem' }}>Your Groups</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            
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

            </CardBody>
          </Card>
        </Collapse>
        </div>
        {/* ****************** End of mobile group section ********** */}

        



        
        {/* ******************** Conversation section beginning *******************       */}
        {/* <section className="convSection cube"> */}
               
          {/* <h6>CONVERSATION</h6>
          {/* <MessageModalInd buttonLabel="Message Individual" /> */}
            {/* <SideTemplateCard className="convo"/> */}
            {/* </section> */}
        {/* **************** Conversation section end ********** */}


          <section className="spacerSection cube"> 
               
                
           </section>


            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="groupModal"
              size="lg"
            > 
        
          <ModalHeader toggle={this.toggle}>Create Group</ModalHeader>
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

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   NavLink,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Input,
//   Label,
//   Form,
//   FormGroup,
//   Col,
//   Card,
//   // CardTitle,
//   CardBody,
//   Collapse,
// } from 'reactstrap';

// import axios from 'axios';

// import ClickableCard from './ClickableCard';

// class Sidebar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false,
//       nestedModal: false,
//       collapse: false,
//       orgs: [],
//       org: {},
//       org_id: null,
//       newGroup: { name: '', org_id: null },
//       reminders: [],
//       users: [],
//       message: '',
//       messageModal: false,
//       groups: [], // all groups in org

//     };
//     this.toggle = this.toggle.bind(this);
//     this.toggleNested = this.toggleNested.bind(this);
//     this.toggleMessage = this.toggleMessage.bind(this);
//     this.toggleMobileGroups = this.toggleMobileGroups.bind(this);
//   }

//   getProfile = cb => {
//     console.log("GET PROFILE this.state", this.state)
//     console.log("GET PROFILE this.props", this.props)
//     this.auth0.client.userInfo(this.accessToken, (err, profile) => {
//       if (profile) {
//         console.log("GET PROFILE", profile)
//         this.userProfile = profile;

//         // TODO Remove once the user table is linked to Auth0

//         this.userProfile.user_id = 1;
//       }
//       cb(err, profile);
//     });
//   };

//   toggle() {
//     this.setState(prevState => ({
//       modal: !prevState.modal,
//     }));
//   }

//   toggleNested() {
//     this.setState({
//       nestedModal: !this.state.nestedModal,
//     });
//   }

//   toggleMessage() {
//     this.setState(prevState => ({
//       messageModal: !prevState.messageModal,
//     }));
//   }

//   toggleMobileGroups() {
//     this.setState(state => ({ collapse: !state.collapse }));
//   }


//   getAllOrgs = () => {
//     axios
//       .get(`${process.env.REACT_APP_BACKEND}/api/orgs`, this.state.orgs)
//       // axios.get("https://localhost:3333/api/orgs", this.state.orgs)
//       .then(res => {
//         this.setState({
//           orgs: res.data,
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };


//   addGroup = event => {
//     event.preventDefault();
//       !this.state.newGroup.name
//         ? this.toggleNested()
//         : axios
//             .post(
//               `${process.env.REACT_APP_BACKEND}/api/groups`,
//               this.state.newGroup,
//             )
//             .then(res => {
//               if (res.status === 200 || res.status === 201) {
//                 this.setState({ 
//                   newGroup: { name: '', org_id: this.state.org_id } 
//                 });
//                 this.setState(prevState => ({
//                   modal: !prevState.modal,
//                 }));
                
//                 this.props.getGroups();
//               }
//             })
//             .catch(err => {
//               console.log(err);
//             });
//   };

//   getAllReminders = () => {
//     axios
//       .get(
//         `${process.env.REACT_APP_BACKEND}/api/reminders`,
//         this.state.reminders,
//       )
//       .then(res => {
//         //  console.log('list of all reminders', res.data);
//         this.setState({
//           reminders: res.data,
//         });
//         //  console.log('getAllReminders this.state.reminders', this.state.reminders);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };


//   handleInputChange = ev => {
//     this.setState({
//       newGroup: { name: ev.target.value, org_id: this.props.profile.org_id },
//     });
//   };

//   setOrg() {
//     this.setState({
//       org_id: this.props.profile.org_id,
//     });
//   }

//   getOrgsById(org_id){
//     if (!org_id) {org_id = this.state.org_id}
//     if (org_id) {
//       console.log("ORG_ID", org_id)
//     axios
//       .get(`${process.env.REACT_APP_BACKEND}/api/orgs/${org_id}`)
//       .then(res => {
//         this.setState({
//           org: { 
//             ...res.data,
//           },
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }
//   };

//   getGroupsByOrg(org_id){
//     if (!org_id) {org_id = this.state.org_id}
//     if (org_id) {
//       console.log("ORG_ID FOR GROUPS", org_id)
//     }
//     axios
//       .get(`${process.env.REACT_APP_BACKEND}/api/orgs/${org_id}/groups`)
//       .then(res => {
//         console.log("RESSSSS Groups", res.data)
//         // const groupsInOrg = res.data.filter(group =>  group.org_id === this.props.org_id)
//         this.setState({
//           // groups: [...groupsInOrg]
//           groups: res.data,
//         });
//         console.log('Groups By Org', this.state.groups);
//       })
//       .catch(err => {
//         console.log(err);
//       });
      
//   };

//   componentDidMount() {
//     console.log('** SIDEBAR MOUNTED.');
//     console.log("** SIDEBAR", this.props)
//     console.log("** SIDEBAR", this.props.profile);
//     console.log("** SIDEBAR", this.state);

//     this.getAllOrgs();
//     this.getAllReminders();
//     this.setOrg();
//     this.getOrgsById();
//     this.getGroupsByOrg();
//     //this.getUsersByGroup();
//   }

//   render() {
//     console.log("** SIDEBAR RENDER STATE", this.state);
//     console.log("** SIDEBAR RENDER PROPS", this.props);
//     console.log("** SIDEBAR RENDER PROPS", this.props.profile);
//     const { role_id, org_id, user_id } = this.props.profile;
//     console.log("** role_id", role_id);
//     console.log("** org_id", org_id);
//     console.log("** user_id", user_id);
//     console.log("** SIDEBAR", this.props.groups)
//     this.state.groups = this.props.groups.map(group => group);
//     console.log("** SIDEBAR", this.state.groups)
//     // const { name, description } = this.props.org;
//     // console.log("** SIDEBAR RENDER PROPS", this.props.org.name);
//     // console.log("** SIDEBAR GROUPS", [...this.props.groups]);
//     // const groupsByOrg = [...this.props.groups];
    
//     const groupsByOrg = [...this.state.groups].map(group => {return {...group}})
//     console.log(Array.isArray(groupsByOrg))
//     console.log("** groupsByOrg", groupsByOrg)
//     // console.log(groupsByOrg[0].id)
//     // console.log(groupsByOrg[1].id)
//     // console.log("** SIDEBAR GROUPS BY ORG", groupsByOrg);
//     console.log("** SIDEBAR ACTIVE GROUP", this.props.activeGroup)
//     let currGroup = groupsByOrg.filter(group => group.id === this.props.activeGroup)[0];
//     // currGroup = currGroup[0]
//     console.log("** SIDEBAR ACTIVE GROUP", currGroup)


//     return (
//       <div className="sidebarWrapper">
//         <section className="profileSection cube">
//           <img src={this.props.profile.picture} id="profilePicture" alt="first initial or icon" />
//           <div id="profileName">
//             {/* This needs to remain {this.props.profile.nickname} in order to render correctly. -Rachel */}
//             <span>Hello, {this.props.profile.nickname} </span>
//             </div>
//         </section>
//         <section className="orgSection cube">
        
//           <h6>YOUR ORGANIZATION</h6>
//           <p>{this.getOrgsById(org_id)}</p>
//           <p>{this.props.org.name}</p>
//           {/*<p> NEED ORG NAME FOR THIS USER </p> */}

//           {/* {this.state.orgs.map(org => {
//             if (org.id === this.props.profile.org_id) {
//               return <ClickableCard key={org.id} name={org.name} />;
//             }
//           })} */}
//         </section>

//         <section className="groupsSection cube">
        
//           <h6>YOUR GROUP(s)</h6>
//             {/* TODO TEAM: Need another if for group id LINK */}
//             {this.props.groups.map(group => {
//               console.log("** SIDEBAR GROUP", group)
//               // Set Active
//               if (!this.props.activeGroup) {
//                 console.log("**** this.props.activeGroup this.props.profile.org_id", this.props.activeGroup, group.id) 
//                 this.props.setActiveGroup(group.id);
//                 console.log("**", this.props.activeGroup);
//               }

//               // 
//               if (role_id === 4) {
//                 if (this.props.activeGroup === group.id) {
//                   return (
//                     <Link
//                       to="#"
//                       onClick={() => {
//                         {/* console.log('setActiveGroup Clicked', group.id); */}
//                         this.props.setActiveGroup(group.id);
//                         this.props.setActiveGroupName(group.name);
//                       }}
//                     >
//                       <ClickableCard 
//                         key={group.id} 
//                         name={group.name} 
//                         className="side-template-card-active" />
//                     </Link>
//                   );
//                   } else {
//                     console.log("Bd Member can see all in groups in org")
//                     return (
//                       <Link
//                         to="#"
//                         onClick={() => {
//                           console.log('setActiveGroup Clicked', group.id);
//                           this.props.setActiveGroup(group.id);
//                           this.props.setActiveGroupName(group.name);
//                         }}
//                       >
//                         <ClickableCard key={group.id} name={group.name} className="side-template-card" />
//                       </Link>
//                     );
//                   } 
//                 } else {
//                   console.log("****** Non-Bd Members")
//                   if (this.props.activeGroup === group.id) {
//                     console.log("****** activeGroup, group.id", this.props.activeGroup, group.id)
//                     return (
//                           <Link
//                             to="#"
//                             onClick={() => {
//                               console.log('setActiveGroup Clicked', group.id);
//                               this.props.setActiveGroup(group.id);
//                               this.props.setActiveGroupName(group.name);
//                             }}
//                           >
//                             {' '}
//                             <ClickableCard key={group.id} name={group.name} className="side-template-card-active" />{' '}
//                           </Link>
//                         );
//                   } else {
//                     console.log("****** activeGroup, group.id", this.props.activeGroup, group.id)
//                     return (
//                       <Link
//                         to="#"
//                         onClick={() => {
//                           console.log('setActiveGroup Clicked', group.id);
//                           this.props.setActiveGroup(group.id);
//                           this.props.setActiveGroupName(group.name);
//                         }}
//                       >
                        
//                         <ClickableCard key={group.id} name={group.name} className="side-template-card" />
//                       </Link>
//                     );
//                   }
//           }
//             })}
//           <NavLink id="createLink" onClick={this.toggle}>
//             <i className="fas fa-plus-circle" /> &nbsp; Create New Group
//           </NavLink>
//         </section>


//         {/* <section className="convSection cube">
//           <h6>SCHEDULED MESSAGES</h6>
//           {this.state.reminders.map(reminder => {
//             return (
//               <SideTemplateCard
//                 key={reminder.id}
//                 name={reminder.name}
//                 description={reminder.description}
//                 created_at={reminder.created_at}
//                 group_id={reminder.group_id}
//                 user_id={reminder.user_id}
//                 scheduled={reminder.scheduled}
//                 draft={reminder.draft}
//                 template={reminder.template}
//               />
//             );
//           })}
//         </section> */}



//         {/* ******* This is styling for the mobile group section ******* */}
//         <div className="mobileGroups">
//         <Button color="primary" onClick={this.toggleMobileGroups} style={{ marginBottom: '1rem' }}>Your Groups</Button>
//         <Collapse isOpen={this.state.collapse}>
//           <Card>
//             <CardBody>
            
//             {this.props.groups.map(group => {
//             {/* console.log('PROPS PASSED DOWN FROM DASH', this.props);
//             console.log("Group.org_id", group)
//             console.log("Profile", this.props.profile) */}
//             if (group.org_id === this.props.profile.org_id) {
//               if (!this.props.activeGroup) { 
//               this.props.setActiveGroup(group.id);
//               }
//               if (this.props.activeGroup === group.id) {
//                 // active group
//                   return (
//                     <Link
//                       to="#"
//                       onClick={() => {
//                         {/* console.log('setActiveGroup Clicked', group.id); */}
//                         this.props.setActiveGroup(group.id);
//                         this.props.setActiveGroupName(group.name);
//                       }}
//                     >
//                       {' '}
//                       <ClickableCard key={group.id} name={group.name} className="side-template-card-active" />{' '}
//                     </Link>
//                   );
//                 } else {
//                 // inactive group
//                   return (
//                     <Link
//                       to="#"
//                       onClick={() => {
//                         {/* console.log('setActiveGroup Clicked', group.id); */}
//                         this.props.setActiveGroup(group.id);
//                         this.props.setActiveGroupName(group.name);
//                       }}
//                     >
//                       {' '}
//                       <ClickableCard key={group.id} name={group.name} className="side-template-card" />{' '}
//                     </Link>
//                   );

//               }
//             }
//             })}

//             <NavLink id="createLink" onClick={this.toggle}>
//               <i className="fas fa-plus-circle" /> &nbsp; Create A New Group
//             </NavLink>

//             </CardBody>
//           </Card>
//         </Collapse>
//         </div>
//         {/* ****************** End of mobile group section ********** */}

        



        
//         {/* ******************** Conversation section beginning *******************       */}
//         {/* <section className="convSection cube"> */}
               
//           {/* <h6>CONVERSATION</h6>
//           {/* <MessageModalInd buttonLabel="Message Individual" /> */}
//             {/* <SideTemplateCard className="convo"/> */}
//             {/* </section> */}
//         {/* **************** Conversation section end ********** */}


//           <section className="spacerSection cube"> 
               
                
//            </section>


//             <Modal
//               isOpen={this.state.modal}
//               toggle={this.toggle}
//               className="groupModal"
//               size="lg"
//             > 
        
//           <ModalHeader toggle={this.toggle}>Create Group</ModalHeader>
//           <ModalBody className="modalBody">
//             <Form className="createGroup" onSubmit={this.addGroup}>
//               <div className="modalProfile">
//                 <img
//                   src="https://i.imgur.com/HanMQyt.png" title="group"
//                   alt="philzcoffee's thumbnail"
//                   className="userThumb"
//                 />
//                 {/* <a href="#">edit icon</a> */}
               
//               </div>

//               <FormGroup row>
//                 <Label for="name">Group Name</Label>
//                 <Col sm={10}>
//                   <Input
//                     onChange={this.handleInputChange}
//                     placeholder="Peru - January Cohort"
//                     value={this.state.newGroup.name}
//                     name="name"
//                     id="name"
//                   />
//                 </Col>
//               </FormGroup>

//         {/* <FormGroup row>
//                 <Label for="code">Group Code</Label>
//                 <Col sm={10}>
//                   <Input placeholder="@peru1" name="code" id="code" />
//                 </Col>
//         </FormGroup>*/}

//               <FormGroup row>
//                 <Label for="country">Country</Label>
//                 <Col sm={10}>
//                   <Input placeholder="Country" name="country" id="country" />
//                 </Col>
//               </FormGroup>
//             </Form>
//           </ModalBody>

//           <ModalFooter>
//             <Button color="primary" onClick={this.addGroup}>
//               Create
//             </Button>{' '}
//             <Button color="secondary" onClick={this.toggle}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//         {/* Nested modal for error alert popup */}
//         <Modal
//           id="alertModalWrap"
//           isOpen={this.state.nestedModal}
//           toggle={this.toggleNested}
//         >
//           <ModalBody id="alertModal">An input is Required!</ModalBody>
//           <ModalFooter id="alertModalFooter">
//             <Button color="danger" onClick={this.toggleNested}>
//               Ok
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default Sidebar;
