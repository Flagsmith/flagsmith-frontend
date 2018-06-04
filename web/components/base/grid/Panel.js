const Panel = class extends React.Component {
    displayName: 'Panel'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className={"panel panel-default " + (this.props.className || "")}>
                <div className="panel-heading">

                    <Row space={true}>
                        <Row className={"flex-1"}>
                            {this.props.icon && (
                                <span className={"panel-icon"}><ion className={`icon ${this.props.icon}`}/></span>
                            )}
                            {this.props.title}
                        </Row>
                        {this.props.action}
                    </Row>

                </div>
                <div className="panel-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

Panel.displayName = "Panel";

Panel.propTypes = {
    title: oneOfType([OptionalObject, OptionalString]),
    icon: OptionalObject,
    children: OptionalNode
};

module.exports = Panel;
