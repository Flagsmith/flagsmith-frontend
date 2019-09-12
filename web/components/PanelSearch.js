import React, { Component, PropTypes } from 'react';

const PanelSearch = class extends Component {
    static displayName = 'PanelSearch'

    static propTypes = {
        title: React.PropTypes.string,
        items: React.PropTypes.any,
        search: OptionalString,
        renderRow: RequiredFunc,
        renderNoResults: PropTypes.any,
        filterRow: OptionalFunc,
        paging: OptionalObject,
        nextPage: OptionalFunc,
        prevPage: OptionalFunc,
        goToPage: OptionalFunc,
        isLoading: OptionalBool,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    filter() {
        const { search } = this.state;
        const { items, filterRow } = this.props;
        if (filterRow && search) {
            return _.filter(items, i => filterRow(i, search.toLowerCase()));
        }
        return items;
    }

    render() {
        const { search } = this.state;
        const { title, items, renderRow, renderNoResults, paging, nextPage, prevPage, goToPage, isLoading } = this.props;
        const filteredItems = this.filter(items);
        return (!search && (!filteredItems || !filteredItems.length)) ? renderNoResults : (
            <Panel
              className={this.props.className}
              title={this.props.title}
              icon={this.props.icon}
              action={(
                  <Row onClick={() => this.input.focus()}>
                      <input
                        ref={c => this.input = c}
                        onChange={e => (this.props.onChange ? this.props.onChange(e) : this.setState({ search: Utils.safeParseEventValue(e) }))}
                        type="text"
                        value={this.props.search || search}
                      />
                      <span style={{ marginLeft: 10, position: 'absolute' }} className="icon ion-ios-search" />
                  </Row>
                )}
            >
                {!!paging && (
                    <Row className="list-item" style={isLoading ? { opacity: 0.5 } : {}}>
                        <Button
                          disabled={!paging.previous} className="icon ion-ios-arrow-back"
                          onClick={prevPage}
                        />
                        <Flex>
                            <Row className="list-item" style={{ justifyContent: 'space-around' }}>
                                {_.map(new Array(Math.ceil(paging.count / paging.pageSize)), (item, index) => (
                                    <div
                                      key={index} role="button" style={paging.currentPage === index + 1 ? { fontWeight: 'bold', fontSize: '1.4rem' } : {}}
                                      onClick={paging.currentPage === index + 1 ? undefined : () => goToPage(index + 1)}
                                    >
                                        {index + 1}

                                    </div>
                                ))}
                            </Row>
                        </Flex>
                        <Button
                          className="icon ion-ios-arrow-forward" disabled={!paging.next}
                          onClick={nextPage}
                        />
                    </Row>
                )}
                <div id={this.props.id} className="search-list" style={isLoading ? { opacity: 0.5 } : {}}>
                    {filteredItems && filteredItems.length
                        ? filteredItems.map(renderRow) : (renderNoResults && !search) ? renderNoResults : (
                            <Column>
                                <div>
                                    {'No results '}
                                    {search && (
                                    <span>
for
                                        <strong>
                                            {` "${search}"`}
                                        </strong>
                                    </span>
                                    )}
                                </div>
                            </Column>
                        )}
                </div>
            </Panel>
        );
    }
};

module.exports = PanelSearch;
