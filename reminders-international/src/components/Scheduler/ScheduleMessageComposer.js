import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';
import ScheduledMessageList from './ScheduledMessageList';

//TODO: update imports as needed

class ScheduleMessageComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: {
            title: '', 
            to: '',// TODO: props from user group list 
            body: '',
            approved: false, // TODO: create approved column for backend
            date: '',//TODO: set from react datetime selector 
            scheduled: false//TODO: toggle scheduled within date selection function 
          },
          submitting: false,
          error: false
        };
        this.toggleApproved = this.toggleApproved.bind(this);
      }
    
      componentDidMount() {
      this.setState({
          // ------TODO: pass props from message composer 
        message: { ...props.message, [message]: event.target.value }
      });
      }

      //------ Edit  handlers triggered in ScheduledMessageCard --------
      onEditTitle  = (event) => {
        const title_input = event.target.getAttribute('title');
        this.setState({
          title: { ...this.state.title, [title_input]: event.target.value }
        });
      }
      onEditMessage = (event) => {
        const message_input = event.target.getAttribute('message');
        this.setState({
          message: { ...this.state.message, [message_input]: event.target.value }
        });
      }

      //------ Approve handlers triggered in ScheduledMessageCard --------
      onDisApprove = (event) => {  
        event.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND}/api/reminders/:id`, {
        method: 'PUT', //TODO Update reminder post route to accept approved and scheduled flags + date
        headers: {
          'Content-Type': 'application/json'
        },
        to: this.state.to,
        body: JSON.stringify(this.state.message),
        approved: this.state.approved, 
        date: this.state.date,
        scheduled: this.state.scheduled
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
      onApprove = (event) => {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch(`${process.env.REACT_APP_BACKEND}/api/reminders`, {
          method: 'POST', //TODO Update reminder post route to accept approved and scheduled flags + date
          headers: {
            'Content-Type': 'application/json'
          },
          to: this.state.to,
          body: JSON.stringify(this.state.message),
          approved: this.state.approved, // TODO: set to scheduled flag 
          date: this.state.date,//TODO: set from react datetime selector
          scheduled: this.state.scheduled
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

      toggleApproved() {
        this.setState(prevState => ({
          approved: !prevState
        }));

        if (this.state.approved === true) {
          onApprove();
        } else if (this.state.approved === false){
          onDisApprove();
        }
      }

   
    //TODO: pass props for approved toggle event handlers 
    //TODO: pass props for date picker event handler 
    //TODO: pass props for edit message handlers 
   
      render() {
        return (
          <div>
            <ScheduledMessageList></ScheduledMessageList>
            {/* TO DO: below - need clarity on user flow */}
        </div>
        );
  };
}
export default ScheduleMessageComposer;



