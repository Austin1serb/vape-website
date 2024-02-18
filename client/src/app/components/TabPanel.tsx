import React from 'react'


// TabPanel component
function TabPanel(props: Readonly<{ [x: string]: any; children: any; value: any; index: any; }>) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{ padding: 6 }}>
                    <div>{children}</div>
                </div>
            )}
        </div>
    );
}


export default TabPanel