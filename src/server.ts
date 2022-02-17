import "reflect-metadata";

import express from 'express';

import './database';
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

    app.listen(3020, () => {
        console.log('---------------------------------');
        console.log('---------------------------------');
        console.log('Server is running on port 3020, CRUD USER');
        console.log('---------------------------------');
        console.log('---------------------------------');
    }
)