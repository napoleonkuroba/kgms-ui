import React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './index.css'

export default function CopyRight(){
    return (
        <Typography variant="body2" color="textSecondary" align="center" className="copyright">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Animus
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
    )
}