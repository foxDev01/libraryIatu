import { RouteComponentProps } from 'react-router-dom';

interface INavbarProps extends RouteComponentProps<any>{
    open: boolean,
    auth: boolean,
    setAuth: (_auth: boolean) => void,
    handleDrawer(): void
}

export default INavbarProps;

