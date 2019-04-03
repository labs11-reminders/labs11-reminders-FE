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
} from 'reactstrap';
import axios from 'axios';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      orgs: [],
      groups: [],
      message: '',
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ groups: { ...this.state.groups, [name]: value } });
  };

  componentDidMount() {
    this.getAllOrgs();
  }

  render() {
    const profileImg =
      'https://tk-assets.lambdaschool.com/ecd33d34-c124-4b75-92d2-e5c52c171ed8_11201517_887808411287357_1307163552_a.jpg';

    return (
      <div className="sidebarWrapper">
        <section className="profileSection cube">
          <div id="profilePicture">JW</div>
          <div id="profileName">
            <span>Hello, User</span>
          </div>
        </section>
        <section className="orgSection cube">
          <h6>ORGANIZATION</h6>
          <div>Organization Name</div>
        </section>
        <section className="groupsSection cube">
          <h6>GROUPS</h6>

          <NavLink id="createLink" onClick={this.toggle}>
            <i className="fas fa-plus-circle" /> &nbsp; Create Group
          </NavLink>

          <div>Group Name List</div>
        </section>
        <section className="convSection cube">
          <h6>CONVERSATIONS</h6>
          <div>User Name</div>
          <div>User Name</div>
          <div>User Name</div>
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
                <a href="#">edit icon</a>
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
                  <Input
                    placeholder="Peru - January Cohort"
                    name="country"
                    id="country"
                  />
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
