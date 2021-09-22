import { BrowserRouter, Switch } from 'react-router-dom';
import { UserRoute } from '../routes/UserRoute';
import { PublicRoute } from '../routes/PublicRoute';
import { Home } from '../views/home';
import { Login } from '../views/login';
import { Register } from '../views/register';
import { HomeOne } from '../views/cqrs/home1';
import { HomeTwo } from '../views/cqrs/home2';
import { HomeThree } from '../views/cqrs/home3';

//Komponent definiujący routing. Korzysta z biblioteki react-router-dom.
export function Routes() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <UserRoute exact path="/" component={Home}></UserRoute>
                    <UserRoute exact path="/cqrs1" component={HomeOne}></UserRoute>
                    <UserRoute exact path="/cqrs2" component={HomeTwo}></UserRoute>
                    <UserRoute exact path="/cqrs3" component={HomeThree}></UserRoute>
                    <PublicRoute exact path="/login" component={Login}></PublicRoute>
                    <PublicRoute
                        exact
                        path="/register"
                        component={Register}
                    ></PublicRoute>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
