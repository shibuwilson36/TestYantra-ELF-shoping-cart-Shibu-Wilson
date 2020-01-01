import React, { useState } from 'react'
import { Button, Paper, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
function CartView(props) {
    const classes = useStyles();
    const [getCount, setCount] = useState({ count: 1 })
    let incrementItem = (value) => {

        if(getCount.count <10){
            if (value === 0) {
                props.changePrice(props.text, getCount.count + 1)
    
                setCount({
                    count: getCount.count + 1
                })
            }
        }
        if (getCount.count > 1) {

            if (value === 1) {
                props.changePrice(props.text, getCount.count - 1)

                setCount({
                    count: getCount.count - 1
                })
            }
        }
    }

    return (

       
       <div className="card">
            <div className="  "  >


                <div className="col-md-6 float-left card-body ">
                    <div className="">
                        <img className="col-md-4 h-50 float-left  " src={props.text.image} alt=""></img>
                        <Paper elevation={3} />
                        <p className="col-md-6 float-left " >
                            <h5>{props.text.productName}</h5>
                            <p>{props.text.brandName}</p>
                            <p>₹{props.text.price}</p>
                        </p>
                    </div>



                </div>
                <div className="col-md-4 float-left  card-body">

                    <p>Delivery by Tue Dec 31 | Free₹40</p>
                    <Fab style={{ outline: "none" }} size="small" color="dark" aria-label="subtract" className={classes.margin}>
                        <RemoveIcon onClick={() => incrementItem(1)} />
                    </Fab>
                    <Button size="small" className={classes.margin}>
                        {getCount.count}
                    </Button>

                    <Fab style={{ outline: "none" }} size="small" color="dark" aria-label="subtract" className={classes.margin}>
                        <AddIcon onClick={() => incrementItem(0)} />
                    </Fab>


                    <div className="col-md-6 offset-1 mt-3">
                        <Button
                            style={{ outline: "none" }}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => props.changeColor(props.text)}
                        >
                            Delete
                            
                   </Button>
                    </div>
                </div>
            </div>


        </div>


    )
}
export default withRouter(CartView)
