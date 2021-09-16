import express, { Request, Response, Application } from 'express'; // Impordime expressi

const app: Application = express(); // Loome ekspressi app-i

app.use(express.json()); // Middleware request objekti sisse body objekti loomiseks

const port = 3000; // Pordi number, kus API töötama hakkab

// Http response koodid
const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

// Kasutaja interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

// Dummy andmebaasi interface
interface Db {
  users: User[];
}

// Dummy andmebaas
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
    },
    {
      id: 2,
      firstName: 'Mari',
      lastName: 'Maasikas',
    },
  ],
};

// API 'testimise' endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: 'Alive',
  });
});

// Kasutajate endpoindid
// kõik kasutajad
app.get('/users', (req: Request, res: Response) => {
  const { users } = db;
  return res.status(responseCodes.ok).json({
    users,
  });
});

// Kasutaja päring id järgi - id on nõutud ja peab olema arv
app.get('/users/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({
      error: 'No valid id provided',
    });
  }
  const user = db.users.find((element) => element.id === id);
  if (!user) {
    return res.status(400).json({
      error: `No user found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    user,
  });
});

// Kasutaja kustutamine id järgi - id on nõutud ja peab olema arv
app.delete('/users/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({
      error: 'No valid id provided',
    });
  }
  const index = db.users.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `User not found with id: ${id}`,
    });
  }
  db.users.splice(index, 1);
  return res.status(responseCodes.noContent).send();
});

// Kasutaja loomine - eesnimi ja perekonnanimi on nõutud
app.post('/users', (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  if (!firstName) {
    return res.status(400).json({
      error: 'First name is required',
    });
  }
  if (!lastName) {
    return res.status(400).json({
      error: 'Last name is required',
    });
  }
  const id = db.users.length + 1;
  db.users.push({
    id,
    firstName,
    lastName,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

// Kasutaja uuendamine id järgi
// id on nõutud ja peab olema arv, eesnimi või perekonnanimi on nõutud
app.patch('/users/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { firstName, lastName } = req.body;
  if (!id) {
    return res.status(400).json({
      error: 'No valid id provided',
    });
  }
  if (!firstName && !lastName) {
    return res.status(400).json({
      error: 'Nothing to update',
    });
  }
  const index = db.users.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(400).json({
      error: `No user found with id: ${id}`,
    });
  }
  if (firstName) {
    db.users[index].firstName = firstName;
  }
  if (lastName) {
    db.users[index].lastName = lastName;
  }
  return res.status(responseCodes.noContent).send();
});

// 'Käivitame' API
app.listen(port, () => {
  console.log('Server is running');
});
