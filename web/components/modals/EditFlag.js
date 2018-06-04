import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {
			name: props.name
		};
	}

	close() {
		closeModal();
	}

	confirmDelete = (deleteFlag) => {
		openConfirm(<h3>Delete Feature</h3>, <p>Are you sure you want to delete this feature?</p>, () => {
			deleteFlag(this.props.id);
		});
	}


	componentDidMount = () => {
		setTimeout(()=>{this.input.focus()},500);
	};

	render() {
		return (
			<ProjectProvider onSave={this.close}>
				{({isLoading, isSaving, flagName, error, editFlag, deleteFlag}) => (
					<div>
						<form onSubmit={(e) => {
							e.preventDefault();
							editFlag(this.props.id, this.state.name);
						}}>
							<InputGroup
								ref={(e)=>this.input = e}
								inputProps={{className: "full-width"}}
								onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
								value={this.state.name}
								isValid={this.state.name && this.state.name.length}
								type="text" title="Name*"
								placeholder="Name"/>
							{error && <Error error={error}/>}
						</form>
						<div className="pull-right">
							<Button disabled={isSaving || !this.state.name || this.state.name == this.props.name} onClick={() => editFlag(this.props.id, this.state.name)}>
								{isSaving && this.state.name !== this.props.name ? 'Saving' : 'Save Changes'}
							</Button>
							<Button disabled={isSaving} onClick={() => this.confirmDelete(deleteFlag)} style={{marginLeft: 10}}>
								{isSaving && this.state.name === this.props.name ? 'Deleting' : 'Delete'}
							</Button>
						</div>
					</div>
				)}

			</ProjectProvider>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
