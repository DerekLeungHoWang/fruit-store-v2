import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { data } from '../Data/FruitItem'
import { Button, Paper } from "@material-ui/core";
import { useState } from 'react';
import FilterButton from './FilterButton';
import Skeleton from '@material-ui/lab/Skeleton';
function ItemFilter({
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedCountry,
    setSelectedCountry,
    categories,
    countries }) {
  
    return (

        <Grid
            className="itemFilter"
            container
            direction="row"
            justify="center"
            alignItems="center">
        
            <Grid

                container direction="row"
                justify="flex-start"
                alignItems="center">
                {isLoading ? (
                    <Box   ml={.5} pt={.5} width="98.5%" height="60px" >
            
                        <Skeleton  height="30px"  />
                        <Skeleton width="60%" height="30px" />
                    </Box>
                ) : (

                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="1">種類:</td>
                                <td colSpan="1">
                                    <>
                                        <Button
                                            style={{ color: "#646e73" }}
                                            value="all" onClick={(e) => setSelectedCategory(null)}  >
                                            全部
                                        </Button>
                                        {categories.map((category, i) => {
                                            return (
                                                <Button
                                                    key={i}
                                                    style={{ color: `${selectedCategory === category ? "white" : "#646e73"}` }}
                                                    color={`${selectedCategory === category ? "primary" : "default"}`}
                                                    variant={`${selectedCategory === category ? "contained" : "text"}`}
                                                    value={category} key={i} onClick={(e) => setSelectedCategory(e.currentTarget.value)}
                                                >
                                                    {category}
                                                </Button>
                                            )
                                        })}
                                    </>
                                </td>

                            </tr>
                            <tr>
                                <td colSpan="1">國家:</td>
                                <td colSpan="1">
                                    <Button
                                        style={{ color: "#646e73" }}
                                        value="all" onClick={(e) => setSelectedCountry(null)}   >
                                        全部
                                    </Button>
                                    {countries.map((country, i) => {
                                        return (
                                            <Button
                                                key={i}
                                                style={{ color: `${selectedCountry === country ? "white" : "#646e73"}` }}
                                                color={`${selectedCountry === country ? "primary" : "default"}`}
                                                variant={`${selectedCountry === country ? "contained" : "text"}`}
                                                value={country} key={i} onClick={(e) => setSelectedCountry(e.currentTarget.value)}
                                            >
                                                {country}
                                            </Button>
                                        )
                                    })}
                                </td>
                            </tr>
                        </tbody >
                    </table >

                )
                }




            </Grid >
            {/* </Paper> */}
        </Grid >



    )
}

export default ItemFilter
