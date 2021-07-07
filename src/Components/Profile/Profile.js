import React, { useEffect, useRef, useState } from 'react'
import { Container, Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import useProfileData from './useProfileData';
import OrderHistory from './OrderHistory';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, createdDate, finalTotal, status, protein) {
    return { id, createdDate, finalTotal, status, protein };
}
export default function Profile() {
    const classes = useStyles();
    let data = useProfileData()
    if (!data) return null;
    console.log(data);
    let rows = data.map(({ refId, createdDate, status, finalTotal }) => {
        let row = createData(refId, createdDate, finalTotal, status, 4.0)
        return row
    })
    console.log(rows);

    return (
        <Container maxWidth="md" >

            <Grid container
                style={{ height: "100vh", }}
                justify="center"
                alignItems="center"
            >

                <Grid container item
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Paper>

                    </Paper>

                    <OrderHistory
                        classes={classes}
                        rows={rows} />

                </Grid>

            </Grid>

        </Container>
    )
}
