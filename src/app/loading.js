import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function Loading() {
    return (
        <Box p={3}>
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
                {[0, 1, 2].map((i) => (
                    <Card key={i}>
                        <CardContent>
                            <Skeleton variant="text" width="40%" />
                            <Skeleton variant="text" width="60%" />
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Skeleton variant="text" width="30%" />
                        <Skeleton variant="rectangular" height={200} />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}