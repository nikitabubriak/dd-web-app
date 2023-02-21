import { Card, CardActions, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <Grid item xs component={Card} sx={{ height: 350 }}>
            <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
            <CardHeader title={
                <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 24 }} />}
            />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 16 }} />
                    <Skeleton animation="wave" height={10} width="40%" />
                </>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 4 }}>
                <>
                    <Skeleton animation="wave" height={20} width='40%' />
                    <Skeleton animation="wave" height={20} width="20%" />
                </>
            </CardActions>
        </Grid>
    )
}