import vibrate from './vibrate'
import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';


import Timer from "./timer";

export default class Pomodore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reset: false,
            time: this.formatTime(1500000),
            mode: 'work',
            totalTime: 1500000,
            remainingTime: 1500000,
            breakTime: 300000,
            workMinText: "Set custom work minutes!",
            workSecText: "Set custom work seconds!",
            breakMinText: "Set custom break minutes!",
            breakSecText: "Set custom break seconds!",
        }
    }

    componentDidMount() {
        this.handleCounter();
    }

    handleCounter = () => {
        if (this.state.remainingTime <= 0) {

            vibrate();

            if (this.state.mode === 'work') {
                this.setState(state => {
                    return {
                        remainingTime: state.breakTime,
                        mode: 'break',
                        time: this.formatTime(state.breakTime)
                    }
                }, () => {
                    this.counter();
                })
            } else {
                this.setState(state => {
                    return {
                        remainingTime: state.totalTime,
                        mode: 'work',
                        time: this.formatTime(state.totalTime)
                    }
                }, () => {
                    this.counter();
                })
            }

        } else {
            this.counter();
        }
    };

    counter = () => {
        let startTime = this.state.remainingTime;
        let x = setInterval(() => {
            if (this.state.reset === false && startTime > 0) {
                this.setState(state => {
                    return {
                        remainingTime: state.remainingTime - 1000,
                        time: this.formatTime(startTime)
                    };
                });
                startTime = startTime - 1000;
            } else if (this.state.reset === false && startTime === 0) {
                this.setState(state => {
                    return {
                        remainingTime: 0,
                        time: this.formatTime(0)
                    };
                });
                startTime = startTime - 1000;
            } else {
                clearInterval(x);
                this.handleCounter();
            }
        }, 1000);
    };

    formatTime = (time) => {
        let minutes = Math.floor((time / 1000 / 60) % 60);
        let seconds = Math.floor((time / 1000) % 60);
        if (minutes < 10) {
            minutes = "0" + "" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + "" + seconds
        }
        return minutes + ":" + seconds
    };

    toggleTimer = () => {
        this.setState((state) => {
            return {reset: !state.reset};
        });

        if (this.state.reset === true) {
            this.handleCounter();
        }
    };

    resetTimer = () => {
        this.setState(state => {
            return {
                reset: true,
                mode: 'work',
                totalTime: 1500000,
                remainingTime: 1500000,
                breakTime: 300000,
                time: this.formatTime(1500000),
                workMinText: "Set custom work minutes!",
                workSecText: "Set custom work seconds!",
                breakMinText: "Set custom break minutes!",
                breakSecText: "Set custom break seconds!",
            }
        })
    };

    useCustomValues = () => {
        this.setState(state => {
            let totalTime = Number(this.state.workMinText) * 60000 + Number(this.state.workSecText) * 1000;

            let breakTime = Number(this.state.breakMinText) * 60000 + Number(this.state.breakSecText) * 1000;


            return {
                reset: true,
                mode: 'work',
                totalTime: totalTime,
                remainingTime: totalTime,
                breakTime: breakTime,
                time: this.formatTime(totalTime)
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    marginBottom: 30,
                    fontSize: 30,
                    color: "blue"
                }}>{this.state.mode}</Text>
                <View style={styles.clockContainer}>
                    <Timer time={this.state.time}/>
                </View>
                <TextInput
                    style={{
                        height: 40,
                        paddingLeft: 20,
                        width: 200,
                        marginBottom: 20,
                        marginTop: 20,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(workMinText) => this.setState({workMinText})}
                    value={this.state.workMinText}
                    clearTextOnFocus={true}
                />
                <TextInput
                    style={{
                        height: 40,
                        paddingLeft: 20,
                        width: 200,
                        marginBottom: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(workSecText) => this.setState({workSecText})}
                    value={this.state.workSecText}
                    clearTextOnFocus={true}
                />
                <TextInput
                    style={{
                        height: 40,
                        paddingLeft: 20,
                        width: 200,
                        marginBottom: 20,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(breakMinText) => this.setState({breakMinText})}
                    value={this.state.breakMinText}
                    clearTextOnFocus={true}
                />
                <TextInput
                    style={{
                        height: 40,
                        paddingLeft: 20,
                        width: 200,
                        marginBottom: 20,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(breakSecText) => this.setState({breakSecText})}
                    value={this.state.breakSecText}
                    clearTextOnFocus={true}
                />
                <Button onPress={this.useCustomValues} title={"Use custom values"}/>

                <Button onPress={this.resetTimer} title={"Reset"}/>

                <Button onPress={this.toggleTimer} title={this.state.reset ? "Start" : "Stop"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockContainer: {
        width: 200,
        height: 100,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "gray"
    }
});

