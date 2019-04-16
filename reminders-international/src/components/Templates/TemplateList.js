import React, { Component } from 'react';
import axios from 'axios';
import TemplateCard from './TemplateCard';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import {
  Card,
  CardColumns,
  CardBody,
  Row,
  Col,
  // Button,
  // CardTitle,
  // CardText,
} from 'reactstrap';

export default class TemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      // editedReminder: '',
    };
  }

  getAllReminders = () => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders`, this.state.reminders)
      .then(res => {
        this.setState({
          reminders: res.data
        });
    })
    .catch(err => {
        console.log(err);
    });
  }



  componentDidMount () {
    this.getAllReminders();
  }


  render() {
    console.log("Template list this.state", this.state)
    return (
      <Row className="template-list"  >

        {/* <Col className="template-list"  > */}
          <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Add Group Message Template" />
            {this.state.reminders.map((reminder, index) => {
              if (reminder.group_id === this.props.activeGroup && reminder.template) {
              return (
              <Card className="templateCard">
                <CardBody lg="12" key={reminder.id}> 
                  <TemplateCard 
                    id={reminder.id}
                    name={reminder.name}
                    description={reminder.description}
                    created_at={reminder.created_at}
                    group_id={reminder.group_id}
                    user_id={reminder.user_id}
                    scheduled={reminder.scheduled}
                    draft={reminder.draft}
                    template={reminder.template}
                  />
                </CardBody>
            </Card>
            )}
        })}
        {/* </Col> */}

      </Row>
    )
  }

}

