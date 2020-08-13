import data from '../data/base/_data';
import SegmentListStore from '../stores/segment-list-store';
import ProjectStore from '../stores/project-store';

export default (WrappedComponent) => {
    class HOC extends React.Component {
        static displayName = 'withFoo';

        constructor(props) {
            super(props);
            ES6Component(this);
            this.state = {
                segments: SegmentListStore.getSegments(),
            };

            this.listenTo(SegmentListStore, 'change', () => {
                this.setState({
                    segments: SegmentListStore.getSegments(),
                });
            });
        }

        componentDidMount() {
            if (this.props.projectFlag) {
                data.get(`${Project.api}features/feature-segments/?environment=${ProjectStore.getEnvironmentIdFromKey(this.props.environmentId)}&feature=${this.props.projectFlag.id}`)
                    .then((res) => {
                        this.setState({ segmentOverrides: res.results });
                    });
            }
        }


        updateSegments = segmentOverrides => this.setState({ segmentOverrides })

        saveSegmentOverrides = () => {
            const { state: { segmentOverrides } } = this;
            Promise.all(segmentOverrides.map(override => data.put(`${Project.api}features/feature-segments/${override.id}`, override)));
        }

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
