"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../../../config/routes/user.routes"));
const cart_routes_1 = __importDefault(require("../../../config/routes/cart.routes"));
const product_routes_1 = __importDefault(require("../../../config/routes/product.routes"));
const user_model_1 = __importDefault(require("./user.model"));
const path_1 = __importDefault(require("path"));
const product_model_1 = require("./product.model");
const app = (0, express_1.default)();
class Server {
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000';
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/cotizacion', cart_routes_1.default);
        this.app.use('/api/products', product_routes_1.default);
        // ✅ CORREGIDO: Ruta estática para las imágenes
        const uploadsPath = path_1.default.join(process.cwd(), 'uploads');
        console.log('Sirviendo archivos estáticos desde:', uploadsPath);
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../../../../uploads')));
        // ✅ OPCIONAL: Ruta de prueba para verificar el servidor
        this.app.get('/test', (req, res) => {
            res.json({
                message: 'Servidor funcionando correctamente',
                uploadsPath: uploadsPath,
                currentDir: process.cwd()
            });
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    async dbConnect() {
        try {
            await user_model_1.default.sync();
            await product_model_1.Product.sync();
            console.log('Base de datos conectada y sincronizada');
        }
        catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}
exports.default = Server;
