import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';


class ListDrawer extends Component {
    state = {
        open: false
    }

    styles = {
        list: {
            width: "250px"
        },
        fullList: {
            width: 'auto'
        }
    };

    render = () => {
        return (
            <div>
                <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
                    <div className={this.styles.list}>
                        <ul>
                            {this.props.locations && this
                                .props
                                .locations
                                .map((location, index) => {
                                    return (
                                        <li key={index}>{location.name}</li>
                                    )
                                })}
                        </ul>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default ListDrawer;