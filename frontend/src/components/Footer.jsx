import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
// import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer">
      <section>
        <Link>
          <img src={Logo} alt="" />
          <h2>Dart</h2>
        </Link>
        <Link to={"/about"}>
          <p>About Dart</p>
          <p>Whats is behind the boards</p>
        </Link>
        <Link>
          <p>Jobs</p>
          <p>Whats is behind the boards</p>
        </Link>
        <Link>
          <p>Apps</p>
          <p>Whats is behind the boards</p>
        </Link>
        <Link to={"/contact"}>
          <p>Contact us</p>
          <p>Whats is behind the boards</p>
        </Link>
      </section>
      <section>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            padding: "2vh 0",
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="https://github.com/it-for-us/todo"
            target="_blank"
          >
            <Icon
              fontSize="large"
              baseClassName="fas"
              className="fa-brands fa-github"
            />
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="https://facebook.com"
            target="_blank"
          >
            <Icon
              fontSize="large"
              baseClassName="fas"
              color="inherit"
              className="fa-brands fa-facebook"
            />
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="https://twitter.com"
            target="_blank"
          >
            <Icon
              fontSize="large"
              baseClassName="fas"
              color="inherit"
              className="fa-brands fa-twitter"
            />
          </Link>
        </Grid>
      </section>
    </div>
  );
}
//  <Box component="footer" className="footer bg-black">
//     <Grid container spacing={2}>
//       <Grid item xs={6} md={4} color="white">
//         <Typography variant="subtitle2" fontSize="large">
//           Copyright &copy;
//           <Link
//             href="https://www.it4us.org/"
//             target="_blank"
//             underline="hover"
//             color="inherit"
//           >
//             IT4US
//           </Link>{" "}
//           2022
//         </Typography>
//         <Typography variant="subtitle2" fontSize="large">
//           {/* Privacy Policy Link will be added */}
//           <Link
//             underline="hover"
//             color="inherit"
//             href="#privacy-policy"
//             target="_blank"
//           >
//             Privacy Policy
//           </Link>
//         </Typography>
//       </Grid>
//       <Grid item xs={5} md={8} color="white">
//         <Grid>
//           <Typography
//             sx={{ display: { xs: "none", md: "block" } }}
//             variant="subtitle1"
//           >
//             Get connected with us on social media{" "}
//           </Typography>
//         </Grid>
//         <Grid
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <Link
//             underline="hover"
//             color="inherit"
//             href="https://github.com/it-for-us/todo"
//             target="_blank"
//           >
//             <Icon
//               fontSize="large"
//               baseClassName="fas"
//               className="fa-brands fa-github"
//             />
//           </Link>
//           <Link
//             underline="hover"
//             color="inherit"
//             href="https://facebook.com"
//             target="_blank"
//           >
//             <Icon
//               fontSize="large"
//               baseClassName="fas"
//               color="inherit"
//               className="fa-brands fa-facebook"
//             />
//           </Link>
//           <Link
//             underline="hover"
//             color="inherit"
//             href="https://twitter.com"
//             target="_blank"
//           >
//             <Icon
//               fontSize="large"
//               baseClassName="fas"
//               color="inherit"
//               className="fa-brands fa-twitter"
//             />
//           </Link>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Box>
