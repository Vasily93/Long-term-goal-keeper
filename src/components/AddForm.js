import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BasicModal from './PreviewModal';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../helpers/emailHelpers';

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

function AddForm({ addNewGoal }) {
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('');
    const [bet, setBet] = useState('');
    const [partner, setPartner] = useState('');
    const [email, setEmail] = useState('');
    const [deadline, setDeadline] = useState('');
    const [expanded, setExpanded] = useState(false);
    const goalObject = {
        name: goal,
        description, 
        bet, 
        partner,
        email,
        deadline
    }
    let todayDate = moment().format('YYYY-MM-DD');
    const form = useRef();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const emptyForm = () => {
        setGoal('')
        setDeadline('')
        setDescription('')
        setBet('')
        setPartner('')
        setEmail('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleExpandClick()
        goalObject.id = uuidv4();
        goalObject.status = 'ongoing';
        console.log(goalObject)

        emptyForm()
        addNewGoal(goalObject)
        sendEmail(goalObject)
    }

  return (
    <>
    <Container>
        <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            New Goal<ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card sx={{padding: '0 15% 0'}}>
            <CardContent>
                <Box >
                    <Stack spacing={3} sx={{}} component="form" ref={form}>
                        <TextField value={goal} 
                            onChange={(e) => setGoal(e.target.value)}
                            label="Goal" variant="outlined" 
                        />
                        <TextField value={description}
                            label="Description"
                            onChange={(e) => setDescription(e.target.value)} 
                            multiline rows={3} variant="outlined" 
                        />
                        <TextField value={bet} label="Losing bet"
                            onChange={(e) => setBet(e.target.value)}
                            variant="outlined"
                        />
                        <TextField label="Bet buddy"
                            value={partner}
                            onChange={(e) => setPartner(e.target.value)}
                            variant="outlined" 
                        />
                        <TextField label="email" type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined" 
                        />
                        <input type="date"
                            style={{ padding: '10px',}}
                            min={todayDate} 
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <BasicModal goalObject={goalObject} handleSubmit={handleSubmit} />
                    </Stack>
                </Box >
            </CardContent>
        </Card>
        </Collapse>
        
    </Container>
    </>
  )
}

export default AddForm