import { v2 as cloudinary } from 'cloudinary';

 
let cachedResults: any;

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute();

    cachedResults = fetchedResults;
  }

  return cachedResults;
}
