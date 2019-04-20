import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'CreateEnv'

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
			<ProjectProvider onSave={this.close}>
				{({isLoading, isSaving, project, createEnv, error}) => (
					<form onSubmit={(e) => {
						e.preventDefault();
						!isSaving && name && createEnv(name);
					}}>
						<InputGroup
							ref={c => this.input = c}
							inputProps={{className: "full-width"}}
							onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
							isValid={name}
							type="text" title="Name*"
							placeholder="A environment name e.g. Develop"/>
						{error && <Error error={error}/>}
						<div className="pull-right">
							<Button disabled={isSaving || !name}>
								{isSaving ? 'Creating' : 'Create Environment'}
							</Button>
						</div>
					</form>
				)}

			</ProjectProvider>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
