import { experimentalStyled as styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './CountrList.css'
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/ActionCreator';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
  button: {
    backgroundColor:blue,
    marginTop: "1rem",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    
  },
  loader:{
    marginTop:"10rem"
  }
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const CountryList = () =>{
  const classes = useStyles();
  const [countries, setCountrie ] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all',{
          method:'GET',
        });
        const data = await response.json();
        setTimeout(()=>setCountrie([...data]),2000) 
        dispatch(setName(""))
      } catch (error) {
        return <h1>Something went wrong</h1>
      }
    };

    fetchCountry();
  },[]);

  console.log(countries)
  if(!countries){
    console.log("raju")
    return <Box className={classes.loader} sx={{ display: 'flex',justifyContent:"center" }}>
    <CircularProgress  />
  </Box>;
  }
  return(
    <div className='country__container' >
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 16 }}>
        {countries?.map((item, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <Item>
              <div className='t1'>
              <div className='image' >
              <img  src={item.flags.svg}></img>
              </div>
              <div className='content'>
              <Typography variant='p'>Name: {item.name.common}</Typography>
              <Typography variant='subtitle2'>Currency: <span>{ item?.currencies ? (Object.keys(item?.currencies))[0]:""}</span>
              {" "}<span>{ item?.currencies ? item?.currencies[(Object.keys(item?.currencies))[0]].symbol : ""}</span>
              </Typography>
              <Typography variant='subtitle2'>Country Code: <span>{item.idd && item.idd.root && item.idd.suffixes ? item.idd.root+ item.idd.suffixes[0] : "" }</span></Typography>
              </div>
             <Link to={`/country-detail/${item.name.common}`} > <Button className={classes.button} variant="contained">More</Button></Link>
             
              </div>
              </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  </div>
 )
}

export default CountryList;