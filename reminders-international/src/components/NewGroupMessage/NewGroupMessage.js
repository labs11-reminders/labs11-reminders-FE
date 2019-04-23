import React, { Component } from 'react';
// import MessageModal from '../MessageModal/MessageModal';
import { Button, FormGroup, Label, Input, Form, Col } from 'reactstrap';
import axios from 'axios';
import '../Scheduler/TabMessageStyles.css';
import '../global.css';
// import './basic.css';
import './message.css'


class NewGroupMessage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        success:"",
        user: {},
        modal: false,
        message: {
          users: [],
          title:'',
          body: '',
          scheduled: false,
          draft: false,
          template: false,
          group_id: '',
          user_id: '',
          },
          submitting: false,
          error: false,
          groups: [],
          cSelected: [],
          dropdownOpen:false 
      };
      this.toggle = this.toggle.bind(this);
      this.toggleTab = this.toggleTab.bind(this);

      this.toggleSuccess = this.toggleSuccess.bind(this);
      this.toggleSchedule = this.toggleSchedule.bind(this);
      this.toggleDraft = this.toggleDraft.bind(this);
      this.toggleTemplate = this.toggleTemplate.bind(this);
    }
  
    // TOGGLE TO OPEN MODEL
      toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal,
        groups:this.props.groups,

      }));
      }

      toggleSuccess() {
        this.setState(prevState => ({
          success: !prevState.success,
        }));
        }


      // TRYING TOGGLE FOR TYPE OF BUTTON PRESSED
      toggleTab(tab){
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          })
        }
      }


      toggleSchedule(event) { //connected to schedule checkbox
        console.log("Click",this.state.message.scheduled)

        this.setState({
          message: {...this.state.message,  scheduled: event.target.checked }
        });
        if (this.state.message.scheduled){
            this.toggleSuccess()
        }


      }
      toggleDraft(event) { //connected to draft checkbox
        this.setState({
          message: {...this.state.message, draft: event.target.checked }
      });

      if (this.state.message.draft){
        this.toggleSuccess()
        }

      }
      toggleTemplate(event) { //connected to template checkbox
        this.setState({
        message: {...this.state.message, template: event.target.checked }
       });
       if (this.state.message.template){
        this.toggleSuccess()
        }
       }

      createSavedReminder = () => { //connected to save button

      const { title, body, scheduled, draft, template,} = this.state.message
      const messageObj = {
        name: title,
        description: body,
        scheduled: scheduled,
        draft: draft,
        template: template,
        group_id: this.props.activeGroup,
        user_id: this.props.state.profile.user_id,
         }
        console.log('POST RESPONSE', messageObj);
    
    axios.post(`${process.env.REACT_APP_BACKEND}/api/reminders`,  messageObj)
      .then(res => {
        console.log('POST RESPONSE', res.data);
        if(res.status === 200 || res.status === 201) {
          this.setState({
            success: 'Success!',
            reminders: { ...messageObj }
            });
        }
          })

    .catch(err => {
        console.log(err);
        this.setState({
          message: 'You failed to add a group.',
          reminder: { ...messageObj }
          });
    });


      }

    onHandleChangeTitle = (event) => {
    this.setState({
     message: {...this.state.message, title: event.target.value }
    });
    }
    onHandleChangeBody = (event) => {
    this.setState({
        message: {...this.state.message, body: event.target.value }
    });
    }
    
    fetchGroupUsers = id => {
        console.log("FETCHING USERS")
        axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/${id}/users`, this.state.toggleDraft)
          .then(res => { 
            console.log(res, res.data) 
            this.setState({
              message: { ...this.state.message, users:res.data, }
            });
        })
        .catch(err => {
            console.log(err);
        });
      }
  
      onSubmit = (event) => {
      event.preventDefault();
      this.fetchGroupUsers(this.props.activeGroup) // HOW THE MESSAGE SENDS TO THE CURRENT GROUP
      this.setState({ submitting: true });
      fetch(`${process.env.REACT_APP_BACKEND}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.message)
      })
        .then(res => {
          if (res.status === 200) {
            console.log('sending message');
            this.setState({
              error: false,
              submitting: false,
              message: {
                to: '',
                body: ''
              }
            });
          } else {
            this.setState({
              error: true,
              submitting: false
            });
          }
          res.json()
        })
        .catch(err => {
          console.log(err)
        })
      }
  

  
    render() {
      
      return (
          <Form className="form-top">
            <FormGroup className="minor-padding" row>
                <Label for="messageTitle" xs={12} md={2}>Title</Label>
                <Col xs={12} md={10}>
                <Input type="textfield"
                id="messageTitle"
                onChange={this.onHandleChangeTitle}
                placeholder="example: No class for the holiday"
                value={this.state.message.title}
                name="title"
                />
                </Col>
                {/*<SMSFormGroup groups={this.props.groups}/>*/}
              </FormGroup>
            
              <FormGroup className="minor-padding" row>
                 <Label for="messageText" md={2}>Message Content</Label>
                 <Col md={10}>
                 <Input type="textarea"
                  id="messageText"
                  onChange={this.onHandleChangeBody}
                  placeholder="example: We won't be having class for the holidays. Study notes from this week"
                  value={this.state.message.body}
                  name="body"
                />
                </Col>
             </FormGroup>
             
             <FormGroup className="divider">
                <Button  onClick = {this.onSubmit} >Send Now
                </Button>
                </FormGroup>
            
                <FormGroup check inline>
                <Label check> 
                  <Input type="checkbox"  onClick={this.toggleSchedule}/>
                  Schedule 
                </Label>
                </FormGroup>
              <FormGroup check inline>
              <Label check> 
                <Input type="checkbox"  onClick={this.toggleTemplate}/>
                Template 
                </Label>
                </FormGroup>
                <FormGroup check inline>
              <Label check>  
                <Input type="checkbox" onClick={this.toggleDraft} />
                Draft 
                </Label>
                </FormGroup>
                
                <Button color="primary" onClick = {this.createSavedReminder}>Save Selection</Button>
                <p>{this.state.success}</p>
               
                
                </Form>
  );
};
};
  
export default NewGroupMessage;
// import React, { Component } from 'react';
// // import MessageModal from '../MessageModal/MessageModal';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
// import axios from 'axios';
// import '../Scheduler/TabMessageStyles.css';
// import '../global.css';
// class NewGroupMessage extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         success:"",
//         user: {},
//         modal: false,
//         message: {
//           users: [],
//           title:'',
//           body: '',
//           scheduled: false,
//           draft: false,
//           template: false,
//           group_id: '',
//           user_id: '',
//           },
//           submitting: false,
//           error: false,
//           groups: [],
//           cSelected: [],
//           dropdownOpen:false 
//       };

//       this.toggle = this.toggle.bind(this);
//       this.toggleTab = this.toggleTab.bind(this);

//       this.toggleSuccess = this.toggleSuccess.bind(this);
//       this.toggleSchedule = this.toggleSchedule.bind(this);
//       this.toggleDraft = this.toggleDraft.bind(this);
//       this.toggleTemplate = this.toggleTemplate.bind(this);
//     }
  
//     // TOGGLE TO OPEN MODEL
//       toggle() {
//       this.setState(prevState => ({
//         modal: !prevState.modal,
//         groups:this.props.groups,

//       }));
//       }

//       toggleSuccess() {
//         this.setState(prevState => ({
//           success: !prevState.success,
//         }));
//         }


//       // TRYING TOGGLE FOR TYPE OF BUTTON PRESSED
//       toggleTab(tab){
//         if (this.state.activeTab !== tab) {
//           this.setState({
//             activeTab: tab
//           })
//         }
//       }


//       toggleSchedule(event) { //connected to schedule checkbox
//         console.log("Click",this.state.message.scheduled)

//         this.setState({
//           message: {...this.state.message,  scheduled: event.target.checked }
//         });
//         if (this.state.message.scheduled=true){ // === ?
//             this.toggleSuccess()
//         }


//       }
//       toggleDraft(event) { //connected to draft checkbox
//         this.setState({
//           message: {...this.state.message, draft: event.target.checked }
//       });

//       if (this.state.message.draft=true){ // === ?
//         this.toggleSuccess()
//         }

//       }
//       toggleTemplate(event) { //connected to template checkbox
//         this.setState({
//         message: {...this.state.message, template: event.target.checked }
//        });
//        if (this.state.message.template=true){ // === ?
//         this.toggleSuccess()
//         }
//        }

//       createSavedReminder = () => { //connected to save button

//       const { title, body, scheduled, draft, template,} = this.state.message
//       const messageObj = {
//         name: title,
//         description: body,
//         scheduled: scheduled,
//         draft: draft,
//         template: template,
//         group_id: this.props.activeGroup,
//         user_id: this.props.state.profile.user_id,
//          }
//         console.log('POST RESPONSE', messageObj);
    
//     axios.post(`${process.env.REACT_APP_BACKEND}/api/reminders`,  messageObj)
//       .then(res => {
//         console.log('POST RESPONSE', res.data);
//         if(res.status === 200 || res.status === 201) {
//           this.setState({
//             success: 'Success!',
//             reminders: { ...messageObj }
//             });
//         }
//           })

//     .catch(err => {
//         console.log(err);
//         this.setState({
//           message: 'You failed to add a group.',
//           reminder: { ...messageObj }
//           });
//     });


//       }

//     onHandleChangeTitle = (event) => {
//     this.setState({
//      message: {...this.state.message, title: event.target.value }
//     });
//     }
//     onHandleChangeBody = (event) => {
//     this.setState({
//         message: {...this.state.message, body: event.target.value }
//     });
//     }
    
//     fetchGroupUsers = id => {
//         console.log("FETCHING USERS")
//         axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/${id}/users`, this.state.toggleDraft)
//           .then(res => { 
//             console.log(res, res.data) 
//             this.setState({
//               message: { ...this.state.message, users:res.data, }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
//       }
  
//       onSubmit = (event) => {
//       event.preventDefault();
//       this.fetchGroupUsers(this.props.activeGroup) // HOW THE MESSAGE SENDS TO THE CURRENT GROUP
//       this.setState({ submitting: true });
//       fetch(`${process.env.REACT_APP_BACKEND}/api/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(this.state.message)
//       })
//         .then(res => {
//           if (res.status === 200) {
//             console.log('sending message');
//             this.setState({
//               error: false,
//               submitting: false,
//               message: {
//                 to: '',
//                 body: ''
//               }
//             });
//           } else {
//             this.setState({
//               error: true,
//               submitting: false
//             });
//           }
//           res.json()
//         })
//         .catch(err => {
//           console.log(err)
//         })
//       }
  
  
//     render() {
      
    // return (
    //   <div className="composer">  
    //   <div className="list">
    //   <div className="first_tab_card">
    //   <section className="first_tab_message" >
    //   <div className = "first_tab_messagedetails">
            
//             <FormGroup>
//                 <Label for="messageText">Write Title Here</Label>
//                 <Input type="text"
//                 onChange={this.onHandleChangeTitle}
//                 placeholder="example: No class for the holiday"
//                 value={this.state.message.title}
//                 name="title"
//                 />
//                 {/*<SMSFormGroup groups={this.props.groups}/>*/}
//               </FormGroup>
            
//               <FormGroup>
//                  <Label for="messageText">Write Message Here</Label>
//                  <Input type="textarea"
//                   onChange={this.onHandleChangeBody}
//                   placeholder="example: We won't be having class for the holidays. Study notes from this week"
//                   value={this.state.message.body}
//                   name="body"
//                 />
//              </FormGroup>
//               </div>
//              <FormGroup>
//                 <Button  onClick = {this.onSubmit} >Send Now
//                 </Button>
//                 </FormGroup>
             
//              </section>
//              <section className = "first_tab_messageoptions">
            
//             <div className = "messagecheckboxes" id="first_tab">
//             <p><strong>Don't want to send a message now?</strong></p>
//             <p> other options below:</p>
//                 <FormGroup>
//                 <Label inline check> 
//                   <Input type="checkbox"  onClick={this.toggleSchedule} name="scheduled" />{' '}
//                   Schedule 
//                 </Label>
//                 </FormGroup>
//               <FormGroup>
//               <Label inline check> 
//                 <Input type="checkbox"  onClick={this.toggleTemplate} name="template" />{' '}
//                 Template 
//                 </Label>
//                 </FormGroup>
//                 <FormGroup>
//               <Label inline check>  
//                 <Input type="checkbox" onClick={this.toggleDraft}  name="draft" />{' '}
//                 Draft 
//                 </Label>
//                 </FormGroup>
                
//                 <Button color="primary" onClick = {this.createSavedReminder}>Save Selection</Button>
//                 </div>
//                 <p>{this.state.success}</p>
               
                
//                 </section>
//                 </div>
                
//         </div>
    
  
//     </div>
//   );
// };
// };
  
// export default NewGroupMessage;