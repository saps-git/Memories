import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(128,0,0 ,1 )', 
      fontSize: '3rem',
    },
    image: {
      marginLeft: '15px',
    },
    [theme.breakpoints.down('sm')] : { //for mobile devices, or devices with 'sm'
        mainContainer:{
            flexDirection: 'column-reverse'
        }
    }
}));