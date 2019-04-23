// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import withNavigationContext from "../../common-mobile/providers/withNavigationContext";
import withNavbarInfo from "../components/withNavbarInfo";

const RightIcon = () => <ION name="ios-arrow-forward"/>
const ProjectNavigation = class extends PureComponent {
    static displayName = 'TheComponent';

    static propTypes = {};
    selectOrganisation = (selectOrganisation, organisations) => {
        API.showOptions("Select Organisation", _.map(organisations, "name"))
            .then((i) => {
                if (i < organisations.length) {
                    selectOrganisation(organisations[i].id)
                }
            })
    }
    selectProject = (selectProject) => {
        API.showOptions("Select Organisation", _.map(projects, "name"))
            .then((i) => {
                if (i < organisations.length) {
                    selectProject(organisations[i].id)
                }
            })
    }

    selectEnvironment = () => {
        const {
            props: {
                selectedProject,
                selectedOrganisation,
            }
        } = this;
        Navigation.showModal(
            routes.withStack(routes.environmentSelect(selectedOrganisation, selectedProject,(componentId)=>{
                Navigation.dismissModal(componentId)
            }))
        )
    }

    selectProject = () => {
        const {
            props: {
                selectedProject,
                selectedOrganisation,
            }
        } = this;
        Navigation.showModal(
            routes.withStack(routes.organisationSelect(false, (componentId)=>{
                Navigation.dismissModal(componentId)
            }))
        )
    }

    renderNav() {
        // const { props } = this;
        const {
            props: {
                selectedProject,
                selectedEnvironment,
                selectedOrganisation,
                selectionLoaded
            }
        } = this;
        const maxWidth = (DeviceWidth-50)/2;
        console.log(selectedProject && selectedProject.name)
        console.log(selectedEnvironment && selectedEnvironment.name)
        console.log(selectionLoaded)
        return selectionLoaded ? (
            <Fade autostart value={1}>
                <Row style={{flexWrap:'nowrap'}}>
                    <TouchableOpacity onPress={this.selectProject} style={styles.navContainer}>
                        <Text
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1.2}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                            minimumFontScale={0.8}
                            style={[styles.nav, styles.navFaint, {maxWidth}]}>
                            {selectedProject.name}
                        </Text>
                    </TouchableOpacity>
                    <Column style={styles.iconContainer}>
                        <ION style={styles.icon} name={"ios-arrow-forward"}/>
                    </Column>
                    <TouchableOpacity onPress={this.selectEnvironment} style={styles.navContainer}>
                        <Text allowFontScaling={true}
                              numberOfLines={1}
                              adjustsFontSizeToFit={true}
                              maxFontSizeMultiplier={1.2}
                              minimumFontScale={0.8}
                              style={[styles.nav, {maxWidth}]}>
                            {selectedEnvironment.name}
                        </Text>
                    </TouchableOpacity>
                </Row>
            </Fade>
        ) : <View/>
    }

    render() {
        const { props: { statusBarHeight } } = this;
        return (
                <Flex style={[{ height: 40, }, Styles.centeredContainer]}>
                    {this.renderNav()}
                </Flex>
        )
    }
}


const styles= StyleSheet.create({
    nav: {
        fontSize: em(1.2),
        color:'white',
        fontWeight:'bold'
    },
    navFaint: {
        fontWeight:'300',
        color:'rgba(255,255,255,.5)'
    },
    icon : {
     fontSize: em(1),
        color:'rgba(255,255,255,.5)'
    },
    iconContainer: {
        marginLeft: styleVariables.gutterBase*2,
        marginRight: styleVariables.gutterBase*2
    }
})

module.exports = withNavbarInfo(withNavigationContext(ProjectNavigation));
