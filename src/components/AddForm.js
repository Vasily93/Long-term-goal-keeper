import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

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
    const [deadline, setDeadline] = useState('');
    const [expanded, setExpanded] = useState(false);
    let todayDate = moment().format('YYYY-MM-DD')

    const handleExpandClick = () => {
        console.log(todayDate)
        setExpanded(!expanded);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        handleExpandClick()
        const obj = {
            id: uuidv4(),
            name: goal,
            description, 
            bet, 
            partner,
            deadline,
            status: 'ongoing',
        }

        setGoal('')
        setDeadline('')
        setDescription('')
        setBet('')
        setPartner('')
        addNewGoal(obj)
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
                <Box component="form">
                    <Stack spacing={3} sx={{}}>
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
                        <TextField label="Partner"
                            value={partner}
                            onChange={(e) => setPartner(e.target.value)}
                            variant="outlined" 
                        />
                        <input type="date"
                            style={{ padding: '10px',}}
                            min={todayDate} 
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <Button onClick={handleSubmit} variant="contained">
                            Submit
                        </Button>
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