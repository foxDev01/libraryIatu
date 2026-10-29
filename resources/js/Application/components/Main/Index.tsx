import React from 'react';
import clsx from 'clsx';

import useStyles from "./includes/style";
import IindexPageProps from '../../interfaces/IindexPageProps';

const Index: React.FC<IindexPageProps> = ({ open, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
        </div>
    );
};

export default Index;
