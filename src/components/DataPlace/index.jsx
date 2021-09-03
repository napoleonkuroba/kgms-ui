import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './index.css'
import { Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class DataPlace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: "",
			type: "",
			key: "",
			checked: false,
		}
	}

	render() {
		return (
			<div className="searchbar">
				<Grid container spacing={4}>
					<Grid item xs={2} className="grid">
						<FormControl className="formc">
							<InputLabel id="demo-simple-select-label">查询类别</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								native
								onChange={(e) => { this.setState({ type: e.target.value }) }}
								inputProps={{
									name: 'age',
									id: 'age-native-simple',
								}}
							>
								<option aria-label="None"></option>
								<option value={"pie"}>数据块</option>
								<option value={"def"}>定义</option>
								<option value={"tabl"}>表格</option>
								<option value={"key"}>关键词</option>
								<option value={"code"}>词汇</option>
								<option value={"func"}>公式</option>
								<option value={"imp"}>重点</option>
								<option value={"ind"}>普通索引</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2} className="grid">
						<FormControl className="formc">
							<InputLabel id="demo-simple-select-label">查询科目</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								native
								onChange={(e) => { this.setState({ subject: e.target.value }) }}
								inputProps={{
									name: 'age',
									id: 'age-native-simple',
								}}
							>
								<option aria-label="None"></option>
								<option value={"高等数学"}>高等数学</option>
								<option value={"线性代数"}>线性代数</option>
								<option value={"概率论与数理统计"}>概率论与数理统计</option>
								<option value={"计算机组成原理"}>计算机组成原理</option>
								<option value={"计算机网络"}>计算机网络</option>
								<option value={"操作系统"}>操作系统</option>
								<option value={"数据结构"}>数据结构</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} className="grid">
						<TextField id="key" className='textf' onChange={(e) => { this.setState({ key: e.target.value }) }} label="查询内容" />
					</Grid>
					<Grid item xs={2} className="grid">
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.checked}
									onChange={() => {
										this.setState({ checked: !this.state.checked })
									}}
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>
							}
							label="模糊查询"
						/>

					</Grid>
					<Grid item xs={2} className="grid">
						<Button variant="contained" color="primary" id="read" onClick={() => {
							let data={ "subject": this.state.subject, "type": this.state.type, "key": this.state.key }
							console.log(data)
							axios({
								method: "post",
								url: "http://localhost:3000/api/Search",
								data: data
							}).then(res => {
								var state = res.data.status
								if (state==="success") {
									axios({
										method: "get",
										url: "http://localhost:3000/api/resource/search.md",
									}).then(
										res =>{
											var data = res.data
											this.props.setPare( data );
										}
									)
								} else {
									var markdown = "# 搜索异常，请稍后重试"
									this.props.setPare( markdown );
								}
							}).catch(
								err => {
									var markdown = "# 搜索异常，请稍后重试"
									this.props.setPare(markdown );
									console.log(err)
								}
							)

						}}>
							查询
						</Button>
					</Grid>
				</Grid>
				<Divider className="divline"></Divider>
			</div>
		)
	}
}