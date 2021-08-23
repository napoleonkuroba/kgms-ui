import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import './index.css'
import UploadDialog from '../UploadDialog';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '2%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function TopBar() {

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const dialogClose=()=>{
    setDialogOpen(false);
  }

  const open = Boolean(anchorEl);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            Beta 0.3
          </Typography>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography variant="button">
              当前版本 Beta 0.3 <br /> 
              *新增 文件上传模块<br/> 
              *新增 查询键值红色标注 <br />
              *新增 表格类型查询键解析<br/>
              <br/>
              *修改 页面工具栏布局<br/>
              <br/>
              *修复 查询异常不会做出提醒的问题<br/>
              

              </Typography>
          </Popover>
          <Typography variant="h6" className={classes.title}>
            个人知识点索引库
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>上传文件</Button>
          <UploadDialog dialogOpen={dialogOpen} dialogClose={dialogClose}></UploadDialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}
