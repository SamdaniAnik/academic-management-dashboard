"use client";

import { Box, Button, Typography } from "@mui/material";

export default function Error({ error, reset }) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={6}>
            <Typography variant="h5" color="error">
                Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {error.message}
            </Typography>
            <Button
                variant="contained"
                onClick={() => reset()}
                sx={{ bgcolor: "#ff1744", "&:hover": { bgcolor: "#d50000" } }}
            >
                Try again
            </Button>
        </Box>
    );
}