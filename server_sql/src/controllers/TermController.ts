import { Request, Response } from 'express';
import connection from '../Connect/Connect';

export const getTerms = (req: Request, res: Response) => {

    connection.query('select * from terms', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error' });
        } else {
            res.status(200).json(result);
        }
    });

}