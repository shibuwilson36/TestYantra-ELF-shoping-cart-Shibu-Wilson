import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 150,
        },
    },
}));

export default function MultilineTextFields(props) {
    const currencies = [
        {
            value: '',
            label: '',
        },
        {
            value: props.value[0],
            label: props.value[0],
        },
        {
            value: props.value[1],
            label: props.value[1],
        },
    
    ];
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = event => {
        setCurrency(event.target.value);
        props.handleClick(event.target.value)
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">

            <div>

                <TextField
                    id="outlined-select-currency-native"
                    select
                    label={props.value[2]}
                    value={currency}
                    onChange={handleChange}
                    
                    SelectProps={{
                        native: true,
                    }}

                    variant="outlined"
                >
                    {currencies.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </div>
        </form>
    );
}