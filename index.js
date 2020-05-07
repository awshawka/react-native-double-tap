import React from "react";
import { View, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from "react-native";



const DoubleTap = (props) => {

  let delayTime = props.delay ? props.delay : 150;
  let firstPress = true;
  let lastTime = new Date();
  let timer = false;

  onSingleTap = (props) => {
    //check if user passed in prop
    if (props.singleTap) {
      props.singleTap()
    }

    // reset back to initial state
    firstPress = true;
    timer = false;
  }

  _onTap = (props) => {
    // get the instance of time when pressed
    let now = new Date().getTime();

    if (firstPress) {
      // set the flag indicating first press has occured
      firstPress = false;

      //start a timer --> if a second tap doesnt come in by the delay, trigger singleTap event handler
      timer = setTimeout(() => onSingleTap(props), delayTime);

      // mark the last time of the press
      lastTime = now;
    } else {
      //if user pressed immediately again within span of delayTime
      if (now - lastTime < delayTime) {
        // clear the timeout for the single press
        timer && clearTimeout(timer);

        //check if user passed in prop for double click
        props.doubleTap ? props.doubleTap() : null;

        // reset back to initial state
        firstPress = true;
      }
    }
  };
  return (
    <>
      {props.type == "TO" || !props.type ? (
        <TouchableOpacity
          onPress={() => _onTap(props)}
          {...props}>
          {props.renderChild()}
        </TouchableOpacity>
      ) : null}
      {props.type == "TH" ? (
        <TouchableHighlight
          onPress={() => _onTap(props)}
          {...props}>
          {props.renderChild()}
        </TouchableHighlight>
      ) : null}
      {props.type == "TN" ? (
        <TouchableNativeFeedback
          onPress={() => _onTap(props)}
          {...props}
        >
          <View>
            {props.renderChild()}
          </View>
        </TouchableNativeFeedback>
      ) : null}

    </>
  )
}


export default DoubleTap;