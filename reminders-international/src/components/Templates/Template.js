// import React, { Component } from 'react';
// import axios from 'axios';
// import TemplateCard from './TemplateCard';

// export default class Template extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       template: null,
//     };
//   }

//   componentDidMount() {
//     const id = this.props.match.params.id;  
//     this.getReminderById(id);
//   }

//   getReminderById = id => {
//     axios
//       .get(`https://reminders-international.herokuapp.com/api/reminders/${id}`, this.state.template)
//       .then(response => {
//         this.setState(() => ({ template: response.data }));
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };


//   render() {
//     if (!this.state.reminder) {
//       return <div>Loading reminder information...</div>;
//     }

//     return (
//       <div className="save-wrapper">
//         <TemplateCard reminder={this.state.reminder}/>
//       </div>
//     );
//   }
// }