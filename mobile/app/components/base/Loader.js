/**
 * Created by kylejohnson on 09/09/15.
 */
import React, { PureComponent } from 'react';

const json = Object.assign({}, require('./loader.json'));

json.assets[0].layers[0].shapes[0].it[1].c.k = [50 / 255, 140 / 255, 255 / 255, 1];

const Loader = class extends PureComponent {
    static displayName = 'LOADER';

    componentDidMount() {
        this.refs.animation.play();
    }

    render() {
        return (
            <View style={{ opacity: 0.75 }}>
                <Animation
                  ref="animation" style={{
                      width: 40 * 1.25,
                      height: 30 * 1.25,
                  }} loop
                  source={json}
                />
            </View>
        );
    }
};

Loader.propTypes = {};

module.exports = Loader;
