import data from '../data/base/_data'
import SegmentListStore from "../stores/segment-list-store";
export default (WrappedComponent) => {
    class HOC extends React.Component {
        static displayName = 'withFoo';

        constructor(props) {
            super(props);
            ES6Component(this);
            this.state = {
                segmentOverrides: this.props.projectFlag && this.props.projectFlag.feature_segments,
                segments: SegmentListStore.getSegments(),
            };

            this.listenTo(SegmentListStore, 'change', () => {
                this.setState({
                    segments: SegmentListStore.getSegments(),
                });
            });
        }

        updateSegments = (segmentOverrides) => this.setState({segmentOverrides})

        render() {
            return (
                <WrappedComponent
                    ref="wrappedComponent"
                    updateSegments={this.updateSegments}
                    {...this.props}
                    {...this.state}
                />
            );
        }
    }

    return HOC;
};
