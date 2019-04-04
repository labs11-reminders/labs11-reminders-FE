import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';

//TODO: update imports as needed

class ScheduleMessageComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: {
            title: '', 
            to: '',// TODO: props from user group list 
            body: '',//TODO: pass props from message composer
            approved: false, // TODO: create approved column for backend
            date: '',//TODO: set from react datetime selector 

          },
          submitting: false,
          error: false
        };
        this.toggle = this.toggle.bind(this);
      }

      componentDidMount() {
      this.setState({
          // ------TODO: pass props from message composer 
        message: { ...props.message, [message]: event.target.value }
      });
      }

      toggle() {
        this.setState(prevState => ({
          approved: !prevState.modal
        }));
      }

      onHandleChange = (event) => {
        const title_input = event.target.getAttribute('title');
        const message_input = event.target.getAttribute('message');
        this.setState({
          title: { ...this.state.title, [title_input]: event.target.value },
          message: { ...this.state.message, [message_input]: event.target.value }
        });
      }
    
      onSubmit = (event) => {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch(`${process.env.REACT_APP_BACKEND}/api/reminders`, {
          method: 'POST', //TODO Update reminder post route to accept approved flag + date
          headers: {
            'Content-Type': 'application/json'
          },
          to: this.state.to,
          body: JSON.stringify(this.state.message),
          approved: this.state.approved, // TODO: set to scheduled flag 
          date: this.state.date//TODO: set from react datetime selector 
        })
          .then(res => {
            if (res.status === 200) {
              console.log('scheduling message');
              this.setState({
                error: false,
                submitting: true,
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
          <div>
                <FormGroup>
                    {/* <Label for="titleText">Write Title Here</Label> */}
                    {/* <Input type="textarea" title="title" id="titleText"/> */}
                </FormGroup> 
                <FormGroup>
                    {/* <Label for="messageText">Write Message Here</Label> */}
                    {/* <Input type="textarea" message="body" id="messageText"/> */}
                </FormGroup>
                <FormGroup onClick={this.toggle}>
                    {/* <Label for="checkbox_approve">approved</Label> */}
                    {/* <Input type="checkbox" approved="approved" id="checkbox_approve"/> */}
                </FormGroup>
        </div>
        );
      }
    }

export default ScheduleMessageComposer;



