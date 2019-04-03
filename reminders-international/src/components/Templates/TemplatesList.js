import React, { Component } from 'react';
import {Link, NavLink } from 'react-router';
import SavedUsers from './SavedUsers';
import UserCard from './UserCard';
import axios from 'axios';

export default class TemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }


// name
// description
// created_at
// group_id
// user_id
// scheduled
// draft
// template