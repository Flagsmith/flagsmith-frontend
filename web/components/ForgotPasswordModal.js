import data from '../../common/data/base/_data';
const ForgotPassword = class extends React.Component {

    constructor (props, context) {
        super(props, context);
        this.state = {};
    }

    handleSubmit = () => {
        const {email} = this.state
        data.post(`${Project.api}auth/password/reset/`,{email})
            .then((res)=>{
                this.props.onComplete && this.props.onComplete();
                closeModal();
            }).catch((error)=>{
                this.setState({error})
        })
    }

    render () {
        return (
            <div>
                <InputGroup
                    inputProps={{className:"full-width"}}
                    title="Email"
                    placeholder="email" type="email"
                    onChange={(e)=>this.setState({ email: Utils.safeParseEventValue(e) })}/>

                {this.state.error && (
                    <div className="alert alert-danger">{this.state.error}</div>
                )}
                <Button onClick={this.handleSubmit}>
                    Send
                </Button>
            </div>
        );
    }
};
module.exports = ForgotPassword;