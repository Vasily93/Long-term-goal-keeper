import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { orange, green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

function CompletedCard({ goal}) {
    const cardStyle = goal.result === 'finished' ? green[400] : orange[500];
  return (
    
    <Card>
        <CardContent>
            <Typography variant="h5">{goal.name}</Typography>
        </CardContent>
        <Collapse in={true} timeout="auto" unmountOnExit style={{backgroundColor: cardStyle, color: 'white'}}>
            <Typography paragraph>
                {goal.description}
            </Typography>
            <Typography variant="subtitle1">Agreed with: {goal.partner}</Typography>
            <Typography variant="subtitle1">Email: {goal.email}</Typography>
            <Typography variant="subtitle1">Losing bet: {goal.bet}</Typography>
            <Typography variant="subtitle1">Deadline: {goal.deadline} at 10pm</Typography>
            <Typography variant="subtitle1">Status: {goal.status}</Typography>
            <Typography variant="subtitle1">Result: {goal.result}</Typography>
        </Collapse>
    </Card>
  )
}

export default CompletedCard;