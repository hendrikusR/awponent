/**
 * Created by ggoma on 11/30/16.
 */
import React, {Component} from 'react';
import {
    Animated,
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';

import colors from '../helpers/colors';
import {Ionicons} from '@exponent/vector-icons';

export default class ButtonBar extends Component {
    constructor(props) {
        super();
        this.state = {
            index: 0,
            options: props.options,
            fontSize: props.options.map(() => {
                return new Animated.Value(24)
            })
        }

        this.openSearch = this.openSearch.bind(this);
        this.animate(0);
    }

    handleChange(index) {
        this.animate(index);
        this.setState({index});
        this.props.changeIndex(index);
    }

    animate(index) {
        let timing = Animated.spring;
        const {fontSize} = this.state;
        fontSize.map((item, i) => {
            if(i == index) {
                timing(this.state.fontSize[i], {toValue: 32}).start();
            }else {
                timing(this.state.fontSize[i], {toValue: 24}).start();
            }
        })

    }

    openSearch() {

    }

    renderButtons() {
        const {options, fontSize, index} = this.state;
        return options.map((item, i) => {
            if( index == i) {
                return <TouchableOpacity key={i} onPress={() => this.handleChange(i)}>
                    <Animated.Text style={[{fontSize: fontSize[i], fontWeight: '300', paddingRight: 10, color: colors.text}]}>{item}</Animated.Text>
                </TouchableOpacity>
            } else {
                return <TouchableOpacity key={i} onPress={() => this.handleChange(i)}>
                    <Animated.Text style={[{fontSize: fontSize[i], fontWeight: '200', paddingRight: 10, color: colors.text}]}>{item}</Animated.Text>
                </TouchableOpacity>
            }
        })
    }

    render() {
        return (
            <View style={{height: 100, padding: 16, paddingTop: 36}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity>
                        <Ionicons name='md-options' color={colors.text} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='md-search' color={colors.text} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
                    {this.renderButtons()}
                </View>
            </View>
        )
    }
}