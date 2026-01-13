import app from './app';
import { connectToMongoDB } from './config/mongo';
import { PORT } from './config/constants';

// Connect to MongoDB
connectToMongoDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
