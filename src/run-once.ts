console.log('Iniciando ETL...');
import { runEtl } from './etl.js';

try {
  await runEtl();
  console.log('Terminó el ETL');
} catch (e: any) {
  console.error('\nERROR:', e.message);
}