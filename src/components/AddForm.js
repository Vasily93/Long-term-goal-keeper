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

function AddForm({ addNewGoal }) {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const [description, setDescription] = useState('');

    const [bet, setBet] = useState('');
    const [betError, setBetError] = useState(false);

    const [partner, setPartner] = useState('');
    const [partnerError, setPartnerError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [deadline, setDeadline] = useState('');
    const [deadlineError, setDeadlineError] = useState(false);
    
    const [expanded, setExpanded] = useState(false);
    const goalObject = {
        name: title,
        description, 
        bet, 
        partner,
        email,
        deadline
    }
    // let todayDate = moment().format('YYYY-MM-DD');
    const form = useRef();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const emptyForm = () => {
        setTitle('')
        setDeadline('')
        setDescription('')
        setBet('')
        setPartner('')
        setEmail('')
    }

    const checkIfEmpty = (val) => {
        return val.trim() === '';
    }
    
    const emailValidation = () => {
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return !pattern.test(email)
    }

    const checkDeadline = () => {
        if(deadline === '') return true;
        return getMinutesLeft(deadline) < 0 ? true : false;
        
    }

    const checkForErrors = () => {
        setTitleError(checkIfEmpty(title))
        setBetError(checkIfEmpty(bet))
        setPartnerError(checkIfEmpty(partner))
        setEmailError(checkIfEmpty(email))
        emailValidation()
        setDeadlineError(checkDeadline(deadline))

        const res = [checkIfEmpty(title),checkIfEmpty(bet), checkIfEmpty(partner), checkIfEmpty(email), emailValidation(), checkDeadline(deadline)];
        return res;
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
                    <Stack spacing={3} 
                        component="form" ref={form}
                        noValidate autoComplete="off"
                    >
                        <TextField
                            required
                            value={title} 
                            onFocus={() => setTitleError(false)}
                            onBlur={() => setTitleError(checkIfEmpty(title))}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Goal" variant="outlined"
                            error={titleError}
                        />
                        <TextField
                            value={description}
                            label="Description"
                            onChange={(e) => setDescription(e.target.value)} 
                            multiline rows={3} variant="outlined" 
                        />
                        <TextField
                            required
                            value={bet}
                            onFocus={() => setBetError(false)}
                            onBlur={() => setBetError(checkIfEmpty(bet))}
                            label="Losing bet"
                            onChange={(e) => setBet(e.target.value)}
                            variant="outlined"
                            error={betError}
                        />
                        <TextField
                            required
                            label="Bet buddy"
                            value={partner}
                            onFocus={() => setPartnerError(false)}
                            onBlur={() => setPartnerError(checkIfEmpty(partner))}
                            onChange={(e) => setPartner(e.target.value)}
                            variant="outlined"
                            error={partnerError}
                        />
                        <TextField
                            required
                            label="email" 
                            type="email"
                            value={email}
                            onFocus={() => setEmailError(false)}
                            onBlur={() => {
                                setEmailError(checkIfEmpty(email))
                                setEmailError(emailValidation())
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            error={emailError}
                        />
                        <TextField type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            onFocus={() => setDeadlineError(false)}
                            onBlur={() => {
                                setDeadlineError(checkIfEmpty(deadline))
                                setDeadlineError(checkDeadline(deadline))
                            }}
                            required
                            error={deadlineError}
                        />
                        <BasicModal goalObject={goalObject} handleSubmit={handleSubmit}  checkForErrors={checkForErrors} />
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