import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

export default class UploadDialog extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      subject: "",
      filename: "",
      passwd: "",
      file: "暂未选择",
      disabled:false,
    }
  }

  render() {
    return (
      <Dialog open={this.props.dialogOpen} onClose={() => {
        this.props.dialogClose()
      }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">文件上传</DialogTitle>
        <DialogContent>
          <DialogContentText>
            将文件上传到服务器并进行快速解析
          </DialogContentText>
          <Grid container spacing={4}>
            <Grid item xs={4} className="grid">
              <FormControl className="formc">
                <InputLabel id="demo-simple-select-label">上传科目</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  native
                  onChange={(e) => { this.setState({ subject: e.target.value }) }}
                  inputProps={{
                    name: 'subject-name',
                    id: 'subject',
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

            <Grid item xs={8} className="grid">
              <TextField id="filename" className='textf' onChange={(e) => { this.setState({ filename: e.target.value }) }} label="文件名" />
            </Grid>
            <Grid item xs={12} className="grid">
              <TextField id="passwd" type="password" className='textf' onChange={(e) => { this.setState({ passwd: e.target.value }) }} label="密钥" />
            </Grid>
            <Grid item xs={12} className="grid">
              <Button
                variant="contained"
                component="label"
              >
                选择文件
                <input
                  type="file"
                  onChange={(e) => {
                    this.setState({ file: e.target.value })
                  }}
                  hidden
                  ref={this.fileInput}
                />
              </Button>

            </Grid>
            <Grid item xs={12} className="grid">
              <Typography variant="button">{this.state.file}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            this.props.dialogClose()
            this.setState({disabled:false})
            this.setState({file:"暂未选择"})
          }} color="primary">
            取消
          </Button>
          <Button disabled={this.state.disabled}  onClick={(e) => {
            this.setState({file:"正在解析......"})
            this.setState({disabled:true})  
            const data = new FormData();
            data.append('file', this.fileInput.current.files[0]);
            data.append('subject',this.state.subject)
            data.append('filename',this.state.filename)
            data.append('passwd',this.state.passwd)
            axios({
              method:"post",
              url:"http://napoleonxzy.cn:18080/ParseFile",
              data:data
            }).then(res => {
									var state = res.data.status
                  if (state==="success"){
                    this.setState({file:"解析成功"})              
                  }else{
                    this.setState({file:"解析失败"})
                  }
            }).catch(err=>{
              this.setState({file:"上传失败，请稍后重试"})
            })
          }} color="primary">
            上传
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}