const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

// Route includes
const datamuseRouter = require('./app/routes/datamuse.router');
const userRouter = require('./app/routes/user.router');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))

/* Routes */
app.use('/api/user', cors(corsOptions), userRouter);
app.use('/api/datamuse', cors(corsOptions) ,datamuseRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});