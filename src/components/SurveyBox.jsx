// import React, { useState } from 'react'; 
// import { 
//     Box, 
//     Typography, 
//     useTheme, 
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,  
// } from "@mui/material";
// import { tokens } from "../theme";
// import { useNavigate } from "react-router-dom";
// // import ProgressCircle from "./ProgressCircle";

// const SurveyBox = ({ title, subtitle, icon, surveyType, button}) => {
// const theme = useTheme();
// const colors = tokens(theme.palette.mode);
// const [open, setOpen] = useState(false);
// const handleClose = () => {
//     setOpen(false);
// };
// const navigate = useNavigate();

// return (
//     <Box width="100%" m="0 30px">
//         <Box display="flex" justifyContent="space-between">
//             <Box>
//                 {/* {icon} */}
//                 <Typography
//                     variant="h5"
//                     fontWeight="bold"
//                     sx={{ color: colors.grey[100] }}
//                     >
//                     {title}
//                 </Typography>
//             </Box>
//             {/* <Box>
//                 <ProgressCircle progress={progress} />
//             </Box> */}
//             <Box>
//                 <Typography 
//                     variant="h6" 
//                     fontStyle="bold" 
//                     sx={{ color: colors.yellowAccent[400]}}>
//                         {surveyType}
//                 </Typography>
//             </Box>
//         </Box>
//         <Box display="flex" justifyContent="space-between" mt="2px">
//             <Typography variant="h5" sx={{ color: colors.yellowAccent[300] }}>
//                 {subtitle}
//             </Typography>
//             {/* <Typography 
//                 variant="h5" 
//                 fontStyle="bold" 
//                 sx={{ color: colors.yellowAccent[600]}}>
//                     {surveyType}
//             </Typography> */}
//             {/* <Typography
//                 variant="h5"
//                 fontStyle="italic"
//                 sx={{ color: colors.greenAccent[600] }}
//                 >
//                 {increase}
//             </Typography> */}
//         </Box>
//         <Box display="flex" justifyContent="space-between" mt="2px">
//             <Box></Box>
//             {/* <Typography variant="h5" sx={{ color: colors.yellowAccent[500] }}>
//                 {subtitle}
//             </Typography> */}
//             <Button
//                 sx={{ 
//                     backgroundColor: colors.blueAccent[700],
//                     color: colors.grey[100],
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     mt: "10px",
//                     padding: "3px 5px"}}
//                     onClick={() => setOpen(true)} 
//                 >
//                 EVALUATE
//             </Button>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Data Privacy</DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             CPU believes in the sanctity of personal information and the rights
//                             of individuals to Data Privacy per Republic Act 10173 (Data Privacy
//                             Act of 2012). Thus, CPU is committed to the protection and
//                             responsible use of such information. CPU will only collect, use, and
//                             disclose personal information with the student’s or if applicable,
//                             guardian’s or parent‘s knowledge and consent. For further
//                             information, you may access Data Privacy Act of 2012at
//                             https://privacy.gov.ph/data-privacy-act/
//                         </DialogContentText>
//                     </DialogContent>
//                 <DialogActions>
//                 <Button
//                     onClick={() => {
//                     navigate("/survey/studentSurvey");
//                     setOpen(false);
//                     }}
//                     sx={{
//                         color: colors.yellowAccent[500]
//                     }}
//                 >
//                     Agree
//                 </Button>
//                 <Button 
//                     sx={{
//                         color: colors.yellowAccent[500]
//                     }}
//                     onClick={handleClose}>Cancel</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     </Box>
//   );
// };

// export default SurveyBox;