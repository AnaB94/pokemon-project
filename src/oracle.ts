import 'dotenv/config';
import oracledb from 'oracledb';

export async function loadOracle(rows: Record<string, any>[]) {
  const conn = await oracledb.getConnection({
    user: process.env.ORACLE_USER!,
    password: process.env.ORACLE_PASSWORD!,
    connectString: process.env.ORACLE_CONNECT_STRING!,
  });
  try {
    await conn.executeMany(
      `MERGE INTO POKEMON t
       USING (SELECT :id id, :name name, :height height, :weight weight,
                     :type1 type1, :type2 type2, :sprite sprite FROM dual) s
       ON (t.ID = s.id)
       WHEN MATCHED THEN UPDATE SET t.NAME = s.name, t.HEIGHT = s.height,
            t.WEIGHT = s.weight, t.TYPE1 = s.type1, t.TYPE2 = s.type2, t.SPRITE = s.sprite
       WHEN NOT MATCHED THEN INSERT (ID, NAME, HEIGHT, WEIGHT, TYPE1, TYPE2, SPRITE)
            VALUES (s.id, s.name, s.height, s.weight, s.type1, s.type2, s.sprite)`,
      rows,
      {
        autoCommit: true,
        bindDefs: {
          id: { type: oracledb.NUMBER },
          name: { type: oracledb.STRING, maxSize: 100 },
          height: { type: oracledb.NUMBER },
          weight: { type: oracledb.NUMBER },
          type1: { type: oracledb.STRING, maxSize: 50 },
          type2: { type: oracledb.STRING, maxSize: 50 },
          sprite: { type: oracledb.STRING, maxSize: 400 },
        },
      }
    );
  } finally {
    await conn.close();
  }
}