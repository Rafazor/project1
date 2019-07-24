import React from "react";
import {StyleSheet, Text} from 'react-native';


export default class Timer extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Text style={styles.clock}>{this.props.time}</Text>
        )
    }
}

const styles = StyleSheet.create(
    {
        clock: {
            fontSize: 40,
            color: "white"
        }
    }
)