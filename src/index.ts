import app from './app';

const server = app.listen(app.get("port"), () => {
    console.log(`App listening at http://localhost:${app.get("port")}`);
});

export default server;