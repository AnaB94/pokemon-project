import 'dotenv/config';
import axios from 'axios';

const env = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Falta ${name} en el archivo .env`);
  return v;
};

export class ApiService {
  private async getToken(): Promise<string> {
    const body = new URLSearchParams({
      grant_type: env('GRANT_TYPE'),
      client_id: env('CLIENT_ID'),
      client_secret: env('CLIENT_SECRET'),
    });
    const res = await axios.post(env('TOKEN_URL'), body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return res.data.access_token;
  }

  async getData(): Promise<Record<string, unknown>[]> {
    const token = await this.getToken();
    const res = await axios.get(env('API_URL'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = res.data;
    // la lista puede venir directa o dentro de value / data / results / items
    return Array.isArray(d) ? d : d.value ?? d.data ?? d.results ?? d.items ?? [d];
  }
}
