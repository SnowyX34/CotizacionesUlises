import express, { Application } from 'express';
import cors from 'cors';
import routesUser from '../../../interfaces/routes/user.routes';
import routesCart from '../../../interfaces/routes/cart.routes';
import routesProduct from '../../../interfaces/routes/product.routes'
import User from './user.model';
import path from 'path';
import { Product } from './product.model';

class Server {
    private readonly app: Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? '3000';

        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    private routes() {
        this.app.use('/api/users', routesUser);
        this.app.use('/api/cotizacion', routesCart);
        this.app.use('/api/products', routesProduct);
        const uploadsPath = path.join(process.cwd(), 'uploads');
        this.app.use('/uploads', express.static(path.join(__dirname, '../../../../uploads')));
        this.app.get('/test', (req, res) => {
            res.json({
                uploadsPath: uploadsPath,
                currentDir: process.cwd()
            });
        });
        this.app.use('/api/cart', routesCart);
        this.app.get('/api/status', (req, res) => {
            res.json({ message: '✅ Backend activo y respondiendo al frontend correctamente' });
        });
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }


    private async dbConnect() {
        try {
            await User.sync();
            await Product.sync();
            console.log('Base de datos conectada y sincronizada');
        } catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}

export default Server;