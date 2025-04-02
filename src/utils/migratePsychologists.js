import { ref, get, set } from 'firebase/database';
import { db } from '../firebase/firebaseConfig';

const generateId = () => crypto.randomUUID();

export const migratePsychologists = async () => {
  const snapshot = await get(ref(db, 'psychologists'));
  const psychologistsArray = snapshot.val();

  if (!Array.isArray(psychologistsArray)) {
    console.error('Дані не є масивом.');
    return;
  }

  for (const psychologist of psychologistsArray) {
    const id = generateId();
    await set(ref(db, `psychologists/${id}`), {
      id,
      ...psychologist,
    });
  }

  console.log('✅ Міграцію завершено!');
};

migratePsychologists();
