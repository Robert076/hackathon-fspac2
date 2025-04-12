import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'fspac2',
  password: 'admin',
  port: 5434,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid or missing ID' },
        { status: 400 }
      );
    }

    const query = 'SELECT * FROM "User" WHERE id = $1';
    const values = [id];
    const res = await pool.query(query, values);

    if (res.rows.length === 0) {
      return NextResponse.json(
        { error: `User with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user by ID:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
