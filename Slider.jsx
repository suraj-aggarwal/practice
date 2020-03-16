import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  {DEFAULT_BANNER_IMAGE} from '../../config/constants'
import {getRandomNumber , getRoundRobin} from '../../libs/utils/math'

class   Slider extends Component {
    constructor(props) {
        console.log('Inside Slider');
        super(props);
        this.state = {
            index  :  0
        };
    }

    componentDidMount() {
        const {duration} = this.props;
         setInterval(
             () => {
                 this.tick()
             }
             ,duration);
    }

    tick() {
        const { random, banners }  = this.props;
        const index = random ? getRandomNumber(banners.length) : getRoundRobin(this.state.index,banners.length);
        this.setState({
            index: index
        })    
    }

    render() {
        const { height, banners } = this.props;
        const { index } = this.state;
        return(
            <div>
                <img src={banners[index]} alt="" height={height}/>
            </div>
        );
    }
}

Slider.propTypes = {
    altText: PropTypes.string,
    defaultBanner: PropTypes.string,
    banners: PropTypes.array,
    duration: PropTypes.number,
    height: PropTypes.number,
    random: PropTypes.bool
}

Slider.defaultProps = {
    altText: 'Default Banner',
    defaultBanner: DEFAULT_BANNER_IMAGE,
    banners: [DEFAULT_BANNER_IMAGE],
    duration: 2000,
    height: 200,
    random: false
}

export {Slider};