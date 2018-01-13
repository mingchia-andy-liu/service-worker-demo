import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tab from './Tab'


class Tabs extends Component {
    constructor() {
        super()

        this.state = {
            selectedIndex: 0
        }
    }

    onTabSelect(tabIndex, event) {
        this.props.onChange(tabIndex)
        this.setState({ selectedIndex: tabIndex })
    }

    renderTabs() {
        const self = this
        return this.props.children.map((item, index) =>
            <Link key={`tab-bar-item-${index}`} to={item.props.path}>
                <Tab
                    active={this.state.selectedIndex === index}
                    index={index}
                    label={item.props.label}
                    onClick={self.onTabSelect.bind(self, index)}
                />
            </Link>
        )
    }

    calculateSliderPosition() {
        return `${this.state.selectedIndex / 3 * 100}%`
    }

    render() {
        const sliderStyle = {
            left: this.calculateSliderPosition()
        }
        return (
            <nav className="c-tab-bar u-flex-row u--center" data-index={this.state.selectedIndex}>
                {this.renderTabs()}
                <span class={`c-tab-slider`} style={sliderStyle}></span>
            </nav>
        )
    }
}

Tabs.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    path: PropTypes.string,
    label: PropTypes.string,
    index: PropTypes.number,
    onChange: PropTypes.func
}

Tabs.defaultProps = {
    path: '/',
    label: '',
    index: 0,
    onChange: () => {}
}


export default Tabs
