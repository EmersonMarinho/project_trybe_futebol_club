import * as express from 'express';
import teamsRoute from './routes/teams.routes';
import loginRoute from './routes/login.routes';
import matchRoute from './routes/matches.routes';
import leaderBoardRoute from './routes/leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private routes(): void {
    this.app.use('/teams', teamsRoute);
    this.app.use('/login', loginRoute);
    this.app.use('/matches', matchRoute);
    this.app.use('/leaderboard', leaderBoardRoute);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
