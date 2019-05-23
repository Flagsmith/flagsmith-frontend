import propTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

// propTypes: uri: RequiredString
const NativeModal = class extends React.Component {
    static displayName = 'SelectModal';

    static propTypes = {
        componentId: propTypes.string,
        value: propTypes.object,
        isLoading: propTypes.bool,
        multiple: propTypes.bool,
        items: propTypes.any,
        onChange: propTypes.func.isRequired,
        placeholder: propTypes.string,
        filterItem: propTypes.func,
        renderRow: propTypes.func,
    };

    constructor(props) {
        super(props); // todo:
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.state = {
            isLoading: true,
            value: props.value,
        };
    }

    onDone = () => {
        Navigation.dismissModal(this.props.componentId);
        this.props.onChange(this.state.value);
    };

    onChange = (value) => {
        this.setState({ value }, this.props.autoclose && this.onDone);
    }

    render() {
        const { isLoading, multiple, items, placeholder, filterItem, renderRow } = this.props;
        const { onChange } = this;
        const { value } = this.state;
        return (
            <Flex style={[Styles.body]}>
                {isLoading && <Flex style={Styles.centeredContainer}><Loader/></Flex>}
                {items && (
                    <Fade style={{ flex: 1 }} autostart value={1}>
                        <Select
                          placeholder={placeholder || 'Search'}
                          items={items}
                          value={value}
                          onChange={onChange}
                          multiple={multiple}
                          style={{ backgroundColor: 'black' }}
                          renderRow={(item, isSelected, toggleItem) => renderRow(item, isSelected, toggleItem)}
                          filterItem={filterItem}
                        />
                    </Fade>
                )}
                <FormGroup>
                    <Column>
                        <ButtonPrimary style={Styles.mb5} onPress={this.onDone}>Done</ButtonPrimary>
                    </Column>
                </FormGroup>
            </Flex>
        );
    }
};

module.exports = NativeModal;
