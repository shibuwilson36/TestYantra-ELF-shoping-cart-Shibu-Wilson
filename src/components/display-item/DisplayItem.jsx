import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles, IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Model from '../model/Model'
import Grow from '@material-ui/core/Grow';
import '../display-item/display.css'


const useStyles = makeStyles(theme => ({

    avatar: {
        color: red[500],
    },
}));

export default function DisplayItem(props) {
    const classes = useStyles();

    return (
        <Grow in={true} >
            <div className="card col-md-3 float-left mt-3 my-card">

                <div className="col-md-2 offset-9 mt-2">
                    {!props.text.wish ?
                        <IconButton style={{ outline: "none" }} aria-label="cart">
                            <FavoriteBorderIcon onClick={() => props.changeColor(props.text)} className={classes.avatar} fontSize="large" />
                        </IconButton> :
                        <IconButton style={{ outline: "none" }} aria-label="cart">
                            <FavoriteIcon onClick={() => props.changeColor(props.text)} className={classes.avatar} fontSize="large" />
                        </IconButton>
                    }


                </div>
                <div className="view overlay">
                    <img className="card-img-top" width="60%" height="160px" src={props.text.image} alt='c' />

                </div>

                <div className="card-body">

                    <h4 className="card-title">{props.text.productName}</h4>
                    <p className="card-text">{props.text.brandName}</p>
                    <p className="card-text">₹{props.text.price}</p>
                    <div className="col-md-12 " onClick={() => props.addToCart(props.text)}>
                        <Model name="Add Cart" done={props.text.done} />
                    </div>

                </div>
                

            </div>
        </Grow>
    )
}
