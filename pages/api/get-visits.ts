// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { supabase } from '../../src/supabase-client';

const baseUrl =
  'https://revofitness.com.au/wp-content/themes/blankslate/member_visits_v2';
const locationUris = [
  'banksia-grove',
  'belmont',
  'beverley',
  'charlestown',
  'cockburn',
  'canning-vale',
  'claremont',
  'innaloo',
  'joondalup',
  'kelmscott',
  'marion',
  'mentone',
  'mirrabooka',
  'modbury',
  'morley',
  'myaree',
  'northbridge',
  'oconnor',
  'scarborough',
  'shellharbour',
  'windsor-gardens',
  'victoria-park',
  'southland',
  'pitt-st',
  'shenton-park',
];

const resultsSchema = z.array(
  z.object({
    location: z.string(),
    count: z.number(),
  })
);

const makeUrl = (uri: string) => `${baseUrl}/${uri}.json`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const fetches = locationUris.map((uri) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = makeUrl(uri);
        const fetchRes = await fetch(url);
        const json = await fetchRes.json();
        resolve({ location: uri, count: json });
      } catch (err) {
        resolve({ location: uri, count: 0 });
      }
    });
  });

  try {
    const results = await Promise.all(fetches);

    const parseRes = resultsSchema.safeParse(results);

    if (parseRes.success) {
      const { error } = await supabase.from('visits').insert(parseRes.data);

      if (error) {
        return res.status(500).json({ error });
      }

      res.status(200).json(parseRes.data.sort((a, b) => a.count - b.count));
    } else {
      res.status(500).json({ error: parseRes.error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
