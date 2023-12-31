import * as React from 'react' 
import Avatar from '@mui/material/Avatar' 
import Button from '@mui/material/Button' 
import CssBaseline from '@mui/material/CssBaseline' 
import TextField from '@mui/material/TextField' 
import Link from '@mui/material/Link' 
import Box from '@mui/material/Box' 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined' 
import Typography from '@mui/material/Typography' 
import Container from '@mui/material/Container' 
import { createTheme, ThemeProvider } from '@mui/material/styles' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import routesPaths from '../router-config/routes-paths'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Afraz Butt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  ) 
}

const theme = createTheme()
const customFontClass = 'custom-font'


export default function LogIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault() 
    const data = new FormData(event.currentTarget) 
    // console.log(data.get('email'))
    const response = axios.post(`http://localhost:3005/user/login`, {
      userName : email,
      password : password
    })

    response.then(result => {
      const { data } = result
      if(data!=null){  
        Cookies.set("userBankingApp", JSON.stringify(data), { expires: 1 });  // expires in one day
    }
      if (data.role === "admin" && data.token){
        navigate(routesPaths.adminHome);
      }else if(data.role === "user" && data.token){
        navigate(routesPaths.userHome)
      }
    })
      .catch(error => {
        alert('Something went wrong, Try again!!!')
      })

  } 

  return (
    <>
      {/* <AppNavbar /> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className='custom-font'
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </form>

          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  ) 
}