import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const PairImage = (props) => {
    return (
        <div className="c-pair-image">
            <img src={`/assets/cache/${props.filename}.gif`} alt={props.alt} />
            <img src={`/assets/${props.filename}.gif`} alt={props.alt} />
        </div>
    )
}

PairImage.propTypes = {
    filename: PropTypes.string,
    alt: PropTypes.string
}

PairImage.defaultProps = {
    filename: '',
    alt: 'THIS IS AN IMAGE'
}


class NetworkView extends Component {
    render() {
        return (
            <div>
                <h2>Magic</h2>
                <p>
                    To see the network cache effectiveness, try turn on the
                    fast 3G/slow 3G in the dev-tool. Otherwise, your internet
                    will probably be too fast to the differences.
                </p>
                <div className="c-network-view">
                    <PairImage filename="whatyougot" alt="rickandmorty" />
                    <PairImage filename="css" alt="CSS" />
                    <PairImage filename="sauce" alt="sauce" />
                </div>
            </div>
        )
    }
}

export default NetworkView
