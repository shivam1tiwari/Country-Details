import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { Typography, Box, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/ActionCreator';
import Map from '../google-map/Map';
import Carousel from 'react-elastic-carousel';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';


export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const useStyles = makeStyles({
  container:{
    width:"85%",
    margin:"4rem auto"
  },
  description: {
   margin:".9rem 1rem",
   padding: '0 30px',
   width:"50%",
   '@media (max-width: 750px)': {
    width:"100%",
    margin:".3rem .5rem",
    padding:"0 .8rem"
  }
  },
  mainContainer: {
    width:"100%",
    height:"50%",
    display:"flex",
    '@media (max-width: 750px)': {
      display:"block",    
    },

   div:{
    '@media (max-width: 750px)': {
      width:"100%",
    }
   },
  },
  imageContainer:{
    width:"50%",
    height:"20rem",
    paddingBottom:"4rem",
    '@media (max-width: 750px)': {
      width:"100%",
    }
  },
  loader:{
    marginTop:"10rem"
  },
});
/**
 * CountryDetails component that fetches and displays detailed information about a country.
 * This includes details like capital, region, population, currency, and languages.
 *
 * @returns {JSX.Element} The detailed view of the selected country, including images, map, and description.
 */
const CountryDetails = () => {
  const classes = useStyles();
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [latLang, setlatLang] = useState();
  const dispatch = useDispatch();
  const [images, setImages] = useState();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
       setCountry(data[0]);
       
       setlatLang({obj1:{lat:data[0]?.latlng[0],lng:data[0]?.latlng[1]
       },obj2:{lat:data[0]?.capitalInfo?.latlng[0],lng:data[0]?.capitalInfo?.latlng[1]
       }})
        dispatch(setName(countryName))
      } catch (error) {
        return <h1>Item Not Found</h1>
      }
    };

    fetchCountry();
  }, [countryName]); 

  useEffect(()=>{
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${countryName}&searchType=image&key=${"AIzaSyBJD7TuU0pHXmjqqUciBUybu6n_a5JAwvY"}&cx=${"10dc96c1471894f3b"}`);
        const data = await response.json();
        const img =  data.items.map((item)=>item?.link)
        setImages([...img]);
        console.log(data,"raju chachca")
      } catch (error) {
        return <h1>Page Not Found</h1>
      }
    };

    fetchCountry();
  },[countryName]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  if (!country) {
    return  <Box className={classes.loader} sx={{ display: 'flex',justifyContent:"center" }}>
    <CircularProgress  />
  </Box>;
  }

  return (
    <Box className={classes.container} sx={{ padding: '1rem' }}>
      <Box style={{height:"35rem",marginTop:"2rem",marginBottom:"2rem"}}>
       <Map obj1={latLang?.obj1} obj2={latLang?.obj2} />
      </Box>
      <Box style={{width:"100%",height:"45vh"}}>
        <Box className = {classes.slider_container} >
        <Carousel breakPoints={breakPoints} pagination={false}>
        {images?.map((image, index) => (
          <div style={{margin:"1rem",width: '100%',height:"35vh"}} key={index}>
            <img
              src={image}
              alt={`carousel-${index}`}
              style={{ width: '100%',height:"100%", borderRadius: '10px' }}
            />
          </div>
        ))}
      </Carousel>  
        </Box>
      </Box>
      <Paper sx={{ padding: '1rem', backgroundColor: '#fff' }}>
        <Box className={classes.mainContainer}>
          <Box className={classes.imageContainer}>
           <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ width: '100%',height:"100%", marginTop: '1rem' }}/>
          </Box>
          <Box className={classes.description} >
          {/* <Typography variant="h4">{country.name.common}</Typography> */}
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={4}>
              <Item><Typography variant="h6">Capital</Typography></Item>
            </Grid>
            <Grid size={5}>
              <Item><Typography variant="h6">{country.capital?? "?"}</Typography></Item>
            </Grid>
            <Grid size={4}>
              <Item><Typography variant="body1">Region</Typography></Item>
            </Grid>
            <Grid size={5}>
              <Item><Typography variant="body1">{country.region?? "?"}</Typography></Item>
            </Grid>
            <Grid size={4}>
              <Item><Typography variant="body1">Subregion</Typography></Item>
            </Grid>
            <Grid size={5}>
              <Item><Typography variant="body1">{country.subregion?? "?"}</Typography></Item>
            </Grid>
              <Grid size={4}>
              <Item><Typography variant="body1">Population</Typography></Item>
            </Grid>
            <Grid size={5}>
              <Item><Typography variant="body1">{country.population?? "?"}</Typography></Item>
            </Grid>
            <Grid size={4}>
              <Item><Typography variant="body1">Currency</Typography></Item>
            </Grid>
            <Grid size={5}>
              <Item><Typography variant="body1">{Object.keys(country.currencies)[0]?? "?"}</Typography></Item>
            </Grid>
            <Grid size={4}>
              <Item><Typography variant="body1">Language(s)</Typography> </Item>
            </Grid>
            <Grid size={5}>
              <Item><Typography variant="body1">{Object.values(country.languages).join(', ')?? "?"}</Typography> </Item>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CountryDetails;

