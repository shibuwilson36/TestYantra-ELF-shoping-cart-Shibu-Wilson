
import React from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}



export default function Home() {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = Transition => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  return (
    <div>
      <img 
      src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603__480.jpg" 
      alt=""
      width="100%"/>
        <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Login S</span>}
      />
    </div>
  )
}

