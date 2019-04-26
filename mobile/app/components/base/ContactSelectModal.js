const ContactSelectModal = class extends React.Component {
    static displayName = 'ContactSelectModal';

    static propTypes = {
        componentId: propTypes.string,
        onChange: propTypes.func.isRequired,
    }

    state = {};

    componentDidMount(event) { // todo:
        API.getContacts()
            .then(({ error, contacts }) => {
                this.setState({ contacts, error, isLoading: false });
            })
            .catch((err) => {
                Navigation.dismissModal(this.props.componentId);
                alert(err);
            });
    }

    onDone = () => {
        Navigation.dismissModal(this.props.componentId);
        this.props.onChange(this.state.value);
    };

    render() {
        const { multiple } = this.props;
        const { isLoading, contacts, value, error } = this.state;
        return (
            <Delay>
                <Flex style={[Styles.body, Styles.container]}>
                    <Flex style={Styles.centeredContainer}><Loader/></Flex>
                    <Button>Done</Button>
                </Flex>

                <Flex style={[Styles.body, Styles.container]}>
                    {isLoading && <Flex style={Styles.centeredContainer}><Loader/></Flex>}
                    {contacts && (
                        <Fade style={{ flex: 1 }} autostart value={1}>
                            <Select
                              placeholder="Search by name"
                              items={contacts}
                              value={value}
                              onChange={value => this.setState({ value })}
                              multiple={multiple}
                              renderRow={({ givenName, familyName }, isSelected, toggleItem) => (
                                  <ListItem style={Styles.listItem} onPress={toggleItem}>
                                      <Text style={Styles.listItemText}>
                                          {givenName}
                                      </Text>
                                      <ION
                                        style={[Styles.listIcon, { color: isSelected ? colour.primary : colour.listItemNav }]}
                                        name={isSelected ? 'ios-checkbox' : 'ios-checkbox-outline'}
                                      />
                                  </ListItem>
                              )}
                              filterItem={(contact, search) => contact.search.indexOf(search) !== -1}
                            />
                        </Fade>
                    )}
                    <Button onPress={this.onDone}>Done</Button>
                </Flex>
            </Delay>
        );
    }
};

module.exports = ContactSelectModal;
