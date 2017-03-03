import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server running');
});

// export default app;
