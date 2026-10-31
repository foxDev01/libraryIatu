import { RouteComponentProps } from 'react-router-dom';

interface ILoginViewProps extends RouteComponentProps<any> {
    auth: boolean;
    setAuth: (_status: boolean) => void;
}

export default ILoginViewProps;
