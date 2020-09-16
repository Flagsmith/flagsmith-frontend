// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import color from 'color';
import cx from 'classnames';
import withTags from '../../common/providers/withTags';
import InlineModal from './InlineModal';
import TagList from './TagList';

class TagValues extends PureComponent {
  static displayName = 'TheComponent';

  static propTypes = {
  };

  render() {
      const { props: { tags } } = this;
      return (
          <>
              {tags && tags.map(tag => this.props.isSelected(tag) && (
              <Tag
                className="px-2 py-2 mr-2"
                tag={tag}
              />
              ))}
              <Button onClick={this.props.onAdd} type="button" className="btn--outline">
              Add Tag
              </Button>
          </>
      );
  }
}
class Tag extends PureComponent {
  static displayName = 'TheComponent';

  state = {
      hover: false,
  }

  static propTypes = {
      selected: propTypes.bool,
      className: propTypes.string,
      onClick: propTypes.func,
      tag: propTypes.shape({
          colour: propTypes.string,
      }),
  };

  toggleHover =() => this.setState({ hover: !this.state.hover })

  render() {
      const { props: { onClick, tag, selected, className } } = this;
      return (
          <div
            onClick={onClick ? () => onClick(tag) : null}
            onMouseEnter={onClick ? this.toggleHover : null}
            onMouseLeave={onClick ? this.toggleHover : null}
            style={{ backgroundColor: this.state.hover ? color(tag.colour).darken(0.1) : tag.colour }}
            className={cx('tag', className)}
          >
              <div>
                  {tag.label ? (
                      <Row space>
                          {tag.label}
                          {selected && (
                          <span className="icon ion-md-checkmark"/>
                          )}
                      </Row>
                  ) : (
                      <div className="text-center">
                          {selected && (
                          <span className="icon ion-md-checkmark"/>
                          )}
                      </div>
                  )}
              </div>
          </div>
      );
  }
}

class _CreateEditTag extends PureComponent {
  static displayName = 'TheComponent';

  state = {
      tag: this.props.tag ? { ...this.props.tag } : {},
  }

  componentDidMount() {
      this.input && this.input.focus();
  }

  update = (index, e) => {
      this.setState({
          tag: {
              ...this.state.tag,
              [index]: Utils.safeParseEventValue(e),
          },
      });
  }

  save = () => {
      const disabled = this.props.tagsSaving || !this.state.tag.colour || !this.state.tag.label;
      if (disabled) return;
      const isEdit = !!this.state.tag.id;
      const func = isEdit ? AppActions.updateTag : AppActions.createTag;
      func(this.props.projectId, this.state.tag, (tag) => {
          this.setState({ tag });
          this.props.onComplete && this.props.onComplete(tag);
      });
  }

  onKeyDown = (e) => {
      if (e.key === 'Enter') {
          this.save();
      }
  }

  render() {
      const isEdit = !!this.state.tag.id;
      return (
          <div>
              <InputGroup
                value={this.state.tag.label}
                ref={input => this.input = input}
                inputProps={{ name: 'create-tag-name', className: 'full-width mb-2', onKeyDown: this.onKeyDown }}
                title="Name"
                onChange={e => this.update('label', e)}
              />
              <InputGroup
                title="Select a colour"
                component={(
                    <Row className="mb-2">
                        {Constants.tagColours.map(colour => (
                            <Tag
                              onClick={e => this.update('colour', e.colour)}
                              key={colour}
                              selected={this.state.tag.colour === colour}
                              className="tag--select mr-2 mb-2"
                              tag={{
                                  colour,
                                  id: colour,
                              }}
                            />
                        ))}
                    </Row>
)}
              />
              <div className="text-center">
                  <Button onClick={this.save} type="button" disabled={this.props.tagsSaving || !this.state.tag.colour || !this.state.tag.label}>
                      {isEdit ? 'Save Tag' : 'Create Tag' }
                  </Button>
              </div>
          </div>
      );
  }
}

const CreateEditTag = withTags(_CreateEditTag);

class TheComponent extends PureComponent {
  static displayName = 'TheComponent';

  static propTypes = {
      onChange: propTypes.func,
      value: propTypes.arrayOf(propTypes.number),
  };

  state = {
      isOpen: false,
      tab: 'SELECT',
  }


  componentDidMount() {
      AppActions.getTags(this.props.projectId);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  setFilter = e => this.setState({ filter: Utils.safeParseEventValue(e) })


  filter = (tags) => {
      const filter = this.state.filter && this.state.filter.toLowerCase();
      if (filter) {
          return _.filter(tags, tag => tag.label.toLowerCase().includes(filter));
      }
      return tags;
  }

  selectTag = (tag) => {
      const value = this.props.value || [];
      const isSelected = this.props.isSelected(tag);
      if (isSelected) {
          this.props.onChange(_.filter(value, id => id !== tag.id));
      } else {
          this.props.onChange(value.concat([tag.id]));
      }
  }

  editTag = (tag) => {
      this.setState({
          tag,
          tab: 'EDIT',
      });
  }

  render() {
      const { props: {
          tags,
          tagsLoading,
      } } = this;
      const projectTags = tags && tags[this.props.projectId];
      const filteredTags = projectTags && this.filter(projectTags);
      return (
          <div>
              <div className="inline-tags mt-2">
                  <TagValues
                    onAdd={this.toggle} tags={projectTags} isSelected={this.props.isSelected}
                    value={this.props.value}
                  />
              </div>

              <InlineModal
                title="Tags"
                isOpen={this.state.isOpen}
                onBack={() => this.setState({ tab: 'SELECT' })}
                showBack={this.state.tab !== 'SELECT'}
                onClose={this.toggle}
                className="inline-modal--tags"
              >
                  {this.state.tab === 'SELECT' && (
                  <div>
                      <Input
                        value={this.state.filter} onChange={this.setFilter} className="full-width mb-2"
                        placeholder="Search tags..."
                      />
                      {tagsLoading && !projectTags && (
                      <div className="text-center">
                          <Loader/>
                      </div>
                      )}
                      <div className="tag-list">
                          {filteredTags && filteredTags.map((tag, index) => (
                              <div key={tag.id} className="mb-2">
                                  <Row>
                                      <Flex>
                                          <Tag
                                            className="px-2 py-2" onClick={this.selectTag} selected={this.props.isSelected(tag)}
                                            tag={tag}
                                          />
                                      </Flex>
                                      <div onClick={() => this.editTag(tag)} className="ml-2 px-2 py-2 clickable">
                                          <span className="icon icon--green ion-md-settings"/>
                                      </div>

                                  </Row>
                              </div>
                          ))}
                          <div className="text-center mb-2 mt-3">
                              <ButtonLink
                                buttonText=" Create a New Tag" onClick={() => this.setState({ tab: 'CREATE', filter: '' })}
                                type="button"
                              >
                                  <span className="ml-3 icon ion-md-add"/>
                              </ButtonLink>
                          </div>
                          {projectTags && projectTags.length && !filteredTags.length ? (
                              <div className="text-center">
                          No results for "<strong>{this.state.filter}</strong>"
                              </div>
                          ) : null}
                          {
                        projectTags && !projectTags.length && (
                        <div className="text-center">
                            You have no tags yet
                        </div>
                        )
                      }

                      </div>
                      <div className="text-right pt-2">
                          <Button onClick={this.props.onClose} type="button">
                        OK
                          </Button>
                      </div>
                  </div>
                  )}
                  {this.state.tab === 'CREATE' && (
                  <CreateEditTag
                    projectId={this.props.projectId} onComplete={(tag) => {
                        this.selectTag(tag);
                        this.setState({ tab: 'SELECT' });
                    }}
                  />
                  )}
                  {
                  this.state.tab === 'EDIT' && (
                  <CreateEditTag
                    projectId={this.props.projectId} tag={this.state.tag} onComplete={(tag) => {
                        this.selectTag(tag);
                        this.setState({ tab: 'SELECT' });
                    }}
                  />
                  )
                  }
              </InlineModal>
          </div>

      );
  }
}

export default withTags(TheComponent);
