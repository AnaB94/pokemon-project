import cron from 'node-cron';
import { runEtl } from './etl.js';

cron.schedule('15 13 * * *', async () => {
  try {
    await runEtl();
  } catch (error) {
    console.error('Falló el ETL:', error);
  }
}, { timezone: 'America/Mexico_City' });

console.log('Scheduler activo, esperando la hora programada...');