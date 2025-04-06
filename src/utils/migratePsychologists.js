import { ref, get, remove, set } from 'firebase/database';
import { db } from '../firebase/firebaseConfig';

const generateId = () => crypto.randomUUID();

export const migratePsychologists = async () => {
  const psychologistsRef = ref(db, 'psychologists');

  // 1. Отримати всі існуючі записи
  const snapshot = await get(psychologistsRef);
  const data = snapshot.val();

  if (!data) {
    console.log('❌ Дані не знайдені.');
    return;
  }

  // 2. Видалити всіх старих психологів
  await remove(psychologistsRef);
  console.log('🗑️ Старі записи психологів видалені.');

  // 3. Якщо дані були масивом → додати кожного як обʼєкт з id
  if (Array.isArray(data)) {
    for (const psychologist of data) {
      const id = generateId();
      await set(ref(db, `psychologists/${id}`), {
        id,
        ...psychologist,
      });
    }
    console.log('✅ Нові психологи згенеровані й додані.');
  } else {
    console.log('⚠️ Дані не є масивом. Нічого не додано.');
  }
};

migratePsychologists();
