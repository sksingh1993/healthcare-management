import { useEffect, useState } from "react";
//import "./clock.css";
import { Box, Typography } from "@mui/material";

export default function Clock() {

    const [now, setNow] = useState(new Date());

    useEffect(() => {

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (

    <Box>

        <Typography variant="body2">
            {now.toLocaleTimeString()}
        </Typography>

        <Typography variant="caption">
            {now.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })}
        </Typography>

    </Box>

);

   
}