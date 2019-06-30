import data from '../data/base/_data'
import SegmentListStore from "../stores/segment-list-store";
export default (WrappedComponent) => {
    class HOC extends React.Component {
        static displayName = 'withFoo';

        constructor(props) {
            super(props);
            ES6Component(this);
            this.state = {
                segmentOverrides: [],
                segments: SegmentListStore.getSegments(),
            };

            this.listenTo(SegmentListStore, 'change', () => {
                this.setState({
                    segments: SegmentListStore.getSegments(),
                });
            });

            const {props:{flagId, projectId}} = this;
            if (flagId) {
                data.get(`${Project.api}projects/${projectId}/features/${flagId}/segments/`)
                    .then((segmentOverrides)=>{
                        this.setState({segmentOverrides})
                    })
            }
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
