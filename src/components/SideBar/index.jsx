import React, { Component } from "react";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '90%',
    },
});


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            files: [],
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.drawerContainer}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">科目</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.subject}
                        onChange={(e) => {
                            this.setState({ subject: e.target.value })
                            axios({
                                method: "get",
                                url: "http://localhost:3000/api/GetFiles/" + e.target.value,
                            }).then(res => {
                                console.log(res.data)
                                this.setState({ files: res.data })
                                console.log(res.data)
                            }).catch(err => {
                                console.log(err)
                            })
                        }}
                        label="科目"
                    >
                        <MenuItem value="">
                            <em></em>
                        </MenuItem>
                        <MenuItem value={"高等数学"}>高等数学</MenuItem>
                        <MenuItem value={"线性代数"}>线性代数</MenuItem>
                        <MenuItem value={"概率论与数理统计"}>概率论与数理统计</MenuItem>
                        <MenuItem value={"数据结构"}>数据结构</MenuItem>
                        <MenuItem value={"操作系统"}>操作系统</MenuItem>
                        <MenuItem value={"计算机网络"}>计算机网络</MenuItem>
                        <MenuItem value={"计算机组成原理"}>计算机组成原理</MenuItem>
                    </Select>
                </FormControl>
                <List>
                    {this.state.files.map((item, index) =>
                        <ListItem button key={item} onClick={() => {
                            
                            axios({
                                method: "post",
                                url: "http://localhost:3000/api/GetDataFile",
                                data:{subject:this.state.subject,file_name:item}
                            }).then(res => {
                                var data = res.data
											this.props.setPare( data );
                            }).catch(err => {
                                console.log(err)
                            })

                        }}>
                            <ListItemText primary={item} />
                        </ListItem>
                    )}
                </List>
                <Divider />
            </div >
        )
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);