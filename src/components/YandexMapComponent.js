import React, { Component, PropTypes } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

// Using CSS Modules mechanism
import styles from "../assets/css/style.css";

export class YandexMapComponent extends Component {

    constructor(props) {
        super(props);

        this.renderPoints = this.renderPoints.bind(this);
    }

    renderPoints() {
        const { points } = this.props;

        return points.map(point =>
            <Placemark
                geometry={{
                    coordinates: [point.long, point.lat]
                }}
                properties={{
                    hintContent: point.date,
                    balloonContent: `${point.date} ${point.message}`
                }}
            />
        );
    }

    render() {
        const { defaultCoordinates: center, renderPoints } = this.props;
        let mapState = {
            center: Object.keys(center).map(k => center[k]),
            zoom: 10
        };

        return (
            <YMaps>
                <Map state={mapState}>
                    {renderPoints()}
                </Map>
            </YMaps>
        );
    }
}

YandexMapComponent.propTypes = {
    defaultZoom: PropTypes.number,
    defaultCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
    points: PropTypes.shape({
        message: PropTypes.string,
        date: PropTypes.anyOf([PropTypes.string, PropTypes.number]),
        lat: PropTypes.number,
        long: PropTypes.number
    }),
    placeMarkStyle: PropTypes.shape({ //in future updates...
        iconLayout: 'default#image',
        iconImageHref: PropTypes.string,
        iconImageSize: PropTypes.array,
        iconImageOffset: PropTypes.array
    })
};

YandexMapComponent.defaultProps = {
    defaultZoom: 10
};
