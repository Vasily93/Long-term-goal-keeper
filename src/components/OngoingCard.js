import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { getMinutesLeft } from '../helpers/dateHelpers';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function OngoingCard({ goal, changeStateById, index }) {
    const [expanded, setExpanded] = useState(false);
    const [minutes, setMinutes] = useState(getMinutesLeft(goal.deadline));

    // useEffect(() => {
    //     if(minutes <= 0) {
    //         changeStateById(goal.id)
    //         setExpanded(true)
    //     }
    // }, [minutes, changeStateById, goal.id])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // if(goal.status === 'ongoing') {
    //     setInterval(() => {
    //         setMinutes(getMinutesLeft(goal.deadline))
    //     }, 60000)
    // }

    let time
    if(minutes < 1440) {
        time = `${Math.floor(minutes / 60)} : ${Math.floor(minutes % 60)}` //less than 1 day
    } else if(minutes < 10080) {
        time = `${Math.floor(minutes / 60 / 24)} days` //less than 1 week
    } else if(minutes < 40320) {
        time = `${Math.floor(minutes / 60 /24 / 7)} weeks`//les than a month
    } else {
        time = `${Math.floor(minutes / 60 / 24 / 7 / 4)} months` // months
    }
  return (
    <Card>
        <CardContent>
            <Typography variant="h5">{goal.name}</Typography>
            {goal.status === 'ongoing' ? 
                <Typography>
                    Time Left: {time}
                </Typography>
                : null
            }
        </CardContent>
        <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
            <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit style={{backgroundColor: blue[400], color: 'white'}}>
            <Typography paragraph>
                {goal.description}
            </Typography>
            <Typography variant="subtitl1">Agreed with: {goal.partner}</Typography>
            <Typography variant="subtitl1">Contant Email: {goal.email}</Typography>
            <Typography variant="subtitle1">Losing bet: {goal.bet}</Typography>
            <Typography variant="subtitle1">Deadline: {goal.deadline} at 10pm</Typography>
            <Typography variant="subtitle1">Status: {goal.status}</Typography>
            <Typography variant="subtitle1">Minutes: {minutes}</Typography>
        </Collapse>
    </Card>
  )
}

export default OngoingCard