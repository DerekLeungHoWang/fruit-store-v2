import React from 'react'
import { Container, Divider, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import styled from 'styled-components';
import ShopIcon from '@material-ui/icons/Shop';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: "40px"
    },
    list: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        padding: '0px'
    },
    paper: {
        borderRadius: "10px",

    },
    // listItem: {
    //     borderLeft: props => {
    //         console.log(props);
    //     }
    // }
}));

const StyledListItem = styled(ListItem)`
     border-left: ${({ active, name, theme }) => active === name ? `2px solid #01BFA6` : "unset"};
     border-top-left-radius:${({ active, name, theme, firstSection }) => firstSection === name ? `8px` : "unset"};;
     border-bottom-left-radius:${({ active, name, theme, lastSection }) => lastSection === name ? `8px` : "unset"};;
  
`

const sections = [
    {
        name: "General",
        icon: <PermContactCalendarIcon />
    },
    {
        name: "Order",
        icon: <ShopIcon/> 
    },
    {
        name: "Credential",
        icon: <VpnKeyIcon />
    },
    {
        name: "Products",
        icon: <StorefrontIcon />
    },
]
export default function ProfileNavigation({ active, handleSetActive }) {
    const theme = useTheme();
    const styleProps = {
        active: active
    };
    const classes = useStyles(styleProps);
    let firstSection = sections[0].name.toLowerCase().replace(/ /g, '')
    let lastSection = sections[sections.length - 1].name.toLowerCase().replace(/ /g, '')
    console.log(lastSection);
    return (
        <Container className={classes.container}>
            <Paper elevation={3} className={classes.paper}>

                <List className={classes.list}>
                    {sections.map(s => (
                        <>
                            <StyledListItem firstSection={firstSection} lastSection={lastSection} theme={theme} active={active} name={s.name.toLowerCase().replace(/ /g, '')} button onClick={handleSetActive} className={classes.listItem}  >
                                <ListItemAvatar>
                                    <Avatar>
                                        {s.icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={s.name} />
                            </StyledListItem>
                            <Divider />
                        </>
                    ))}


                </List>
            </Paper>
        </Container>
    )
}
