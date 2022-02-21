import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function AddForm({ addNewGoal }) {
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('');
    const [bet, setBet] = useState('');
    const [partner, setPartner] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        const editedDate = deadline.split('').filter(i => i !== '-').join('');
        const obj = {
            name: goal,
            description, 
            bet, 
            partner,
            deadline: editedDate
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
                        <TextField type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)} 
                            variant="outlined" 
                        />
                        <Button onClick={handleSubmit} variant="contained">
                            <Link to='/'>Submit</Link>
                        </Button>
                    </Stack>
                </Box >
            </CardContent>
        </Card>
    </Container>
    </>
  )
}

export default AddForm