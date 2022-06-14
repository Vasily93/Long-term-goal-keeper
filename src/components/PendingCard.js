import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function PendingCard({ goal, changeStateById, index }) {

  const SetResult = (res) => {
    goal.result = res;
    goal.status = 'completed';
    console.log(res, goal)
    changeStateById(goal)
  }

  return (
    <Card>
        <CardContent>
            <Typography variant="h5">{goal.name}</Typography>
        </CardContent>
        <Collapse in={true} timeout="auto" unmountOnExit style={{backgroundColor: orange[400], color: 'white'}}>
            <Typography paragraph>
                {goal.description}
            </Typography>
            <Typography variant="subtitl1">Agreed with: {goal.partner}</Typography>
            <Typography variant="subtitl1">Contant Email: {goal.email}</Typography>
            <Typography variant="subtitle1">Losing bet: {goal.bet}</Typography>
            <Typography variant="subtitle1">Deadline: {goal.deadline} at 10pm</Typography>
            <Typography variant="subtitle1">Status: {goal.status}</Typography>

            <Stack direction='row' spacing={20} sx={{margin: '10px'}}>
              <Button onClick={() => SetResult('finished')} variant='contained' color="success">Finished</Button>
              <Button onClick={() => SetResult('missed')} variant='contained' color="error">Missed </Button>
            </Stack>
        </Collapse>
    </Card>
  )
}

export default PendingCard;