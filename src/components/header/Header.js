import './Header.css'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
const Header = () => {
   const name = useSelector((state=>state))
  return(
    <div className="header__container">
       <div className="header__box">
         <div className="header__element">
           <div className="logo">
           <Link to={'/'} > <img src='/images.jpeg' /> </Link>
           </div>
         </div>
         <div className="header__element">
           <div className=""></div>
           </div>
           <div className="header__element">
            <div className="icon">
              <Typography variant="h5" component="h2">{name.name}</Typography>
              <Avatar src="/broken-image.jpg" />
            </div>
           </div>
       </div>

    </div>
     )
}

export default Header;