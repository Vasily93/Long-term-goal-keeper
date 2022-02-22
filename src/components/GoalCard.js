import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import moment from 'moment';
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

function GoalCard({ goal }) {
    const [expanded, setExpanded] = useState(false);
    const [minutes, setMinutes] = useState(getMinutesLeft(goal.deadline));
    let deadlineInDays = moment(goal.deadline, "YYYYMMDD").fromNow();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    if(goal.status === 'ongoing') {
        setInterval(() => {
            setMinutes(getMinutesLeft(goal.deadline))
        }, 60000)
    }

  return (
    <Card>
        <CardContent>
            <Typography variant="h5">{goal.name}</Typography>
            {goal.status === 'ongoing' ? 
                <Typography>
                    Minutes Left: {minutes}
                </Typography>
                : null
            }
            Deadline: {deadlineInDays}
        </CardContent>
        <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
            <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography paragraph>
                {goal.description}
            </Typography>
            <Typography variant="subtitle1">Agreed with: {goal.partner}</Typography>
            <Typography variant="subtitle1">Losing bet: {goal.bet}</Typography>
            <Typography variant="subtitle2">Status: {goal.status}</Typography>
        </Collapse>
    </Card>
  )
}

export default GoalCard