import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { json, urlencoded } from 'body-parser'

import mongoose from 'mongoose';
import session from 'express-session';

import { mongoConfig } from './config/settings'
import server from './app'

const uriScheme = process.env.MONGO_URI_SCHEME

mongoose.connect( uriScheme, mongoConfig);

const app = express();

app
  .use(cors())
  .use(morgan('tiny'))
  .use(helmet())
  .use (json ())
  .use (urlencoded ({ extended: false }))
  .use(
    session({
      secret: process.env.APP_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  )

const run = () => {
  server( app )
}

run()
