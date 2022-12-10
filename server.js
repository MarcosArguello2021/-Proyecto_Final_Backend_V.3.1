import express from 'express';
import { productosRouter } from './routes/productos.js';
import { carritoRouter } from './routes/carrito.js';
import { routerRegistro } from './routes/registro.js';
import { routerLogin } from './routes/login.js';
import { engine } from 'express-handlebars';
import session from './utils/session.js';
import cluster from 'cluster';
import { logger } from './utils/logger.js'
import os from 'os';
const numCPUs = os.cpus().length
import { config } from 'dotenv'
config()
const modoCluster = process.argv[3] == 'CLUSTER'

const app = express();
const PORT = process.env.PORT || 8080
app.set('port', PORT)
app.use(session);

app.use(express.static('public'));
app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (modoCluster && cluster.isPrimary) {
  logger.info(`Número de procesadores: ${numCPUs}`)
  logger.info(`PID MASTER ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })
}
else { 
  app.use('/api', routerRegistro);
  app.use('/api', routerLogin);
  app.use('/api', productosRouter);
  app.use('/api', carritoRouter);
  
  app.use((req, res) => {
    logger.warn('Error de ruta - No encontrada')
    res.status(404).render('failRoute')
  })

}
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})

