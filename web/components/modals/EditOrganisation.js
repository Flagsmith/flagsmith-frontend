import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'EditOrganisation'

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	close() {
		closeModal();
	}

	componentDidMount = () => {
		this.focusTimeout = setTimeout(() => {
			this.input.focus();
			this.focusTimeout = null;
		}, 500);
	};

	componentWillUnmount() {
		if (this.focusTimeout) {
			clearTimeout(this.focusTimeout);
		}
	}

	render() {
		const {name} = this.state;
		return (
			<AccountProvider onSave={this.close}>
				{({
					  isLoading,
					  isSaving,
					  user,
					  organisation
				  }, {createOrganisation, selectOrganisation, editOrganisation}) => (
					<form onSubmit={(e) => {
						e.preventDefault();
						!isSaving && name && editOrganisation(name);
					}}>
						<InputGroup
							ref={(e) => this.input = e}
							inputProps={{defaultValue: organisation.name, className: "full-width"}}
							onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
							isValid={name && name.length}
							type="text" title="Organisation Name*"
							placeholder="My Product Name"/>
						<div className="pull-right">
							<Button disabled={isSaving || !name}>
								{isSaving ? 'Saving' : 'Save'}
							</Button>
						</div>
					</form>
				)}
			</AccountProvider>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
