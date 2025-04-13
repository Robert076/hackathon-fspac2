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
  { params }: { params: { email: string } }
) {
  try {
    const { email } = await params;

    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or missing email' },
        { status: 400 }
      );
    }

    const query = 'SELECT * FROM "User" WHERE email = $1';
    const values = [email];
    const res = await pool.query(query, values);

    if (res.rows.length === 0) {
      return NextResponse.json(
        { error: `User with email ${email} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user by email:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
