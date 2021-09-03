import TopBar from '../../components/TopBar'
import DataPlace from '../../components/DataPlace'
import React, { Component } from 'react'
import CopyRight from '../../components/CopyRight';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import './index.css'
import { Grid } from '@material-ui/core';
import MarkdownViewer from '../../components/MarkdownViewer';


export default class Home extends Component {
    constructor(props) {
		super(props);
		this.state = {
			markdown: "# Nice To Meet You！",
		}
	}

    setPare = (value) => {
        this.setState({markdown:value})
      };

    isLogin=()=>{
        axios({
            method: "get",
            url: "http://napoleonxzy.cn:3000/api/IsLogin",
        }).then(res => {
            var state = res.data.status
            console.log(state)
            if (state === "failure") {
                this.props.history.push({ pathname: '/login' })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="App">
                <TopBar />
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <SideBar setPare={this.setPare}/>
                    </Grid>
                    <Grid item xs={10}>
                        
                <div className="content">
                    <DataPlace  setPare={this.setPare} />
                    <MarkdownViewer markdown={this.state.markdown} />
                </div>
                    </Grid>
                </Grid>

                <CopyRight />
            </div>
        )
    }
}