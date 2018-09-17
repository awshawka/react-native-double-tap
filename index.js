import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default class DoubleClick extends Component {
  constructor(props) {
    super(props);

    // time interval between double clicks
    this.delayTime = props.delay ? props.delay : 200;
    // bool to check whether user tapped once
    this.firstPress = true;
    // the last time user tapped
    this.lastTime = new Date();
    // a timer is used to run the single tap event
    this.timer = false;
  }

  _onPress = () => {
    // get the instance of time when pressed
    let now = new Date().getTime();

    if (this.firstPress) {
      // if pressed first can be a first press again
      this.firstPress = false;

      //set the timeout
      this.timer = setTimeout(() => {
        //check if user passed in prop
        this.props.singleTap ? this.props.singleTap() : null;

        // reset back to initial state
        this.firstPress = true;
      }, this.delayTime);

      // mark the last time of the press
      this.lastTime = now;
    } else {
      //if user pressed immediately again within span of delayTime
      if (now - this.lastTime < this.delayTime) {
        // clear the timeout for the single press
        this.timer && clearTimeout(this.timer);

        //check if user passed in prop for double click
        this.props.doubleTap ? this.props.doubleTap() : null;

        // reset back to initial state
        this.firstPress = true;
      }
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  componentWillUnmount() {
    // make sure to clear the timer when unmounting
    this.timer && clearTimeout(this.timer);
  }
}
