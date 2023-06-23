import express, { urlencoded } from 'express';
import Logging from '../library/Logging';
import { listCreatedEvents, stopChannel } from '../services/googleCalendarAPI';


const app = express();
const PORT = 9090;

app.use(
    urlencoded({
        extended: true
    })
);
app.use(express.json());

app.post('/hook', (req, res) => {
    listCreatedEvents()
});

app.post('/stop', (req, res) => {
    const { id, resourceId } = req.body;
    stopChannel(id, resourceId).then(() => {
        res.status(200).json({ message: `Channel ${id} stopped`})
    }).catch(e => {
        res.status(404).json({ message: e.message });
    })
});

app.listen(PORT, () => Logging.info(`🚀 Server running on port ${PORT}`));
