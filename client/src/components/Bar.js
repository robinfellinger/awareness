import React, { Component } from 'react';
import * as d3 from "d3";

class Bar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
      };
    }
    componentDidMount() {
      window.setTimeout(() => {
        this.setState({
          active: true,
        });
      }, 0);
    }
    render() {
      const { height, onClick, position } = this.props;
      const { active } = this.state;
      return (
        <div
          className={`bar${active ? ' bar--active' : ''}`}
          style={{ height, marginTop: 1000 - height}}
          onClick={() => onClick(position)}
        />
      );
    }
  }

  export default Bar;