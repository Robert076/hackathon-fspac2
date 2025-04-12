import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'admin',          
    host: 'localhost',
    database: 'fspac2',       
    password: 'admin',      
    port: 5434,
  });

  export const GET = async () => {
    try {
      const response = await pool.query('SELECT * FROM "User"');
      return NextResponse.json(response.rows);
    } catch (error: any) {
      console.error('Error querying database:', error.message);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { email, firstName, lastName, password } = body;

      if (!email || !firstName || !lastName || !password)
        return NextResponse.json(
          { error: 'Bad request: Either null fields or invalid data' },
          { status: 400 }
        );

      const checkIfUserWithSameEmailExistsAlreadyQuery = `
        SELECT * FROM "User" WHERE email=$1
      `;
      const paramsForCheckingIfUserWithSameNameAlreadyExists = [email];
      const doesUserWithSameNameAlreadyExist = await pool.query(checkIfUserWithSameEmailExistsAlreadyQuery, paramsForCheckingIfUserWithSameNameAlreadyExists);
      
      if (doesUserWithSameNameAlreadyExist.rows.length > 0) {
        return NextResponse.json(
            { error: `User with the email ${email} already exists` },
            { status: 409 }
          )          
      }

      const query = `
        INSERT INTO "User" (email, "firstName", "lastName", "password")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [email, firstName, lastName, password];
      const res = await pool.query(query, values);
  
      return NextResponse.json(res.rows[0], { status: 201 });
    } catch (error) {
      console.error('Error inserting data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}