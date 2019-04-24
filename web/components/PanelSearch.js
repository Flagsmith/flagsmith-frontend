import React, {Component, PropTypes} from 'react';

const PanelSearch = class extends Component {
    displayName: 'PanelSearch'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    filter() {
        const {search} = this.state;
        const {items, filterRow} = this.props;
        if (filterRow && search) {
            return _.filter(items, (i) => filterRow(i, search.toLowerCase()))
        }
        return items;
    }

    render() {
        const {search} = this.state;
        const {title, items, renderRow, renderNoResults} = this.props;
        var filteredItems = this.filter(items);
        return (!search && (!filteredItems || !filteredItems.length)) ? renderNoResults : (
            <Panel
                className={this.props.className}
                title={this.props.title}
                icon={this.props.icon}
                action={(
                    <Row onClick={() => this.input.focus()}>
                        <input ref={c => this.input = c}
                               onChange={(e) => this.props.onChange || this.setState({search: Utils.safeParseEventValue(e)})}
                               type="text"/>
                        <span style={{marginLeft: 10, position: 'absolute'}} className="icon ion-ios-search"></span>
                    </Row>
                )}>
                <div id={this.props.id} className="search-list">
                    {filteredItems && filteredItems.length ?
                        filteredItems.map(renderRow) : (renderNoResults && !search) ? renderNoResults : (
                            <Column>
                                <div>No results {search && <span>for <strong>"{search}"</strong></span>}</div>
                            </Column>
                        )}
                </div>
            </Panel>
        );
    }
};

PanelSearch.propTypes = {
    title: React.PropTypes.string,
    items: React.PropTypes.any,
    search: OptionalString,
    renderRow: RequiredFunc,
    renderNoResults: PropTypes.any,
    filterRow: OptionalFunc,
};

module.exports = PanelSearch;
