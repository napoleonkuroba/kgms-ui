import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Login from './Login'
import Home from './Home'

export default function MyRouters() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/home'  component={Home} />
                <Redirect to='/login'/>
            </Switch>
        </BrowserRouter>
    )
}