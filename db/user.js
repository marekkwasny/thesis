import { hash } from 'bcrypt';
import { logToConsole } from '../utils/logging.js';

//Funkcja tworząca nowego użytkownika.
export async function createUser(pool, name, email, password) {
    const users = new UserRepository(pool);
    return await users.create(name, email, password);
}

//Funkcja zwracająca użytkownika spełniającego określone kryterium.
export async function findUser(pool, key, value) {
    const users = new UserRepository(pool);
    return await users.find(key, value);
}

//Funkcja zwracająca wszystkich użytkowników.
export async function getUsers(pool) {
    const users = new UserRepository(pool);
    return await users.retrieve();
}

class UserRepository {
    #keys = ['id', 'name', 'email'];
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async create(name, email, password) {
        try {
            const salt = 12;
            password = await hash(password, salt);

            const query = {
                name: 'create-user',
                text:
                    'INSERT INTO users(name, email, password)' +
                    'VALUES ($1, $2, $3) RETURNING *',
                values: [name, email, password],
            };

            logToConsole(query);

            const res = await this.#pool.query(query);
            return res.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error('CANNOT_CREATE_USER');
        }
    }

    async retrieve() {
        try {
            const query = {
                name: 'fetch-users',
                text: 'SELECT * FROM users',
            };

            logToConsole(query);

            const res = await this.#pool.query(query);
            return res.rows;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async find(key, value) {
        if (!this.#keys.includes(key)) {
            throw new Error(`NO_MATCHING_KEY ${key}`);
        }

        try {
            const query = {
                name: `fetch-user-by-${key}`,
                text: 'SELECT * FROM users WHERE ' + key + ' = $1 LIMIT 1',
                values: [value],
            };

            logToConsole(query);

            const ret = await this.#pool.query(query);

            if (!ret.rows[0]) {
                return { id: '', email: '', password: '' };
            }

            return ret.rows[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
