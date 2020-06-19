import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default class DoubleTap extends Component {
  constructor(props) {
    super(props);

    // time interval between double clicks
    this.delayTime = props.delay ? props.delay : 150;
    // bool to check whether user tapped once
    this.firstPress = true;
    // the last time user tapped
    this.lastTime = new Date();
    // a timer is used to run the single tap event
    this.timer = false;
  }

  _onTap = () => {
    // get the instance of time when pressed
    let now = new Date().getTime();

    if (this.firstPress) {
      // set the flag indicating first press has occured
      this.firstPress = false;

      //start a timer --> if a second tap doesnt come in by the delay, trigger singleTap event handler
      this.timer = setTimeout(() => {
        //check if user passed in prop
        this.props.singleTap ? this.props.singleTap() : null;

        // reset back to initial state
        this.firstPress = true;
        this.timer = false;
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
      <TouchableOpacity {...this.props} onPress={this._onTap}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  componentWillUnmount() {
    // make sure to clear the timer when unmounting
    this.timer && clearTimeout(this.timer);
  }
}
