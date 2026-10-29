import { RouteComponentProps } from 'react-router-dom';

interface IRegisterViewProps extends RouteComponentProps<any> {
    auth: boolean;
    setAuth: (status: boolean) => void;
}

export default IRegisterViewProps;
