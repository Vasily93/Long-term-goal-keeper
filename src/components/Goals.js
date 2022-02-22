import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import GoalCard from './GoalCard';


function Goals(props) {
 
    return(
        <Container>
            <Stack direction='column' spacing={2}>
            {props.goals.map(goal => (
               <GoalCard goal={goal} /> 
            ))}
            </Stack >
        </Container>
    )
}

export default Goals;